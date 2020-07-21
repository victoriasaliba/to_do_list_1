
import React, { Component } from 'react';
import { Tasks } from '../api/tasks.js';
import Task from './Task.js';
import {Meteor} from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM, { render } from 'react-dom';
import { Typography, FormControlLabel, IconButton, EditIcon, ListItem, ButtonGroup } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


class EditTask extends Component {
  constructor(props){
    super(props);

    this.state ={
      text:undefined,
      description:undefined,
      situation:undefined,
      data:undefined,
      user:undefined,
    }
  }
    
    static getDerivedStateFromProps(props, state){
      if(!state.text||!state.description||!state.situation||!state.data||!state.user){
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
   //const {text} = this.state;
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
            <label>{'Situação:'}</label><p>
            <input type={'text'} id={'situation'} value={this.state.situation} onChange={this.handleChange}/></p>
            <label>{'Data:'}</label><p>
            <input type={'text'} id={'data'} value={this.state.data} onChange={this.handleChangeData}/></p>
            <label>{'Usuário:'}</label><p>
            <input type={'text'} id={'user'} value={this.state.user} onChange={this.handleChangeUser}/></p>
          </div>
           <div>
             <Button onClick={()=>this.props.history.push('/home')}>{'Voltar'}</Button>
           </div>
           <div>
             <Button onClick={this.save}>{'Salvar'}</Button>
           </div>

      </div>
    
    )
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
<<<<<<< HEAD
  console.log('props.match.params', props.match.params);
  const id = props.match.params.task
  const handleTask = Meteor.subscribe('tasks', {_id:id});
=======
  console.log('props.match.params',props.match.params);
  const id = props.match.params.task
  const handleTask = Meteor.subscribe('tasks',{_id:id});
>>>>>>> 74ca6e4d23da2fc7abc8ea20c9de24cd096f2f94

  return {
    task: handleTask.ready()?Tasks.findOne({_id:id}):{},
    currentUser: Meteor.user(),
  };
})(EditTaskComponent);
 