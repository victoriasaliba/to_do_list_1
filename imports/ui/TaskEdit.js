
import React, { Component } from 'react';


import { Tasks } from '../api/tasks.js';
import Task from './Task.js';

import {Meteor} from 'meteor/meteor';

import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM, { render } from 'react-dom';
import history from "history";
import App from './App.jsx';
import { Typography, FormControlLabel, IconButton, EditIcon, ListItem, ButtonGroup } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';



class EditTask extends Component {
  constructor(props){
    super(props);

    this.state ={
      hideCompleted: false,
    }
  

      let id, name, description, stateT, date, ownerUsername, ownerId;

      let filteredTasks = this.props.tasks;

      filteredTasks.map((task) => {
        id = task._id;
        name = task.name;
        description = task.description;
        stateT = task.state;
        date = task.createdAt;
        ownerUsername = task.username;
        ownerId = task.owner;
      });

      this.state = {
        edition: false,
        id: id,
        name: name,
        description: description,
        stateT: stateT,
        date: date,
        ownerUsername: ownerUsername,
        ownerId: ownerId,
      };

      this.toggleState = this.toggleState.bind(this);
    }

    handleName(event) {
      this.setState({
          name: event.target.value
        });
    }

    handleDescription(event) {
      this.setState({
          description: event.target.value
        });
    }

    handleStateT(event) {
      this.setState({
          stateT: event.target.value
        });
    }

    handleDate(event) {
      this.setState({
          date: event.target.value
        });
    }

    handleOwnerUsername(event) {
      this.setState({
          ownerUsername: event.target.value
        });
    }

    handleSubmit(event){

      event.preventDefault();

      Meteor.call('tasks.update', this.state.id, this.state.name, this.state.description, this.state.stateT, this.state.date);
      Meteor.call('tasks.setModeEdition', this.state.id, false);
      this.setState({name: "", description: "", stateT: "", date: "", ownerUsername: ""});

      return(
        <Router>
            <Route path="/home" exact={true} render={App} />
        </Router>
      );
  }
    
    historyBack = () => {
      history.goBack();
    }
    
    toggleState(event) {

      event.preventDefault();
      const value = event.currentTarget.value;
      Meteor.call('tasks.updateState', this.state.id, value);
      console.log(this.props.history);
    }

    toggleEdition() {
      this.setState({
        edition: !this.state.edition,
      });
  
 }

  handleSubmit(event){
    event.preventDefault();
    //find the text field via React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call('tasks.insert', text);

    //clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

renderTasks() {
  let filteredTasks = this.props.tasks;
 
    return filteredTasks.map((task) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      return (
        <Task 
        key={task._id}
        task={task}
        />
    );
   });
  }

  render() {
   
    return (
      <div className="container">
        <header>
          <div>
            <Typography variant="h4" >
              Task Edit
           
          
            </Typography>
          </div>

        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    
    );
  }
}

class EditTaskComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text:undefined,
    }
  }

  static getDerivedStateFromProps(props, state) {
    if(!state.text) {
      return {
        text:props.task.text,
      }
    } else {
      return {}
    }

  }

  handleChange = (evt) => {
    this.setState({text:evt.target.value});
  }

  save = () => {
    Meteor.call('tasks.update',{_id:this.props.task._id,text:this.state.text},(e,r)=>{
      if(!e) {
        console.log('Salvo com sucesso',r);
      } else {
        console.log('Erro:',e);
      }
    })
  }

  render() {
    const {text} = this.state;

    return(
        <div style={{width:'100%',display:'flex',flexDirection:'column'}}>
          <div style={{width:'100%'}}>
            <label>{'Texto:'}</label>
            <input type={'text'} id={'text'} value={text} onChange={this.handleChange} />
          </div>
          <div style={{width:'100%'}}>
            <button onClick={()=>this.props.history.push('/home')}>{'Voltar'}</button>
          </div>
          <div style={{width:'100%'}}>
            <button onClick={this.save}>{'Salvar'}</button>
          </div>
          {JSON.stringify(this.props.task)}
        </div>
    )
  }

}

const EditTaskFunction = (props) => {

  const [text,setText] = React.useState(props.task.text)

  React.useEffect(()=>{
    if(!text) {
      setText(props.task.text);
    }
  })

  const handleChange = (evt) => {
    setText(evt.target.value)
  }

  return (<div style={{width:'100%',display:'flex',flexDirection:'column'}}>
    <div style={{width:'100%'}}>
      <label>{'Texto:'}</label>
      <input type={'text'} id={'text'} value={text} onChange={handleChange} />
    </div>
    <div style={{width:'100%'}}>

    </div>
    {JSON.stringify(props.task)}
  </div>);
}


export default withTracker((props) => {
  console.log('props.match.params',props.match.params);
  const id = props.match.params.task
  const handleTask = Meteor.subscribe('tasks',{_id:id});

  return {
    task: handleTask.ready()?Tasks.findOne({_id:id}):{},
    currentUser: Meteor.user(),
  };
})(EditTaskComponent);
 