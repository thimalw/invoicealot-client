import React, { Component } from 'react';
import AppContext from '../../contexts/AppContext';

class Logout extends Component {
  componentDidMount = () => {
    this.context.logout();
    this.props.history.push('/login');
  }

  render() {
    return (
      <div>Logging out...</div>
    );
  }
}

Logout.contextType = AppContext;

export default Logout;
