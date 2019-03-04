import React, { Component } from 'react';
import { useToken } from '../api/api';
import AuthAPI from '../api/auth.api';
import OrganizationAPI from '../api/organization.api';
import InvoiceApi from '../api/invoice.api';
import { toast } from 'react-toastify';

const AppContext = React.createContext();
const AppConsumer = AppContext.Consumer;

class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
      isLoggedIn: localStorage.hasOwnProperty('_apitoken'),
      organizations: [],
      organization: {}
    };
  }

  componentDidMount() {
    this.refreshState();
  }

  refreshState = async () => {
    this.setState({
      initialized: false
    }, async () => {

      if (this.state.isLoggedIn) {
        await this.updateOrganizations();
        await this.updateOrganization();
      }

      this.setState({
        initialized: true
      });
    });
  };

  selectOrganization = async (organizationId) => {
    this.setState({
      initialized: false
    }, async () => {
      localStorage.setItem('organizationId', organizationId);
      await this.updateOrganization();

      this.setState({
        initialized: true
      });
    });
  };

  updateOrganizations = async () => {
    try {
      const res = await OrganizationAPI.list();

      if (res.data.data.organizations.length) {
        const organizations = [];
        for (var organization of res.data.data.organizations) {
          organizations.push({
            label: organization.name,
            value: organization.id,
            image: {
              avatar: true,
              src: organization.logo ? organization.logo : 'https://react.semantic-ui.com/logo.png'
            }
          });
        }

        this.setState({
          organizations
        });
      }

    } catch (err) {
      if (err.response && err.response.data.message) {
        toast.error(err.response.data.message);
      } else if (err.response && err.response.statusText) {
        toast.error(err.response.statusText);
      } else {
        throw err;
      }
    }
  };

  updateOrganization = async () => {
    let organizationId = null;
    if (localStorage.hasOwnProperty('organizationId')) {
      organizationId = localStorage.getItem('organizationId');
    } else if (this.state.organizations.length) {
      organizationId = this.state.organizations[0].value;
    }

    if (organizationId) {
      try {
        const res = await OrganizationAPI.get(organizationId);

        if (res.data.data.organization) {
          this.setState({
            organization: res.data.data.organization
          });
        }
      } catch (err) {
        throw err;
      }
    }
  };

  login = async (email, password) => {
    try {
      const res = await AuthAPI.login(email, password);
      const apitoken = res.data.data.token;
      await localStorage.setItem('_apitoken', apitoken);
      useToken();

      if (res.data.data.organizations.length) {
        if (!localStorage.hasOwnProperty('organizationId') || !this.selectOrganization(localStorage.getItem('organizationId'))) {
          this.selectOrganization(res.data.data.organizations[0].id);
        }
      }

      this.setState({
        isLoggedIn: true,
        organizations: res.data.data.organizations
      }, () => {
        this.refreshState();
      });

      return res;
    } catch (err) {
      this.logout();
      throw err;
    }
  };

  logout = () => {
    localStorage.removeItem('_apitoken');
    localStorage.removeItem('organizationId');

    this.setState({
      isLoggedIn: false
    });
  };

  getInvoices = async () => {
    try {
      const res = await InvoiceApi.list(this.state.organization.id);

      if (res.data.data.invoices) {
        return res.data.data.invoices;
      }

      return [];
    } catch (err) {
      console.log(err);
      throw err; // TODO: handle error
    }
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          initialized: this.state.initialized,
          isLoggedIn: this.state.isLoggedIn,
          login: this.login,
          logout: this.logout,
          selectOrganization: this.selectOrganization,
          organization: this.state.organization,
          organizations: this.state.organizations,
          getInvoices: this.getInvoices
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppContext;
export {
  AppProvider,
  AppConsumer
};
