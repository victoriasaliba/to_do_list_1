import React, { Component } from 'react';
import {Meteor} from 'meteor/meteor';
import classnames from 'classnames';
import DeleteIcon from '@material-ui/icons/Delete';
import Avatar from '@material-ui/core/Avatar';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PublicIcon from '@material-ui/icons/Public';
import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';
import { green } from '@material-ui/core/colors';
import {
  Router,
  Switch,
  Route,
  Link,
  NavLink,
  withRouter
} from "react-router-dom";
import {Tasks} from '../api/tasks.js';
import { List } from '@material-ui/core';
import EditTask from './TaskEdit.js'
import { createBrowserHistory } from "history";


//import { matchPath } from "react-router";



export const history = createBrowserHistory();

// Task component - represents a single todo item
 export class Task extends Component{
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
    editThisTask(){
        const taskId = this.props.task._id;
<<<<<<< HEAD
        const url = `/edittask/${taskId}`;
        this.props.history.push(url);  
=======
        const task = Tasks.findOne(taskId);
        const url = `/edittask/${taskId}`;
        // <Route path={url} component={EditTask}/>
        this.props.history.push(url);
>>>>>>> 74ca6e4d23da2fc7abc8ea20c9de24cd096f2f94
   }

  render() {
    
      //give tasks a different className when they are checked off
      //so that we can style them nicely in CSS
      const taskClassName = classnames({
        checked: this.props.task.checked,
        private: this.props.task.private,
      }); 
    return (
     
      <List className={taskClassName}>
         <Router history={this.props.history}>
            <DeleteIcon className="delete" onClick={this.deleteThisTask.bind(this)}>
                &times;
            </DeleteIcon>
            <EditIcon className="edit" onClick={this.editThisTask.bind(this)}>
            </EditIcon> 
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
                {this.props.task.private ? <PersonIcon color="primary"/> : <PublicIcon style={{ color: green[500] }}/>}
              </button>
            ) : ''}
     
        <span className="text">
          <strong>{this.props.task.username}</strong>: {this.props.task.text}
        </span>
        </Router>
        </List>
    
    );
  }
}

export default withRouter(Task);

