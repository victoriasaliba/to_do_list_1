
import React, { Component } from 'react';
import { Tasks } from '../api/tasks.js';
import Task from './Task.js';
import {Meteor} from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM, { render } from 'react-dom';
import { Typography, FormControlLabel, IconButton, EditIcon, ListItem, ButtonGroup, NativeSelect } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';


class EditTask extends Component {
  constructor(props){
    super(props);

    this.state ={
      init:false,
      text:undefined,
      description:undefined,
      situation: undefined,
      data:undefined,
      user:undefined,
    }
  }
    
    static getDerivedStateFromProps(props, state){
      if(!state.init){
        return {
          init:!!props.task._id,
          text:props.task.text,
          description:props.task.description,
          situation:props.task.situation,
          data:props.task.createdAt,
          user:props.task.username,
        }
      } else {
        return {}
      }
    }
    
   
    handleChangeText = (evt) => {
      this.setState({text:evt.target.value});
    }
    handleChangeDescription = (evt) =>{
      this.setState({description:evt.target.value});
    }
  
    handleChangeSituation = (evt) =>{
      this.setState({situation:evt.target.value});
      }
    
    handleChangeData = (evt) =>{
      this.setState({data:evt.target.value});
    }
    
    handleChangeUser= (evt) =>{
      this.setState({user:evt.target.value});
    }
    
    save = () => {
      Meteor.call('tasks.update', {_id:this.props.task._id, text:this.state.text, description:this.state.description, situation:this.state.situation, data:this.state.data, user:this.state.user}, (e)=>{
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
              Task Edit
            </Typography>
        </header> 
         <div>  
            <Typography variant="h6">{'Nome da tarefa:'}</Typography><p>
            <TextField type={'text'} id={'text'} value={this.state.text} onChange={this.handleChangeText}/></p>
            <Typography variant="h6">{'Descrição:'}</Typography><p>
            <TextField type={'text'} id={'description'} value={this.state.description} onChange={this.handleChangeDescription}/></p>
            <Typography variant="h6">{'Data:'}</Typography><p>
            <TextField type={'text'} id={'data'} value={this.state.data} onChange={this.handleChangeData}/></p>
            <Typography variant="h6">{'Usuário:'}</Typography><p>
            <TextField type={'text'} id={'user'} value={this.state.user} onChange={this.handleChangeUser}/></p>
            <Typography variant="h6">{'Situação:'}</Typography><p>
            <FormControl >
              <NativeSelect
                value={this.state.situation}
                onChange={this.handleChangeSituation}
              >
                  <option value="Cadastrada">Cadastrada</option>
                  {this.state.situation=== "Cadastrada"||this.state.situation=== "Em Andamento"?
                  <option value="Em Andamento">Em Andamento</option> :''}
                  {this.state.situation=== "Em Andamento"||this.state.situation=== "Concluída"?
                  <option value="Concluída">Concluída</option> :''}
              </NativeSelect>
            </FormControl></p>

          </div>
           <div>
             <Button variant="contained" onClick={()=>this.props.history.push('/home')}>{'Voltar'}</Button>
             <Button variant="contained" onClick={this.save}>{'Salvar'}</Button>
           </div>

      </div>
    
    )
  }
}


export default withTracker((props) => {
  console.log('props.match.params', props.match.params);
  const id = props.match.params.task
  const handleTask = Meteor.subscribe('tasks', {_id:id});

  return {
    task: handleTask.ready()?Tasks.findOne({_id:id}):{},
    currentUser: Meteor.user(),
  };
})(EditTask);
 