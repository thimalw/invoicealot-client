import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import ProtectedRoute from '../../ProtectedRoute';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import './Dashboard.css';
import NotFound from './NotFound';
import Overview from '../Overview';

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <Sidebar />
        <Topbar />
        <div className="dashboard-body">
          <Switch>
            <ProtectedRoute exact path="/" component={Overview} />
            <ProtectedRoute component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Dashboard;
