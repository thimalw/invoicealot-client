import React, { Component } from 'react';
import AuthContext from '../../contexts/AuthContext';

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

Logout.contextType = AuthContext;

export default Logout;
