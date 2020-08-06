import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
//import { createBrowserHistory } from "history";
//export const history = createBrowserHistory();



export const isLoggedIn = () => {
  return Boolean(Meteor.userId());
};

const styles = () => ({
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
      this.props.history.push('/about');
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
        <header>
          <div>
          <Typography variant="h4" component="h2" >
                    Login    
              </Typography>
          </div>
        </header>

        <div>
          <Grid container style={styles.container}>

            <form >

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
                    label="Log In"        
                    type='submit'
                    onClick={this.onSignIn.bind(this)}
                 >
                    {'Log In'}
                  </Button>
                  <Button onClick={()=>this.props.history.push('/userlog')}>{'Voltar'}</Button>
                </form>
          </Grid>
      </div>
    </div>
    
    );
  }
}

export default withStyles(styles)((Login));