import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import ProtectedRoute from '../../ProtectedRoute';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import './Dashboard.css';
import NotFound from './NotFound';
import Overview from '../Overview';
import Organizations from '../Organizations';
import NewOrganization from '../Organizations/NewOrganization';

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <Sidebar />
        <Topbar />
        <div className="dashboard-body">
          <Switch>
            <ProtectedRoute exact path="/" component={Overview} />
            <ProtectedRoute exact path="/organizations" component={Organizations} />
            <ProtectedRoute exact path="/organizations/new" component={NewOrganization} />
            <ProtectedRoute component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Dashboard;
