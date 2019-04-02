import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import Auth from './Auth';
import { errorsToJsx } from '../../api/apiUtils';
import AppContext, { AppConsumer } from '../../contexts/AppContext';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formErrors: {}
    };
  }

  loginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email format is invalid')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
  });

  /**
   * Authenticate with the server.
   * 
   * If success and has organizations, display default screen. If the user
   * doesn't have any organizations, display create organization screen.
   */
  handleLogin = async (user, actions) => {
    try {
      await this.context.login(
        user.email,
        user.password
      );

      if (this.context.organizations.length) {
        return this.props.history.push('/');
      } else {
        return this.props.history.push('/organizations/new');
      }
    } catch (err) {
      if (err.response) {
        if (err.response.data && err.response.data.data) {
          const jsxErrors = errorsToJsx(err.response.data.data.errors);
          this.setState({
            formErrors: jsxErrors
          });
          toast.error(err.response.data.message);
          actions.setErrors(jsxErrors);
        }
      } else {
        toast.error('Unable to connect. Please try again later.');
      }
    }

    actions.setSubmitting(false);
  }

  render() {
    return (
      <AppConsumer>
        {({ isLoggedIn }) => {
          return isLoggedIn ? (
            <Redirect to="/" />
          ) : (
              <Auth>
                <Formik
                  initialValues={{
                    email: '',
                    password: ''
                  }}
                  validationSchema={this.loginSchema}
                  onSubmit={this.handleLogin}
                >
                  {(errors, touched, isSubmitting) => (
                    <Form>
                      {typeof this.state.formErrors.allFields !== 'undefined' &&
                        <div className="alert alert-danger">
                          {this.state.formErrors.allFields}
                        </div>
                      }
                      <div className="auth-form-group">
                        <Field type="email" name="email" placeholder="Email" />
                        <ErrorMessage name="email" component="span" className="auth-form-error" />
                      </div>
                      <div className="auth-form-group">
                        <Field type="password" name="password" placeholder="Password" />
                        <ErrorMessage name="password" component="span" className="auth-form-error" />
                      </div>
                      <div className="auth-form-btn btn-row btn-dual">
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                          <FontAwesomeIcon icon="sign-in-alt" />
                          Log In
                        </button>
                        <Link to="/signup" className="btn btn-secondary">
                          <FontAwesomeIcon icon="user-plus" />
                          Sign Up
                        </Link>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Auth>
          );
        }}
      </AppConsumer>
    );
  }
}

Login.contextType = AppContext;

export default Login;
