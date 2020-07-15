import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import App from '../ui/App.jsx'
import Todo from './todo.jsx'
import About from './about.jsx'
import SignIn from '../ui/AccountsUIWrapperLogin.js'
import AccountsUIWrapper from '../ui/AccountsUIWrapper.js';
import EditTask from '../ui/TaskEdit.js'

import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import TaskEdit from '../ui/TaskEdit.js';


export default function SimpleMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
        <Router history={history}>
          <div className='menu'>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    Menu
                </Button>
                <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                <nav>
                <ul>
                    <li>
                    <NavLink to="/home" activeStyle={{fontWeight: "bold"}}>Home</NavLink>
                    </li>
                    <li>
                    <NavLink to="/about" activeStyle={{fontWeight: "bold"}}>About</NavLink>
                    </li>
                    <li>
                    <NavLink to="/todo" activeStyle={{fontWeight: "bold"}}>Todo</NavLink>
                    </li>
                    <li>
                    <NavLink to="/login" activeStyle={{fontWeight: "bold"}}>Login</NavLink>
                    </li>
                    <li>
                    <NavLink to="/login2" activeStyle={{fontWeight: "bold"}}>Login2</NavLink>
                    </li>
                   


                </ul>
                </nav>
                </Menu>
               
                {/* A <Switch> looks through its children <Route>s and
                    renders the first one that matches the current URL. */}
                
                <Route path="/home" component={App}>
                    <App/>
                </Route>
                <Route path="/about" component={About}>
                    <About />
                </Route>
                <Route path="/todo" component={Todo}>
                    <Todo/>
                </Route>
                <Route path="/login" component={AccountsUIWrapper}>
                   <AccountsUIWrapper/>
                </Route>
                <Route path="/login2" component={SignIn}>
                   <SignIn/>
                </Route>
                
                
        </div>
        </Router>
    );
}
