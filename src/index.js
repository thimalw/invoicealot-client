import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';
import 'typeface-open-sans';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { AppProvider } from './contexts/AppContext';

ReactDOM.render((
  <Router>
    <AppProvider>
      <App />
    </AppProvider>
  </Router>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
