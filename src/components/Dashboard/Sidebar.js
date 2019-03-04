import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Sidebar.css';
import { AppConsumer } from '../../contexts/AppContext';
import logo from '../../assets/img/logo.svg';
import OrganizationSelect from './OrganizationSelect';
import InvoiceApi from '../../api/invoice.api';

class Sidebar extends Component {
  handleNewInvoice = async (organizationId) => {
    try {
      const invoice = {
        type: 'invoice'
      };

      const res = await InvoiceApi.create(invoice, organizationId);

      if (res.data.data.invoice.id) {
        this.props.history.push(`/invoices/${res.data.data.invoice.id}`);
        return res.data.data.invoice.id;
      } else if (res.data.data.errors && res.data.message) {
        throw new Error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  
  render() {
    return (
      <AppConsumer>
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
                {organization.id &&
                  <div className="sidebar-actions">
                    <div className="auth-form-btn btn-row btn-dual">
                      <button
                        onClick={() => {this.handleNewInvoice(organization.id)}}
                        className="btn btn-primary"
                      >
                        <FontAwesomeIcon icon="plus" />
                        Invoice
                      </button>
                      <Link to="/estimates/new" className="btn btn-secondary">
                        <FontAwesomeIcon icon="plus" />
                        Estimate
                      </Link>
                    </div>
                  </div>
                }
                {organization.id &&
                  <div className="sidebar-nav">
                    <NavLink activeClassName="active" exact={true} to="/">Overview</NavLink>
                    <NavLink activeClassName="active" to="/invoices">Invoices</NavLink>
                    <NavLink activeClassName="active" to="/estimates">Estimates</NavLink>
                    <NavLink activeClassName="active" to="/products">Products</NavLink>
                    <NavLink activeClassName="active" to="/customers">Customers</NavLink>
                  </div>
                }
                {organization.id &&
                  <div className="sidebar-nav">
                    <NavLink activeClassName="active" exact={true} to="/organization/settings">Organization Settings</NavLink>
                    <NavLink activeClassName="active" to="/organization/billing">Billing</NavLink>
                  </div>
                }
                <footer className="sidebar-footer">
                  <img className="sidebar-footer-logo" src={logo} alt="Invoicealot" />
                  <div>Powered by Invoicealot</div>
                  <div><a href="/legal">Legal</a></div>
                </footer>
              </div>
            </div>
          );
        }}
      </AppConsumer>
    );
  }
}

// Sidebar.contextType = AppContext;

export default withRouter(Sidebar);
