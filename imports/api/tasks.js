import { Meteor } from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';
import { isLoggedIn } from '../ui/AccountsUIWrapperLogin';


export const Tasks = new Mongo.Collection('tasks');


if(Meteor.isServer){
    //this code only runs on the server
    // Only publish tasks that are public or belong to the current user
   
    Meteor.publish('tasks', function tasksPublication() {
        if(isLoggedIn()===true){
            return Tasks.find({
                $or: [
                    { private: { $ne: true } },
                    { owner: this.userId },
                ],                
            });
        }else{
            console.log('Please log in.')
        }
    });
}

Meteor.methods({
    'tasks.insert'(text){
        check(text, String);

        //make sure the user is logged in before inserting a task
        if(!this.userId){
            throw new Meteor.Error('not-authorized');
        }

        Tasks.insert({
            text,
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
        });
    },
    'tasks.remove'(taskId){
        check(taskId, String);
        
        const task = Tasks.findOne(taskId);
        if (task.private && task.owner !== this.userId) {
          // If the task is private, make sure only the owner can delete it
          throw new Meteor.Error('not-authorized');
        }
    
        if (task.owner === this.userId){
            Tasks.remove(taskId);
        }
    },
    'tasks.setChecked'(taskId, setChecked){
        check(taskId, String);
        check(setChecked, Boolean);

    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== this.userId) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

        Tasks.update(taskId, { $set: { checked: setChecked}});
    },
    'tasks.setPrivate'(taskId, setToPrivate){
    check(taskId, String);
    check(setToPrivate, Boolean);

    const task = Tasks.findOne(taskId);

    //make sure only the task owner can make a task private
    if(task.owner !== this.userId){
        throw new Meteor.Error('not-authorized');
    }

    Tasks.update(taskId, { $set: {private: setToPrivate}});
  },

///////////////////
'tasks.setModeEdition'(taskId, setToModeEdition) {
    check(taskId, String);
    check(setToModeEdition, Boolean);
  
    const task = Tasks.findOne(taskId);
  
    // Make sure only the task owner can make a task private
    if (task.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }
  
    Tasks.update(taskId, { $set: { modeedition: setToModeEdition } });
    },

    'tasks.updateState'(taskId, stateT) {
      check(taskId, String);
      check(stateT, String);
  
      const task = Tasks.findOne(taskId);
  
      Tasks.update(taskId, { $set: { state: stateT } });
  
    },

    'tasks.update'(taskObj) {

        check(taskObj,Object);
      // check(taskId, String);
      // check(name, String);
      // check(description, String);
      // check(stateT, String);
      // check(date, String);
  
      const task = Tasks.findOne({_id:taskObj._id});
  
      if (!task||task.owner !== this.userId) {
        throw new Meteor.Error('not-authorized');
      }
  
      return Tasks.update({_id:taskObj._id}, { $set: taskObj});
  
    },

  });
  

