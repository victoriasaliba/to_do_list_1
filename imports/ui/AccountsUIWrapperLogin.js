import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/Lock';
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
    display: 'flex',
    flexDirection: 'column',
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
      <div className="log">
        <header>
          <div>
          <Avatar style={{alignItems: "center"}}>
            <LockIcon/>
          </Avatar>
          <p>
          <Typography variant="h5" component="h2" >
                    Login    
              </Typography></p>
          </div>
        </header>
        <div className="button" >
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  type='name'
                  style={styles.input}
                  onChange={this.handleName}
                  placeholder="Name"
                  autoCapitalize="none"
                  autoCorrect="false"
                  keyboardtype="name"
                />
        </div>
             <div className="button" >
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  type='password'
                  style={styles.input}
                  onChange={this.handlePassword}
                  placeholder="Password"
                  autoCapitalize="none"
                  autoCorrect="false"
                  securetextentry="true"
                  />
               </div>
                  <div className="button">
              
                  <Typography style={styles.error}> { this.state.error } </Typography>

                  <Button
                    style={styles.button}
                    label="Log In"        
                    type='submit'
                    variant="contained"
                    onClick={this.onSignIn.bind(this)}
                 >
                    {'Log In'}
                  </Button>
                  <Button variant="contained" onClick={()=>this.props.history.push('/userlog')}>{'Voltar'}</Button>
           
          
        </div>
      </div>
    );
  }
}
export default withStyles(styles)((Login));