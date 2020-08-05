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
    // Just render a placeholder container that will be filled in
    return (
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
          {!isLoggedIn() ? <Login /> : <About/>}
        </div>
        <div>
         <Button onClick={()=>this.props.history.push('/register')}>{'Registrar'}</Button>
        </div>
      </div>

  );
  }
}