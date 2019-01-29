import React, { Component } from 'react';
import './Auth.css';
import logo from '../../assets/img/logo.svg';

class Auth extends Component {
  render() {
    return (
      <div className="auth-page">
        <div className="auth-container">
          <header className="auth-header">
            <img src={logo} alt="Invoicealot" />
            {typeof this.props.title !== 'undefined' &&
              <h1>{this.props.title}</h1>
            }
          </header>
          {this.props.children}
          <footer className="auth-footer">
            <div className="auth-footer-copyright">
              &copy; <a href="https://syndicate.lk" target="_blank" rel="noopener noreferrer">Syndicate</a>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

export default Auth;
