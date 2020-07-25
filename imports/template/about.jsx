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


 class About extends Component{
    constructor(props) {
        super(props);
      };

    render(){

        return(
           <div className="container">
             <h1>Bem vindo(a)!</h1>
               <div>
               <Card className="card1" variant="outlined" allign="true">
                  <CardContent>
                    <Typography className="" color="textSecondary" gutterBottom>
                      Tarefas Cadastradas
                    </Typography>
                    <Typography variant="h5" component="h2">
                    { this.props.registeredState }
                    </Typography>
                  </CardContent>
                </Card>

                <Card className="card2" variant="outlined">
                  <CardContent>
                    <Typography className="" color="textSecondary" gutterBottom>
                      Tarefas em Andamento
                    </Typography>
                    <Typography variant="h5" component="h2">
                    { this.props.inprogressState }
                    </Typography>
                    </CardContent>
                </Card>

                <Card className="card3" variant="outlined">
                  <CardContent>
                    <Typography className="" color="textSecondary" gutterBottom>
                      Tarefas Concluídas
                    </Typography>
                    <Typography variant="h5" component="h2">
                    { this.props.completeCount }
                    </Typography>
                  </CardContent>
                </Card>

                <Card className="card4" variant="outlined">
                  <CardContent>
                    <Typography className="" color="textSecondary" gutterBottom>
                      Tarefas Incompletas
                    </Typography>
                    <Typography variant="h5" component="h2">
                    { this.props.incompleteCount }
                    </Typography>
                  </CardContent>
                </Card>

                <CardActions className="return">
                    <Button onClick={()=>this.props.history.push('/home')}>{'Lista completa'}</Button>
                </CardActions>
               </div>
             
           </div>
        )    
        
    }
}

export default withTracker(() => {

  Meteor.subscribe('tasks');

  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    completeCount: Tasks.find({ checked: { $ne: false } }).count(),
    registeredState: Tasks.find({ state: "Cadastrada" }).count(),
    inprogressState: Tasks.find({ state: "Em Andamento" }).count(),
    completedState: Tasks.find({ state: "Concluída" }).count(),
    currentUser: Meteor.user(),
  };
})(withRouter(About));
