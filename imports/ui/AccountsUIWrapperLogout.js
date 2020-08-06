import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const styles = () => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
});

class Logout extends Component {

  logout() {
      Meteor.logout();
      this.props.history.push('/login');
  }
  
  render() {

    return (
     <div className='container'>
      <Grid container style={styles.container}>
         <header>
          <div>
            <Typography variant="h6" component="h2">Tem certeza que quer sair?</Typography>
              <Button
                style={styles.button}
                label="Log Out"
                primary="true"
                type='submit'
                onClick={this.logout.bind(this)}>
                {'Log Out'}
              </Button>
              <Button onClick={()=>this.props.history.push('/userlog')}>{'Voltar'}</Button>
          </div>
        </header>
      </Grid>
      </div>
    );
  }
}

export default withStyles(styles)((Logout));