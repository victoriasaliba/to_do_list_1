import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
//import About from '../template/about.jsx'
//import AccountsUIWrapperLogout from './AccountsUIWrapperLogout.js';
import { Router } from 'react-router-dom'
import { createBrowserHistory } from "history";
import Avatar from '@material-ui/core/Avatar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
export const history = createBrowserHistory();


export const isLoggedIn = () => {
  return Boolean(Meteor.userId());
};
export const isLoggedOut = () => {
  return !Meteor.userId();
};

export default class Logs extends Component {
  logout() {
    Meteor.logout();
    this.props.history.push('/login');
}
  render() {
    return (
    <Router history={this.props.history}>
      <div className="log">
        <header>
          <div>
              {!isLoggedIn() ?
              <Typography variant="h5" gutterBottom>
                Seja bem vindo(a)!<p>
                Você precisa logar para acessar as tarefas.</p>
              </Typography>: ''}
          </div>
        </header>
        {!isLoggedIn() ? 
          <Button variant="contained" onClick={()=>this.props.history.push('/login')}>{'Login'}</Button>
            :<div classname="log">
               <Avatar style={{alignItems: "center"}}>
                <ExitToAppIcon/>
              </Avatar>
              <p></p>
              <Typography variant="h6" component="h2"> 
                Tem certeza de que quer sair?
              </Typography>
              <p></p>
              <Button variant="contained" onClick={this.logout.bind(this)}>{'Logout'}</Button>
           </div>
        }
        {!isLoggedIn() ?
         <Button variant="contained" onClick={()=>this.props.history.push('/register')}>{'Registrar'}</Button>:''}
        </div>
    </Router>

  );
  }
}