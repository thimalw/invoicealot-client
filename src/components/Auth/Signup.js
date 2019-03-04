import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import Auth from './Auth';
import AuthAPI from '../../api/auth.api';
import { errorsToJsx } from '../../api/apiUtils';
import AppContext, { AppConsumer } from '../../contexts/AppContext';
import { Redirect, Link } from 'react-router-dom';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formErrors: {},
      signedUp: false
    };
  }

  signupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(1, 'First name is too short.')
      .max(60, 'First name is too long.')
      .required('First name is required.'),
    lastName: Yup.string()
      .min(1, 'Last name is too short.')
      .max(60, 'Last name is too long.')
      .required('Last name is required.'),
    email: Yup.string()
      .email('Email format is invalid.')
      .required('Email is required.'),
    password: Yup.string()
      .min(8, 'Should be at least 8 characters long.')
      .required('Password is required.'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password')], 'Doesn\'t match.')
      .required('Password confirmation is required.')
  });

  onSubmit = async (user, actions) => {
    try {
      await AuthAPI.signup(user);

      try {
        await this.context.login(
          user.email,
          user.password
        );
        this.props.history.push('/');
      } catch (err) {
        this.setState({
          signedUp: false
        });
      }
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
      <AppConsumer>
        {({ isLoggedIn }) => {
          return isLoggedIn ? (
            <Redirect to="/" />
          ) : (
              <Auth
                title="Create A New Account"
              >
                <Formik
                  initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    passwordConfirm: ''
                  }}
                  validationSchema={this.signupSchema}
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
                        <Field type="text" name="firstName" placeholder="First Name" />
                        <ErrorMessage name="firstName" component="span" className="auth-form-error" />
                      </div>
                      <div className="auth-form-group">
                        <Field type="text" name="lastName" placeholder="Last Name" />
                        <ErrorMessage name="lastName" component="span" className="auth-form-error" />
                      </div>
                      <div className="auth-form-group">
                        <Field type="email" name="email" placeholder="Email" />
                        <ErrorMessage name="email" component="span" className="auth-form-error" />
                      </div>
                      <div className="auth-form-group">
                        <Field type="password" name="password" placeholder="Password" />
                        <ErrorMessage name="password" component="span" className="auth-form-error" />
                      </div>
                      <div className="auth-form-group">
                        <Field type="password" name="passwordConfirmation" placeholder="Password Confirmation" />
                        <ErrorMessage name="passwordConfirmation" component="span" className="auth-form-error" />
                      </div>
                      <div className="auth-form-btn btn-row btn-dual">
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                          <FontAwesomeIcon icon="user-plus" />
                          Sign Up
                        </button>
                        <Link to="/login" className="btn btn-secondary">
                          <FontAwesomeIcon icon="sign-in-alt" />
                          Log In
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

Signup.contextType = AppContext;

export default Signup;
