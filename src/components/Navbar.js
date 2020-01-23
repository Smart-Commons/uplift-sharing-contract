import React, { Component } from 'react';
import logo from '../logo.png';

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-light flex-md-nowrap p-3 shadow">
        <img src={logo} alt="Logo" />
        <a
          className="navbar-brand"
          href="https://darkmatterlabs.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          SMART COMMONS
        </a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-white"><span id="account">{this.props.account}</span></small>
          </li>
        </ul>
      </nav>
    );
  }
}
export default Navbar;