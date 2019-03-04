import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { AppConsumer } from '../../contexts/AppContext';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import './Dashboard.css';
import NotFound from './NotFound';
import Initializing from './Initializing';
import Overview from '../Overview';
import Organizations from '../Organizations';
import NewOrganization from '../Organizations/NewOrganization';
import Invoices from '../Invoices';
import Invoice from '../Invoices/Invoice';

class Dashboard extends Component {
  render() {
    return (
      <AppConsumer>
        {({ initialized }) => {
          if (initialized) {
            return (
              <div className="dashboard">
                <Sidebar />
                <Topbar />
                <div className="dashboard-body">
                  <Switch>
                    <Route exact path="/" component={Overview} />
                    <Route exact path="/organizations" component={Organizations} />
                    <Route exact path="/organizations/new" component={NewOrganization} />
                    <Route exact path="/invoices" component={Invoices} />
                    <Route exact path="/invoices/:id" render={props => <Invoice key={props.match.params.id} {...props} />} />
                    <Route component={NotFound} />
                  </Switch>
                </div>
              </div>
            );
          } else {
            return (
              <Initializing />
            );
          }
        }}
      </AppConsumer>
    );
  }
}

export default Dashboard;
