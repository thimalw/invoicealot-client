import React, { Component } from 'react';
import './Sidebar.css';

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar-container">
        <div className="sidebar">
          <div className="sidebar-logo">
            {/* <img src={logo} alt="Invoicealot" /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
