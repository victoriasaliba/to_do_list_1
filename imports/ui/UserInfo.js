import React, { Component } from 'react';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { Tasks } from '../api/tasks.js';
import Task from './Task.js';
import {Meteor} from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM, { render } from 'react-dom';
import { Typography, FormControlLabel, IconButton, EditIcon, ListItem, ButtonGroup, FormControl, InputLabel, NativeSelect } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Users from '../api/users.js'
import FileBase64 from 'react-file-base64';

class UserInfo extends Component {
  constructor(props){
    super(props);

    this.state ={
      name:undefined,
      email:undefined,
      birthday:undefined,
      gender:undefined,
      company:undefined,
      photo:undefined,
    }


    // this.handleCompany = this.handleCompany.bind(this);
  }
    
    static getDerivedStateFromProps(props, state){
      if(!state.name&&!!props.user){
        return {
          name:props.user.username,
<<<<<<< HEAD
          email:props.user.profile.email,
          birthday:props.user.profile.birthday,
          gender:props.user.profile.gender,
          company:props.user.profile.company,
          photo:props.user.profile.photo,
=======
                email:props.user.profile.email,
                birthday:props.user.profile.birthday,
                gender:props.user.profile.gender,
                company:props.user.profile.company,
                photo:props.user.profile.photo,
>>>>>>> 9853f43b85d55722fbd84f74a31b8e823e0bd89a
        }
      } else {
        return {}
      }
    }
  

    handleName = (event) => {
      this.setState({
          name: event.target.value
        });
    }
  
    handleEmail = (event) => {
      this.setState({
          email: event.target.value
        });
    }
  
    handleGender = (event) => {
      this.setState({
          gender: event.target.value
        });
    }
  
    handleBirthday = (event) => {
      this.setState({
          birthday: event.target.value
        });
    }
  
    handleCompany = (event) => {
      this.setState({
          company: event.target.value
        });
    }
  
    handlePhoto = (event) => {
     this.setState({
         photo: files
       });
    }

    save = () => {
      console.log('THIS.STATE>>>',this.state)
      Meteor.call('users.update', { _id:this.props.user._id,username:this.state.name,
          profile: {
              email: this.state.email,
              gender: this.state.gender,
              birthday: this.state.birthday,
              company: this.state.company,
              photo: this.state.photo
          }
          }, (e)=>{
        if(!e){
          console.log('Salvo com sucesso');
        } else {
          console.log('Erro:', e);
        }
      })
    }
  

  render() {

      console.log('this.props',this.props);

    return (
      <div className="container">
        <header>
            <Typography variant="h5" >
              User Profile
            </Typography>
        </header> 
        <div>  
            <label>{'Nome:'}</label><p>
            <input type={'text'} id={'name'} value={this.state.name} onChange={this.handleName.bind(this)}/></p>
            <label>{'Email:'}</label><p>
            <input type={'text'} id={'email'} value={this.state.email} onChange={this.handleEmail}/></p>
            <label>{'Data de nascimento:'}</label><p>
            <input type={'text'} id={'birthday'} value={this.state.birthday} onChange={this.handleBirthday}/></p>
            <label>{'Gênero:'}</label><p>           
             <FormControl >
              <NativeSelect
                value={this.state.gender}
                onChange={this.handleGender}
                inputProps={{
                  gender: 'gender',
                }}
              >
                  <option >Gênero</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Masculino">Masculino</option> 
              </NativeSelect>
            </FormControl></p>
            <label>{'Gênero:'}</label><p>
            <input type={'text'} id={'gender'} value={this.state.gender} onChange={this.handleGender}/></p>
            <label>{'Empresa:'}</label><p>
            <input type={'text'} id={'company'} value={this.state.company} onChange={this.handleCompany}/></p>
            <label>{'Foto:'}</label><p>
            <input type={'file'} id={'photo'} value={this.state.photo} onChange={this.handlePhoto}/></p>
          </div>
           <div>
             <Button onClick={this.save}>{'Salvar'}</Button>
           </div>

      </div>
    
    )
  }
}


export default withTracker((props) => {

  const userId = Meteor.userId(); 
  const handleUsers = Meteor.subscribe('users', {_id:userId});
  return {
<<<<<<< HEAD
    user: Meteor.user(),
=======
    user: Meteor.user(),//handleUsers.ready()?Users.findOne({_id:userId}):{},
>>>>>>> 9853f43b85d55722fbd84f74a31b8e823e0bd89a
    currentUser: Meteor.user(),
  };

})(UserInfo);