import React, { Component } from 'react';
import AuthAPI from '../api/auth.api';
import OrganizationAPI from '../api/organization.api';

const AuthContext = React.createContext();
const AuthConsumer = AuthContext.Consumer;

class AuthProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: localStorage.hasOwnProperty('_apitoken'),
      showOrgCreateModal: false,
      organizations: [],
      organization: {}
    };
  }

  componentDidMount() {
    this.refreshState();
    this.setState({
      showOrgCreateModal: this.state.organizations.length ? false : true
    });
  }

  refreshState = async () => {
    await this.updateOrganizations();
    await this.updateOrganization();
  };

  selectOrganization = async (organizationId) => {
    localStorage.setItem('organizationId', organizationId);
    await this.updateOrganization();
  };

  updateOrganizations = async () => {
    try {
      const res = await OrganizationAPI.list();

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

    } catch (err) {
      throw err;
    }
  };

  updateOrganization = async () => {
    const organizationId = localStorage.hasOwnProperty('organizationId') ? localStorage.getItem('organizationId') : this.state.organizations[0].value;

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
  };

  login = async (email, password) => {
    try {
      const res = await AuthAPI.login(email, password);
      const apitoken = res.data.data.token;
      localStorage.setItem('_apitoken', apitoken);

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

    this.setState({
      isLoggedIn: false
    });
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          isLoggedIn: this.state.isLoggedIn,
          login: this.login,
          logout: this.logout,
          selectOrganization: this.selectOrganization,
          organization: this.state.organization,
          organizations: this.state.organizations
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthContext;
export {
  AuthProvider,
  AuthConsumer
};
