import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ({ authUser, removeAuthUser }) => ((
  <nav className="topbar topbar-inverse topbar-expand-md topbar-sticky">
    <div className="container">
      <div className="topbar-left">
        <button className="topbar-toggler" type="button">☰</button>
        <Link className="topbar-brand" to="/">
          <img className="logo-default" src={`${process.env.PUBLIC_URL}/assets/img/logo.png`} alt="logo" />
          <img className="logo-inverse" src={`${process.env.PUBLIC_URL}/assets/img/logo-light.png`} alt="logo" />
        </Link>
      </div>
      <div className="topbar-right">
        <ul className="topbar-nav nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          {
            authUser && (
              <li className="nav-item">
                <Link className="nav-link" to="/articles/create">Write new article</Link>
              </li>
            )
          }
          {
            authUser && (
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Hey
                  {authUser && authUser.user.name}
                  !
                  <i className="fa fa-caret-down" />
                </a>
                <div className="nav-submenu">
                  <Link className="nav-link" to="/user/articles">My articles</Link>
                  <Link className="nav-link" to="/" onClick={removeAuthUser}>Logout</Link>
                </div>
              </li>
            )
          }
          {
            !authUser && (
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            )
          }
          {
            !authUser && (
              <li className="nav-item">
                <Link className="nav-link" to="/register">Signup</Link>
              </li>
            )
          }
        </ul>
      </div>
    </div>
  </nav>
));

Navbar.propTypes = {
  authUser: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string,
    }).isRequired,
  }),
};

Navbar.defaultProps = {
  authUser: null,
};

export default Navbar;
