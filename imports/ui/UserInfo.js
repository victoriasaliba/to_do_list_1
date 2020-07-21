import React, { Component } from 'react';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { Tasks } from '../api/tasks.js';
import Task from './Task.js';
import {Meteor} from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM, { render } from 'react-dom';
import { Typography, FormControlLabel, IconButton, EditIcon, ListItem, ButtonGroup } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Users from '../api/users.js'



class UserInfo extends Component {
  constructor(props){
    super(props);

    this.state ={
      user:undefined,
    }
  }
    
    static getDerivedStateFromProps(props, state){
      if(!state.user){
        return {
        
          user:props.currentUser,
        }
      } else {
        return {}
      }
    }
   

    handleChangeUser= (evt) =>{
      this.setState({user:evt.target.value});
    }
////////////////////////////////////////////////EDITAR TASKS.UPDATE PARA USERS.IPDATE
    save = () => {
      Meteor.call('tasks.update', { user:this.state.user}, (e)=>{
        if(!e){
          console.log('Salvo com sucesso');
        } else {
          console.log('Erro:', e);
        }
      })
    }
  

  render() {

    return (
      <div className="container">
        <header>
            <Typography variant="h5" >
              User Profile
            </Typography>
        </header> 
        <div>  
            <label>{'Nome:'}</label><p>
            <input type={'text'} id={'user'} value={this.state.user} onChange={this.handleChangeText}/></p>
            <label>{'Email:'}</label><p>
            <input type={'text'} id={'description'} value={this.state.description} onChange={this.handleChangeDescription}/></p>
            <label>{'Data de nascimento:'}</label><p>
            <input type={'text'} id={'situation'} value={this.state.situation} onChange={this.handleChangeSituation}/></p>
            <label>{'Sexo:'}</label><p>
            <input type={'text'} id={'data'} value={this.state.data} onChange={this.handleChangeData}/></p>
            <label>{'Empresa:'}</label><p>
            <input type={'text'} id={'user'} value={this.state.user} onChange={this.handleChangeUser}/></p>
            <label>{'Foto:'}</label><p>
            <input type={'text'} id={'user'} value={this.state.user} onChange={this.handleChangeUser}/></p>
          </div>
           <div>
             <Button onClick={this.save}>{'Salvar'}</Button>
           </div>

      </div>
    
    )
  }
}


export default withTracker((props) => {
  console.log('props.match.params', props.match.params);
  const id = props.match.params.users
  const handleUsers = Meteor.subscribe('users', {_id:id});

  return {
    Users: handleUsers.ready()?Users.findOne({_id:id}):{},
    currentUser: Meteor.user(),
  };
/*
  return {
    users: Users.find({}).fetch(),
    incompleteCount: Users.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };

  */
})(UserInfo);
