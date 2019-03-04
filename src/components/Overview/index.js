import React, { Component } from 'react';
import './Overview.css';
import { AppConsumer } from '../../contexts/AppContext';

class Overview extends Component {  
  render() {
    return (
      <AppConsumer>
        {({ organization }) => {
          return (
            <div className="overview">
              <h1>{organization.name}</h1>
            </div>
          );
        }}
      </AppConsumer>
    );
  }
}

export default Overview;
