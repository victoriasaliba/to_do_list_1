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
import FileBase64 from 'react-file-base64';

class UserInfo extends Component {
  constructor(props){
    super(props);

    this.state ={
      name:this.props.currentUser,
    }
  }
    
    static getDerivedStateFromProps(props, state){
      if(!state.currentUser){
        return {
          name:props.currentUser,
        }
      } else {
        return {}
      }
    }
   

    handleName(event) {
      this.setState({
          name: event.target.value
        });
    }
  
    handleEmail(event) {
      this.setState({
          email: event.target.value
        });
    }
  
    handleGender(event) {
      this.setState({
          gender: event.target.value
        });
    }
  
    handleBirthday(event) {
      this.setState({
          birthday: event.target.value
        });
    }
  
    handleCompany(event) {
      this.setState({
          company: event.target.value
        });
    }
  
    handlePhoto(files) {
     this.setState({
         photo: files
       });
    }

    save = () => {
      Meteor.call('users.update', { name:this.state.name}, (e)=>{
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
            <input type={'text'} id={'name'} value={this.state.name} onChange={this.handleName}/></p>
            <label>{'Email:'}</label><p>
            <input type={'text'} id={'description'} value={this.state.description} onChange={this.handleChangeUser}/></p>
            <label>{'Data de nascimento:'}</label><p>
            <input type={'text'} id={'situation'} value={this.state.situation} onChange={this.handleChangeUser}/></p>
            <label>{'Sexo:'}</label><p>
            <input type={'text'} id={'data'} value={this.state.data} onChange={this.handleChangeUser}/></p>
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
