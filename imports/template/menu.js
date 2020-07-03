
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import App from '../ui/App.jsx'
import Todo from './todo.jsx'
import About from './about.jsx'


import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";

export default function SimpleMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
        <Router>
          <div className='menu'>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    Open Menu
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
                </ul>
                </nav>
                </Menu>
               
                {/* A <Switch> looks through its children <Route>s and
                    renders the first one that matches the current URL. */}
                <Switch>
                <Route path="/home" component={App}>
                    <App/>
                </Route>
                <Route path="/about" component={About}>
                    <About />
                </Route>
                <Route path="/todo" component={Todo}>
                    <Todo/>
                </Route>
                </Switch>
        </div>
        </Router>
    );
    }





