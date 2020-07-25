import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import SignIn, { isLoggedIn } from './AccountsUIWrapperLogin';

/*
Template.loginButtons.rendered = function()
{ 
    Accounts._loginButtonsSession.set('dropdownVisible', true);

};
*/

export default class AccountsUIWrapper extends Component {
  componentDidMount() {
    // Use Meteor Blaze to render login buttons
    this.view = Blaze.render(Template.loginButtons,
        ReactDOM.findDOMNode(this.refs.container));
       /* this.view = ReactDOM.render(<SignIn />,
          ReactDOM.findDOMNode(this.refs.container));*/
  }
  componentWillUnmount() {
    // Clean up Blaze view
     Blaze.remove(this.view);
   // ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this.refs.container));
  }
  render() {
    // Just render a placeholder container that will be filled in
    return <span ref="container" />;
  }
}
