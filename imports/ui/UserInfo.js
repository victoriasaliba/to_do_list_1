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
import TextField from '@material-ui/core/TextField';
import Avatar from 'react-avatar-edit';
import { data } from 'jquery';

class UserInfo extends Component {
  constructor(props){
    super(props);

    this.state ={
      name:undefined,
      email:undefined,
      birthday:undefined,
      gender:undefined,
      company:undefined,
      photo:null,
    }
  }
    
    static getDerivedStateFromProps(props, state){
      if(!state.name&&!!props.user){
        return {
          name:props.user.username,
          email:props.user.profile.email,
          birthday:props.user.profile.birthday,
          gender:props.user.profile.gender,
          company:props.user.profile.company,
          photo:props.user.profile.photo,
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
  
    /*handlePhoto = (event) => {
     this.setState({
         photo: URL.createObjectURL(event.target.files[0])
       });
    }*/
    getPhoto(files){
      this.setState({ photo: files })
    }
    save = () => {
      console.log('THIS.STATE>>>',this.state)
      console.log(this.state.photo);
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
            <Typography variant="h4" >
              User Profile
            </Typography>
        </header> 
        {this.props.currentUser ?
        <div style={{marginLeft: '20px'}}>  
            <Typography variant="h6">{'Nome:'}</Typography><p>
            <TextField  type={'text'} id={'name'} value={this.state.name} onChange={this.handleName.bind(this)}/></p>
            <Typography variant="h6">{'Email:'}</Typography><p>
            <TextField  type={'text'} id={'email'} value={this.state.email} onChange={this.handleEmail}/></p>
            <Typography variant="h6">{'Data de Nascimento:'}</Typography><p>
            <TextField  type={'text'} id={'birthday'} value={this.state.birthday} onChange={this.handleBirthday}/></p>
            <Typography variant="h6">{'Gênero:'}</Typography><p>          
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
            <Typography variant="h6">{'Empresa:'}</Typography><p>
            <TextField  type={'text'} id={'company'} value={this.state.company} onChange={this.handleCompany}/></p>
            <Typography variant="h6">{'Foto:'}</Typography>
            { this.state.photo.map((photo,i) => {
              return <img key={i} src={photo.base64} />
            }) }
          <img src="" />
            <FileBase64
              multiple={ true }
              onDone={ this.getPhoto.bind(this) } />
          </div>
          : 
          <Typography style={{ textAlign: "center"}}variant="h5" gutterBottom>
            Você precisa logar para acessar o User Profile.
          </Typography>}
           <div>
           {this.props.currentUser ?
             <Button variant="contained" onClick={this.save}>{'Salvar'}</Button> : ''}
           </div>

      </div>
    
    )
  }
}


export default withTracker((props) => {

  const userId = Meteor.userId(); 
  const handleUsers = Meteor.subscribe('users', {_id:userId});
  return {
    user: Meteor.user(),
    currentUser: Meteor.user(),
  };

})(UserInfo);