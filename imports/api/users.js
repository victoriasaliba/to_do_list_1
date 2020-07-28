
import { Meteor } from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';
import { isLoggedIn } from '../ui/AccountsUIWrapperLogin';
import FileBase64 from 'react-file-base64';

export const Users = Meteor.users;


if(Meteor.isServer){
    //this code only runs on the server
    // Only publish tasks that are public or belong to the current user
   
    Meteor.publish('Users', function UsersPublication() {
       return Meteor.users.find({}, {fields: {emails: 1, profile: 1}});
    });
}

Meteor.methods({
    'users.insert'(name, password, email, birthday, gender, company, photo){
        check(name, String);
        check(password, String);
        check(email, String);
        check(birthday, String);
        check(gender, String);
        check(company, String);
        check(photo[0].base64, String);

        //make sure the user is logged in
        if(Meteor.isServer){
            throw new Meteor.Error('user-logged');
        }


        const userID = Accounts.createUser({
            email: email,
            password: password,
            name: name,
            birthday: birthday,
            gender: gender,
            company: company,
            photo: photo[0].base64,
            
        });

       
    },
    
    'users.update'(userObj) {
  
      check(userObj, Object);
      
      const user = Users.findOne({_id:userObj._id});
  
      if (Meteor.userId() !== this.userId) {
        throw new Meteor.Error('not-authorized');
      }
      
      return Users.update({_id:userObj._id}, { $set: userObj});
  
    },

  });
  
