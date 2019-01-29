import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProtectedRoute from './ProtectedRoute';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import Signup from './components/Auth/Signup';
import Statistics from './components/Statistics';
import './IconLibrary';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const ToastCloseButton = ({ props, closeToast }) => (
  <FontAwesomeIcon icon="times" onClick={closeToast} />
);

class App extends Component {
  render() {
    return (
      <div>
        <ToastContainer
          className='toast-container'
          closeButton={<ToastCloseButton />}
        />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/signup" component={Signup} />
          <ProtectedRoute exact path="/statistics" component={Statistics} />
        </Switch>
      </div>
    );
  }
}

export default App;
