import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import Auth from './Auth';
import { errorsToJsx } from '../../api/apiUtils';
import AuthContext, { AuthConsumer } from '../../contexts/AuthContext';

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

  onSubmit = async (user, actions) => {
    try {
      await this.context.login(
        user.email,
        user.password
      );

      return this.props.history.push('/');
    } catch (err) {
      if (typeof (err.response) !== 'undefined') {
        const jsxErrors = errorsToJsx(err.response.data.data.errors);
        this.setState({
          formErrors: jsxErrors
        });
        toast.error(err.response.data.message);
        actions.setErrors(jsxErrors);
      } else {
        toast.error('Unable to connect. Please try again later.');
      }
    }

    actions.setSubmitting(false);
  }

  render() {
    return (
      <AuthConsumer>
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
                  onSubmit={this.onSubmit}
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
      </AuthConsumer>
    );
  }
}

Login.contextType = AuthContext;

export default Login;
