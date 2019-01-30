import React, { Component } from 'react';
import AuthAPI from '../api/auth.api';

const AuthContext = React.createContext();
const AuthConsumer = AuthContext.Consumer;

class AuthProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: localStorage.hasOwnProperty('_apitoken'),
      organizations: [],
      organization: {}
    };
  }

  // componentDidMount() {
  //   this.setState({
  //     isLoggedIn: localStorage.hasOwnProperty('_apitoken')
  //   });
  // }

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

  selectOrganization = async (organizationId) => {};

  render() {
    return (
      <AuthContext.Provider
        value={{
          isLoggedIn: this.state.isLoggedIn,
          login: this.login,
          logout: this.logout
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
