// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import logo from '../../assets/images/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  return (
    <header>
      <nav class="navbar navbar-expand-lg bg-body-tertiary p-3">
        <div class="container-fluid">
          <Link class="navbar-brand" to="/">
            <img src={logo} alt="Logo" width="50" height="50" class="d-inline-block align-text-top"/>
            SipSip
          </Link>
        </div>
        <div>
          <Button class="btn" variant="outline-secondary" href="/login">login</Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;


