import React, { Component } from 'react';
import './Overview.css';
import { AuthConsumer } from '../../contexts/AuthContext';

class Overview extends Component {  
  render() {
    return (
      <AuthConsumer>
        {({ organization }) => {
          return (
            <div className="overview">
              <h1>{organization.name}</h1>
            </div>
          );
        }}
      </AuthConsumer>
    );
  }
}

export default Overview;
