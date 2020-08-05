import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import App from '../ui/App.jsx'
import Todo from './todo.jsx'
import About from './about.jsx'
import SignIn, { isLoggedIn } from '../ui/AccountsUIWrapperLogin.js'
import AccountsUIWrapper from '../ui/AccountsUIWrapper.js';
import EditTask from '../ui/TaskEdit.js'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import UserInfo from '../ui/UserInfo.js'
import { createBrowserHistory } from "history";
import Welcome from '../ui/welcome.js'
import ResponsiveDrawer from '../ui/drawer.js'
import { makeStyles } from "@material-ui/core/styles"
import {
  Drawer, List, ListItem,
  ListItemIcon, ListItemText,
  Container, Typography,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from '@material-ui/icons/Info';

export const history = createBrowserHistory();
import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import Login from '../ui/AccountsUIWrapperLogin.js';
import userLogs from '../ui/userLogs.js'
import Register from '../ui/register.js';
import Logout from '../ui/AccountsUIWrapperLogout.js';


const useStyles = makeStyles((theme) => ({
  drawerPaper: { width: 'inherit' },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary
  }
}))

export default function SimpleMenu() {
  const classes = useStyles();
  return (
    <Router>
      <div >
        <Drawer
          style={{ width: '220px' }}
          variant="persistent"
          anchor="left"
          open={true}
    
        >
          <List>
          <Link to="/user" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary={"User Pofile"} />
              </ListItem>
            </Link>
          <Link to="/home" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItem>
          </Link>
          <Link to="/about" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary={"About"} />
              </ListItem>
            </Link>
            <Link to="/userlog" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                 
                </ListItemIcon>
                <ListItemText primary={"Login"} />
              </ListItem>
            </Link>
          </List>
        </Drawer>
                <Route path="/home" component={App}/>
                <Route path="/about" component={About}/>
                <Route path="/todo" component={Todo}/>
                <Route path="/userlog" component={userLogs}/>
                <Route path="/login" component={Login}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/register" component={Register}/>
                <Route path={"/edittask/:task"} component={EditTask}/>
                <Route path={"/user"} component={UserInfo}/>
                <Route exact path={"/"} component={Welcome}/>
      </div>
    </Router>
  );
 }            
               