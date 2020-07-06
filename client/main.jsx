import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import SignIn from '../imports/ui/AccountsUIWrapperLogin'

import '../imports/startup/accounts-config.js';
import App from '../imports/ui/App.jsx';
import { Menu } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import Index from '../imports/template/menu.js'
import SimpleMenu from '../imports/template/menu.js';

import InteractiveList from '../imports/ui/list'

Meteor.startup(() => {
  render(
  <BrowserRouter>
    <SimpleMenu/>
  </BrowserRouter>
  , document.getElementById('render-target'));
});