import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


import { Router, Switch, Route, Link, withRouter } from 'react-router-dom'

//import { createBrowserHistory } from "history";

//export const history = createBrowserHistory();

export const isLoggedIn = () => {
  return Boolean(Meteor.userId());
};

const styles = theme => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input: {
    fontSize: 16,
    height: 36,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#888888',
    borderWidth: 1,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#3B5998',
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 10,
}
});

class Login extends Component {

  constructor(props) {
   super(props);

   this.state = {
     name: '',
     password: '',
     error: null,
   }
 
  }

  handleName = (event) => {
    this.setState({
        name: event.target.value
      });
  }

  handlePassword = (event) => {
    this.setState({
        password: event.target.value
      });
  }

  isValid() {
    let valid = false;

    if (this.state.name.length > 0 && this.state.password.length > 0) {
      valid = true;
    }

    if (this.state.name.length === 0) {
      this.setState({ error: 'You must enter a name' });
    } else if (this.state.password.length === 0) {
      this.setState({ error: 'You must enter a password' });
    }

    return valid;
  }

  onSignIn(event) {
    event.preventDefault();

    if (this.isValid()) {
      Meteor.loginWithPassword(this.state.name, this.state.password, function (error) {
        if(!error){
          console.log('You see this because the authentication process was a success')
        }
        else {
          this.handleError;
        }
      });
    }
  }


  handleName = (event) => {
    this.setState({
        name: event.target.value
      });
  }

  handlePassword = (event) => {
    this.setState({
        password: event.target.value
      });
  }
  handleError = (event) => {
   this.setState({
       error: event.currentTarget.value
     });
  }

  render() {
    return (
      <div className="container">

        <div>
          <Grid container style={styles.container}>

            <form>

                <TextField
                  type='name'
                  style={styles.input}
                  onChange={this.handleName}
                  placeholder="Nome"
                  autoCapitalize="none"
                  autoCorrect="false"
                  keyboardtype="name"
                />

                <TextField
                  type='password'
                  style={styles.input}
                  onChange={this.handlePassword}
                  placeholder="Password"
                  autoCapitalize="none"
                  autoCorrect="false"
                  securetextentry="true"
                  />

                  <Typography style={styles.error}> { this.state.error } </Typography>

                  <Button
                    style={styles.button}
                    label="Sign In"
                    primary="true"
                    variant="contained"
                    type='submit'
                    onClick={this.onSignIn.bind(this)}
                    >
                    <Typography style={styles.buttonText}> Sign In </Typography>
                  </Button>
                </form>
          </Grid>
      </div>
    </div>
    );
  }
}

export default withStyles(styles)((Login));