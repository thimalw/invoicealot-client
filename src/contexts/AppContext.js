import React, { Component } from 'react';
import { useToken } from '../api/api';
import AuthAPI from '../api/auth.api';
import OrganizationAPI from '../api/organization.api';
import { toast } from 'react-toastify';

const AppContext = React.createContext();
const AppConsumer = AppContext.Consumer;

/**
 * App state provider
 */
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

  /**
   * Load all user and organization data
   * 
   * @function
   * @async
   */
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

  /**
   * Change the selected organization
   * 
   * @function
   * @async
   * @param {int} organizationId - ID of the organization to select
   */
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

  /**
   * Load organization list from server
   *
   * @function
   * @async
   */
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
        toast.error('Something went wrong. Please try again.');
        throw err;
      }
    }
  };

  /**
   * Load selected organization data from server
   *
   * @function
   * @async
   */
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
        toast.error('Something went wrong. Please try again.');
        throw err;
      }
    }
  };

  /**
   * Authenticate with the server and store the access token
   * locally
   *
   * @function
   * @async
   * @param {string} email - Email address of the user
   * @param {string} password - Password of the user
   */
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

  /**
   * Remove all authentication data stored locally
   *
   * @function
   */
  logout = () => {
    localStorage.removeItem('_apitoken');
    localStorage.removeItem('organizationId');

    this.setState({
      isLoggedIn: false
    });
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
