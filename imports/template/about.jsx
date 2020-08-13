import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import { Router, Route, Link, withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { withTracker } from 'meteor/react-meteor-data';
import { Tasks } from '../api/tasks.js';
import { makeStyles } from '@material-ui/core/styles';
import { isLoggedIn } from '../ui/userLogs.js';


 class About extends Component{
    constructor(props) {
        super(props);
      };

    render(){

        return(
           <div className="container">
             <header>
              {!isLoggedIn ? 
              <Typography variant="h4" component="h2" >
                    Seja bem vindo(a)!    
              </Typography> :
              <Typography variant="h4" component="h2">
                Você precisa realizar o Login!
              </Typography> }
             </header>      
               <div>
               <Card className="card1" variant="outlined" allign="true">
                  <CardContent>
                    <Typography className="" color="textSecondary" gutterBottom>
                      Tarefas Cadastradas
                    </Typography>
                    <Typography variant="h5" component="h2">
                    { this.props.registeredTask }
                    </Typography>
                  </CardContent>
                </Card>

                <Card className="card2" variant="outlined">
                  <CardContent>
                    <Typography className="" color="textSecondary" gutterBottom>
                      Tarefas em Andamento
                    </Typography>
                    <Typography variant="h5" component="h2">
                    { this.props.inprogressTask }
                    </Typography>
                    </CardContent>
                </Card>

                <Card className="card3" variant="outlined">
                  <CardContent>
                    <Typography className="" color="textSecondary" gutterBottom>
                      Tarefas Concluídas
                    </Typography>
                    <Typography variant="h5" component="h2">
                    { this.props.completedTask }
                    </Typography>
                  </CardContent>
                </Card>

                <Card className="card4" variant="outlined">
                  <CardContent >
                    <Button variant="contained" onClick={()=>this.props.history.push('/home')}>{'Visualizar Tarefas'}</Button>
                </CardContent>
                </Card>

        
               </div>
             
           </div>
        )    
        
    }
}

export default withTracker(() => {

  Meteor.subscribe('tasks');

  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    registeredTask: Tasks.find({ situation: "Cadastrada" }).count(),
    inprogressTask: Tasks.find({ situation: "Em Andamento" }).count(),
    completedTask: Tasks.find({ situation: "Concluída" }).count(),
    currentUser: Meteor.user(),
  };
})(withRouter(About));
