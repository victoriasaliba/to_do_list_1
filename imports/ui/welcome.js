import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Login from './AccountsUIWrapperLogin.js';
import About from '../template/about.jsx'
//import AccountsUIWrapperLogout from './AccountsUIWrapperLogout.js';

//import Login from '../components/Login.js';

//import Logout from '../components/Logout.js';

//import Register from '../components/Register.js';

const requireAuth = (nextState, replace) => {
  if (isLoggedOut()) {
    replace({
      pathname: '/login',
    });
  }
};

export const isLoggedIn = () => {
  return Boolean(Meteor.userId());
};
export const isLoggedOut = () => {
  return !Meteor.userId();
};

export default class Welcome extends Component {

  render() {
    return (
      <div className="log">
        <header>
              {!isLoggedIn() ?
              <Typography variant="h5" gutterBottom>
                Seja bem vindo(a)!<p>
                Você precisa logar para acessar as tarefas.</p>
              </Typography>: ''}
        </header>

      
          {!isLoggedIn() ? <Login /> : <About/>}
          {isLoggedIn() ? this.props.history.push('/about'):''}
   
        <div>
          {!isLoggedIn() ? 
         <p><Button variant="contained" onClick={()=>this.props.history.push('/register')}>{'Registrar'}</Button></p> : ''}
        </div>
      </div>

  );
  }
}