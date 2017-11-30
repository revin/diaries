import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.css';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <header className="app-header">
        <h1 className="app-title">diaries</h1>
        <nav>
          <NavLink exact to='/'>Diary</NavLink>
          <NavLink to='/public'>Public Timeline</NavLink>
          { this.props.isLoggedIn() ?
            <NavLink to='/new'>New Entry</NavLink>
          : null }
          { !this.props.isLoggedIn() ?
            <button class='login' onClick={this.props.login}>Login</button>
          :
            <button class='login' onClick={this.props.logout}>Logout</button>
          }
        </nav>
      </header>
    );
  }
}

export default Header;
