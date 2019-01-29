import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import './Dashboard.css';

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <Sidebar />
        <Topbar />
        <div className="dashboard-body">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Dashboard;
