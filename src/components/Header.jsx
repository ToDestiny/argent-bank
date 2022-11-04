import React from 'react';
import '../App.css';
import argentBankLogo from '../assets/img/argentBankLogo.png';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      {' '}
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src={argentBankLogo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle" />
            Login
          </Link>
          <Link className="main-nav-item" to="/sign-up">
            <i className="fa fa-user-circle" />
            Sign Up
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Header;
