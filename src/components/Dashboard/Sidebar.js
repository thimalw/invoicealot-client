import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Sidebar.css';
import AuthContext, { AuthConsumer } from '../../contexts/AuthContext';
import logo from '../../assets/img/logo.svg';
import OrganizationSelect from './OrganizationSelect';

class Sidebar extends Component {  
  render() {
    return (
      <AuthConsumer>
        {({ organization }) => {
          return (
            <div className="sidebar-container">
              <div className="sidebar">
                {organization.logo &&
                  <div className="sidebar-company-logo">
                    <img src={organization.logo} alt="Invoicealot" />
                  </div>
                }
                <div className="sidebar-company-select">
                  <OrganizationSelect />
                </div>
                <div className="sidebar-actions">
                  <div className="auth-form-btn btn-row btn-dual">
                    <Link to="/invoices/new" className="btn btn-primary">
                      <FontAwesomeIcon icon="plus" />
                      Invoice
                    </Link>
                    <Link to="/estimates/new" className="btn btn-secondary">
                      <FontAwesomeIcon icon="plus" />
                      Estimate
                    </Link>
                  </div>
                </div>
                <div className="sidebar-nav">
                  <NavLink activeClassName="active" exact={true} to="/">Overview</NavLink>
                  <NavLink activeClassName="active" to="/invoices">Invoices</NavLink>
                  <NavLink activeClassName="active" to="/estimates">Estimates</NavLink>
                  <NavLink activeClassName="active" to="/products">Products</NavLink>
                  <NavLink activeClassName="active" to="/customers">Customers</NavLink>
                </div>
                <div className="sidebar-nav">
                  <NavLink activeClassName="active" exact={true} to="/organization/settings">Organization Settings</NavLink>
                  <NavLink activeClassName="active" to="/organization/billing">Billing</NavLink>
                </div>
                <footer className="sidebar-footer">
                  <img className="sidebar-footer-logo" src={logo} alt="Invoicealot" />
                  <div>Powered by Invoicealot</div>
                  <div><a href="/legal">Legal</a></div>
                </footer>
              </div>
            </div>
          );
        }}
      </AuthConsumer>
    );
  }
}

Sidebar.contextType = AuthContext;

export default Sidebar;
