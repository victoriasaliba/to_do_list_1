import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

//import About from '../template/about.jsx'
//import AccountsUIWrapperLogout from './AccountsUIWrapperLogout.js';
import { Router } from 'react-router-dom'
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();


export const isLoggedIn = () => {
  return Boolean(Meteor.userId());
};
export const isLoggedOut = () => {
  return !Meteor.userId();
};

export default class Logs extends Component {

  render() {
    
    return (
    <Router history={this.props.history}>
      <div className="container">
        <header>
          <div>
              {!isLoggedIn() ?
              <Typography variant="h5" gutterBottom>
                Seja bem vindo(a)!<p>
                Você precisa logar para acessar as tarefas.</p>
              </Typography>: ''}
          </div>
        </header>

        <div>
        {!isLoggedIn() ? 
        <Button onClick={()=>this.props.history.push('/login')}>{'Login'}</Button>:
        <Button onClick={()=>this.props.history.push('/logout')}>{'Logout'}</Button>}
        <div>
        {!isLoggedIn() ?
         <Button onClick={()=>this.props.history.push('/register')}>{'Registrar'}</Button>:''}
      </div>
        </div>
      </div>
    </Router>

  );
  }
}