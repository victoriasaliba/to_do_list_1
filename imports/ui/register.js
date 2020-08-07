import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';

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
import MenuItem from '@material-ui/core/MenuItem';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import { Router, Switch, Route, Link, withRouter } from 'react-router-dom'

import Grid from '@material-ui/core/Grid';

import { Users } from '../api/users.js';

import FileBase64 from 'react-file-base64';

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
    fontColor: 'red',
    marginBottom: 10,
}
});

class Register extends Component {

  constructor(props) {
   super(props);

   this.state = {
     name: '',
     email: '',
     birthday: new Date(),
     gender: '',
     company: '',
     photo: [],
     password: '',
     error: null,
   }

  }

  handleName = (event) => {
    this.setState({
        name: event.target.value
      });
  }

  handleEmail = (event) => {
    this.setState({
        email: event.target.value
      });
  }

  handleGender = (event) => {
    this.setState({
        gender: event.target.value
      });
  }

  handleBirthday = (event) => {
    this.setState({
        birthday: event.target.value
      });
  }

  handleCompany = (event) => {
    this.setState({
        company: event.target.value
      });
  }

  handlePhoto = (files) => {
   this.setState({
       photo: files
     });
  }
  handleError = (event) => {
    this.setState({
        error: event.target.value
      });
   }
   handlePassword = (event) => {
    this.setState({
        password: event.target.value
      });
   }
  isValid() {
    let valid = false;

    if (this.state.password.length > 0 && this.state.name.length > 0) {
      valid = true;
    }

    if (this.state.email.length === 0) {
      this.setState({ error: 'You must enter an email address' });
    } else if (this.state.password.length === 0) {
      this.setState({ error: 'You must enter a password' });
    } else if (this.state.name.length === 0) {
      this.setState({ error: 'You must enter a name' });
    } else if (this.state.company.length === 0) {
      this.setState({ error: 'You must enter a company' });
    } else if (this.state.gender.length === 0) {
      this.setState({ error: 'You must enter a gender' });
    } else if (this.state.birthday.length === 0) {
      this.setState({ error: 'You must enter a birthday' });
    }


    return valid;
  }

  onCreateAccount = (event) => {

    event.preventDefault();

    if (this.isValid()) {
      Accounts.createUser({ username: this.state.name, password:this.state.password,
        profile: {
            email: this.state.email,
            gender: this.state.gender,
            birthday: this.state.birthday,
            company: this.state.company,
            photo: this.state.photo
        }},
       (error) => {
        if(!error){
          console.log('You see this because the authentication process was a success')
        }
        else {
          this.handleError;
        }
        this.props.history.push('/about');
      }
      );
    }
  }




  render() {
    return (

      <div className="container">
        <header>
          <div>
              <Typography variant="h4" gutterBottom>
                Seja Bem-Vindo!
              </Typography>
              <Typography variant="h6" gutterBottom>
                Você precisa criar uma conta para acessar as tarefas.
              </Typography>
          </div>
        </header>

        <div>
        <Grid >
          <form onSubmit={this.onCreateAccount}>
            <List dense className={''}>
              <span className="text">
                <ListItem key="name" text="true">
                  <TextField
                    variant="outlined"
                    margin="normal"
                   
                    type='text'
                    onChange={this.handleName}
                    label="Nome"
                    autoCapitalize="none"
                    autoCorrect="false"
                    keyboardtype="name"
                  />
                </ListItem>

                <ListItem key="birthday" text="true">
                  <TextField
                    variant="outlined"
                    margin="normal"
                   
                    clearable="true"
                    type='date'
                    style={styles.input}
                    onChange={this.handleBirthday}
                    placeholder="Data de Nascimento"
                    autoCapitalize="none"
                    autoCorrect="false"
                    keyboardtype="date"
                    mindate={new Date()}
                  />
                </ListItem>

                <ListItem key="gender" text="true">
                  <TextField
                    variant="outlined"
                    margin="normal"
                   
                    type='select'
                    style={styles.input}
                    onChange={this.handleGender}
                    placeholder="Gênero"
                    value="feminino"
                    autoCapitalize="none"
                    autoCorrect="false"
                    keyboardtype="date"
                    select={true}
                  >
                    <MenuItem onChange={this.handleGender} value="feminino">Feminino</MenuItem>
                    <MenuItem onChange={this.handleGender} value="masculino">Masculino</MenuItem>
                  </TextField>
                </ListItem>

                <ListItem key="company" text="true">
                  <TextField
                    variant="outlined"
                    margin="normal"
                  
                    type='email'
                    style={styles.input}
                    onChange={this.handleCompany}
                    placeholder="Empresa"
                    autoCapitalize="none"
                    autoCorrect="false"
                    keyboardtype="email-address"
                  />
                </ListItem>

                <ListItem key="file" text="true">
                <TextField
                variant="outlined"
                margin="normal"
               
                  type='text'
                  style={styles.input}
                  placeholder="Foto"
                  disabled={true}
                  autoCapitalize="none"
                  autoCorrect="false"
                />
                  <FileBase64
                    multiple={ true }
                    onDone={ this.handlePhoto} />
                </ListItem>

                <ListItem key="email" text="true">
                <TextField
                variant="outlined"
                margin="normal"
                
                  type='email'
                  style={styles.input}
                  onChange={this.handleEmail}
                  placeholder="Email"
                  autoCapitalize="none"
                  autoCorrect="false"
                  keyboardtype="email-address"
                />
                </ListItem>

                <ListItem key="password" text="true">
                <TextField
                variant="outlined"
                margin="normal"
              
                  type='password'
                  style={styles.input}
                  onChange={this.handlePassword}
                  placeholder="Password"
                  autoCapitalize="none"
                  autoCorrect="false"
                  securetextentry="true"
                  />
                </ListItem>

                <Typography style={styles.error}> { this.state.error } </Typography>

                <ListItem>
                  <Button
                    variant="contained"
                    style={styles.button}
                    label="Create Account"
                    primary="true"
                    type='submit'
                    onClick={this.onCreateAccount}>
                    {'Registrar'}
                  </Button>
                  <div>
                    <Button  variant="contained" onClick={()=>this.props.history.push('/userlog')}>{'Voltar'}</Button>
                  </div>
                </ListItem>
              </span>
            </List>
          </form>
        </Grid>
      </div>
    </div>
    );
  }
}

export default withStyles(styles)((Register));