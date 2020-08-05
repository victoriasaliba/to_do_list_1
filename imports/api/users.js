
import { Meteor } from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';
import { isLoggedIn } from '../ui/AccountsUIWrapperLogin';
import FileBase64 from 'react-file-base64';
import { roundToNearestMinutes } from 'date-fns/esm';

export const Users = Meteor.users;


if(Meteor.isServer){
    //this code only runs on the server
    // Only publish tasks that are public or belong to the current user
   
    Meteor.publish('Users', function UsersPublication() {
       return Meteor.users.find({}, {fields: {emails: 1, profile: 1}});
    });
}

Meteor.methods({
    /*'Users.insert'(name, email, password, birthday, gender, company, photo) {
        check(name, String);
        check(password, String);
        
    
        if(Meteor.isServer && Accounts.findUserByName(name)){
          throw new Meteor.Error('user-exists');
        }
    
        Accounts.createUser({ email: email,
          password: password,
          profile:{
          name: name,
          birthday: birthday,
          gender: gender,
          company: company,
          photo: photo[0].base64,
        }});

       
    },*/
    'Users.insert'(obj) {
      check(obj, Object);
      
  
      if(Meteor.isServer && Accounts.findUserByName(username)){
        throw new Meteor.Error('user-exists');
      }
  
      Accounts.createUser({ username: name});
      Accounts.setPassword({username: name, password: password});

     
  },
    
    'users.update'(userObj) {
  
      check(userObj, Object);
      
      const user = Users.findOne({_id:userObj._id});
  
      if (Meteor.userId() !== this.userId) {
        throw new Meteor.Error('not-authorized');
      }
      
      return Users.update({_id:userObj._id}, { $set: userObj});
  
    },
    'Users.login'(email, password) {
        check(email, String);
        check(password, String);
    
        if(!(Meteor.isServer && Accounts.findUserByEmail(email))){
          throw new Meteor.Error('user-dont-exist');
        }
    
        const userId = Accounts.createUser({ email: email,
          password: password,
          profile:{
          name: name,
          birthday: birthday,
          gender: gender,
          company: company,
          photo: photo[0].base64,
        }});
      },
      'Users.forgotpassword'(email, password) {
        check(email, String);
        check(password, String);
    
        if(!(Meteor.isServer && Accounts.findUserByEmail(email))){
          throw new Meteor.Error('user-dont-exist');
        }
    
        const userId = Accounts.findUserByEmail(email);
    
        Accounts.changePassword(userId, password);
      },
  });
  