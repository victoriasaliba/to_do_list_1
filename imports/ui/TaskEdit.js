import 'date-fns';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import { Tasks } from '../api/tasks.js';



import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Icon from '@material-ui/core/Icon';

import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import AccountsUIWrapperLogin from './AccountsUIWrapperLogin.js';


import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

import { withTracker } from 'meteor/react-meteor-data';
import Task from './Task.js';
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from 'react-router-dom'


// Task component - represents a single todo item
class EditTask extends Component {

    render(){

        return(
           <div>
               <h1>Sobre!</h1>
           </div>
        )    
        
    }
}
export default withTracker(EditTask);