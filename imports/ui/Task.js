import React, { Component } from 'react';
import {Meteor} from 'meteor/meteor';
import classnames from 'classnames';
import DeleteIcon from '@material-ui/icons/Delete';
import Avatar from '@material-ui/core/Avatar';
import AssignmentIcon from '@material-ui/icons/Assignment';


import {Tasks} from '../api/tasks.js';

// Task component - represents a single todo item
export default class Task extends Component {
    toggleChecked(){
        // Set the checked property to the opposite of its current value
        Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);
    }
    deleteThisTask(){
        Meteor.call('tasks.remove', this.props.task._id);
    }
    togglePrivate(){
      Meteor.call('tasks.setPrivate', this.props.task._id, !this.props.task.private);
    }

  render() {
      //give tasks a different className when they are checked off
      //so that we can style them nicely in CSS
      const taskClassName = classnames({
        checked: this.props.task.checked,
        private: this.props.task.private,
      }); 
    return (
      <li className={taskClassName}>
          <DeleteIcon className="delete" onClick={this.deleteThisTask.bind(this)}>
              &times;
          </DeleteIcon>
          <Avatar>
             <AssignmentIcon />
         </Avatar>
          <input
            type="checkbox"
            readOnly
            checked={!!this.props.task.checked}
            onClick={this.toggleChecked.bind(this)}
            />
        
         {this.props.showPrivateButton ? (
              <button className="toggle-private" onClick={this.togglePrivate.bind(this)}>
                {this.props.task.private ? 'Privado' : 'Público'}
              </button>
            ) : ''}
     
        <span className="text">
          <strong>{this.props.task.username}</strong>: {this.props.task.text}
        </span>
        </li>
    );
  }
}

