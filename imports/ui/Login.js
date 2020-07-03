import React, { Component } from 'react';
import ReactDOM from 'react-dom';





export const isLoggedOut = () => {
  return !Meteor.userId();
};

export default class AccountsUIWrapperLogin extends Component {

  componentDidMount() {
    // Use Meteor Blaze to render login buttons
    //
    this.view = ReactDOM.render(<Login />,
      ReactDOM.findDOMNode(this.refs.container));

  /*this.view = Blaze.render(Template.loginButtons,
    ReactDOM.findDOMNode(this.refs.container));*/

  }
  componentWillUnmount() {
    // Clean up Blaze view
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this.refs.container));
    //Blaze.remove(this.view);
  }

  render() {
    // Just render a placeholder container that will be filled in
    return (
      <span>
        <div ref="container">
        </div>
      </span>
    );
  }
}