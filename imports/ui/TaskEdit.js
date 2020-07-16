import React, { Component } from 'react';
import { get, patch } from 'axios';

import { Tasks } from '../api/tasks.js';
import Task from './Task.js';

import {Meteor} from 'meteor/meteor';

import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import history from "history";
import App from './App.jsx';
import { Typography, FormControlLabel, IconButton, EditIcon, ListItem, ButtonGroup } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';



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
