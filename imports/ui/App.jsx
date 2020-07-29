import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

 
import { Tasks } from '../api/tasks.js';
import Task from './Task.js';

import AccountsUIWrapper from './AccountsUIWrapper.js';
import history from "history";
import { isLoggedIn } from '../ui/AccountsUIWrapperLogin';


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


  handleChange = (event) => {
      this.setState({value:event.target.value})
  }


  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List </h1>        
          <AccountsUIWrapper/>
          { this.props.currentUser ?
            <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
              <input
                value={this.state.value}
                onChange={this.handleChange}
                type="text"
                ref="textInput"
                placeholder="Adicione novas tarefas"
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
  const handleTask = Meteor.subscribe('tasks');

  const loading = !handleTask.ready();

  return {
    tasks: loading?[]:Tasks.find({}, { sort: { createdAt: -1}}).fetch(),
    imcompleteCount: loading?[]:Tasks.find({checked: {$ne: true}}).count(),
    currentUser: Meteor.user(),
  };
})(App);