import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import App from '../ui/App.jsx'
import Todo from './todo.jsx'
import About from './about.jsx'
import SignIn from '../ui/AccountsUIWrapperLogin.js'
import AccountsUIWrapper from '../ui/AccountsUIWrapper.js';
import EditTask from '../ui/TaskEdit.js'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import UserInfo from '../ui/UserInfo.js'
import { createBrowserHistory } from "history";
import Welcome from '../ui/welcome.js'


export const history = createBrowserHistory();
import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import AccountsUIWrapperLogin from '../ui/AccountsUIWrapperLogin.js';



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
                
                <Button><NavLink to="/user" activeStyle={{fontWeight: "bold"}}><MenuItem><AccountCircleIcon/></MenuItem></NavLink></Button>

                <Button><NavLink to="/home" activeStyle={{fontWeight: "bold"}} ><MenuItem>Home</MenuItem></NavLink></Button>
              
                <Button><NavLink to="/about" activeStyle={{fontWeight: "bold"}}><MenuItem>About</MenuItem></NavLink></Button>
              
                <Button><NavLink to="/todo" activeStyle={{fontWeight: "bold"}}><MenuItem>Todo</MenuItem></NavLink></Button>
              
                <Button><NavLink to="/login" activeStyle={{fontWeight: "bold"}}><MenuItem>Login</MenuItem></NavLink></Button>
               
               
      
                   


                </ul>
                </nav>
                </Menu>
               
                {/* A <Switch> looks through its children <Route>s and
                    renders the first one that matches the current URL. */}
                
                <Route path="/home" component={App}/>
                <Route path="/about" component={About}/>
                <Route path="/todo" component={Todo}/>
                <Route path="/login" component={AccountsUIWrapperLogin}/>
                <Route path={"/edittask/:task"} component={EditTask}/>
                <Route path={"/user"} component={UserInfo}/>
                <Route exact path={"/"} component={Welcome}/>
                
                
        </div>
        </Router>
    );
}
