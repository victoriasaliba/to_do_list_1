
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

 
import { Tasks } from '../api/tasks.js';
import Task from './Task.js';

import AccountsUIWrapper from './AccountsUIWrapper.js';
import Sign from './AccountsUIWrapperLogin.js';

//import Todo from '../todo/todo.jsx'
//import About from '../about/about.jsx'



/*
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { withTracker } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.js';


import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import SignIn from './AccountsUIWrapperLogin.js';
*/


// App component - represents the whole app
  class App extends Component {
    constructor(props){
      super(props);

      this.state ={
        hideCompleted: false,
      };
    }
    handleSubmit(event){
      event.preventDefault();
      //find the text field via React ref
      const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

      Meteor.call('tasks.insert', text);

      //clear form
      ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    updateUser(){
      Meteor.call('users.update', Meteor.userId);
      console.log(this.props.currentUser);
    }


  toggleHideCompleted(){
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  renderTasks() {
    let filteredTasks = this.props.tasks;
    if(this.state.hideCompleted){
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }
    return filteredTasks.map((task) => {
     const currentUserId = this.props.currentUser && this.props.currentUser._id;
     const showPrivateButton = task.owner === currentUserId;

     return (
       <Task 
        key={task._id}
        task={task}
        showPrivateButton={showPrivateButton}
        />
     );
    });
  }
  
  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List ({this.props.imcompleteCount})</h1>
          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted.bind(this)}
              />
              Hide Completed Tasks
          </label>
        
          <AccountsUIWrapper/>
          { this.props.currentUser ?
            <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
              <input
                type="text"
                ref="textInput"
                placeholder="Type to add new tasks"
              />
            </form> : ''
          }
        </header>
 
        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    
    );
  }
}
export default withTracker(() => {
  Meteor.subscribe('tasks');

  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1}}).fetch(),
    imcompleteCount: Tasks.find({checked: {$ne: true}}).count(),
    currentUser: Meteor.user(),
  };
})(App);




/*
render() {

  return (
    <div>
    { this.props.currentUser ?
        <div className="container">
          <header>
              <div>
                <Typography variant="h3" gutterBottom>
                  Todo List ({this.props.incompleteCount})
                </Typography>

                  <FormControlLabel className="hide-completed"
                          control={
                            <Switch
                              checked={this.state.hideCompleted}
                              onChange={this.toggleHideCompleted.bind(this)}
                              name="checkedB"
                              color="primary"
                            />
                          }
                          label="Ocultar tarefas completadas"
                        />

                        <FormControlLabel className="hide-completed"
                                control={
                                  <Switch
                                    checked={this.state.hideCompleted}
                                    onChange={this.updateUser.bind(this)}
                                    name="checkedB"
                                    color="primary"
                                  />
                                }
                                label="Mudar usuario"
                              />

              </div>
             
          </header>

          {this.renderTasks()}
      </div> : <SignIn />
    }
    </div>
  );
}
}

export default withTracker(() => {

Meteor.subscribe('tasks', "");

return {
  tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
  incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
  currentUser: Meteor.user(),
};
})(App);

*/