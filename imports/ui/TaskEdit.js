
import React, { Component } from 'react';
import { Tasks } from '../api/tasks.js';
import Task from './Task.js';
import {Meteor} from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM, { render } from 'react-dom';
import { Typography, FormControlLabel, IconButton, EditIcon, ListItem, ButtonGroup, NativeSelect } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';


class EditTask extends Component {
  constructor(props){
    super(props);

    this.state ={
      text:undefined,
      description:undefined,
      situation: "Cadastrada",
      data:undefined,
      user:undefined,
    }
  }
    
    static getDerivedStateFromProps(props, state){
      if(!state.text){
        return {
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
            <label>{'Nome:'}</label><p>
            <input type={'text'} id={'text'} value={this.state.text} onChange={this.handleChangeText}/></p>
            <label>{'Texto:'}</label><p>
            <input type={'text'} id={'description'} value={this.state.description} onChange={this.handleChangeDescription}/></p>
            <label>{'Data:'}</label><p>
            <input type={'text'} id={'data'} value={this.state.data} onChange={this.handleChangeData}/></p>
            <label>{'Usuário:'}</label><p>
            <input type={'text'} id={'user'} value={this.state.user} onChange={this.handleChangeUser}/></p>
            <label>{'Situação:'}</label><p>
            <input type={'text'} id={'situation'} value={this.state.situation} onChange={this.handleChangeSituation}/></p>
          
            <FormControl >
              <InputLabel htmlFor="name-native-disabled">Situação</InputLabel>
              <NativeSelect
                value={this.state.situation}
                onChange={this.handleChangeSituation}
                inputProps={{
                  situation: 'situation',
                }}
              >
                  <option value="Cadastrada">Cadastrada</option>
                  <option value="Em Andamento">Em Andamento</option>
                  <option value="Concluída">Concluída</option>
              </NativeSelect>
            </FormControl>

          </div>
           <div>
             <Button onClick={()=>this.props.history.push('/home')}>{'Voltar'}</Button>
             <Button onClick={this.save}>{'Salvar'}</Button>
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
 