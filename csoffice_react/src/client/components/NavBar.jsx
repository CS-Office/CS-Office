import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => (
  <nav className="navbar navbar-default">
    <div className="container">
      <NavLink to="/" className="navbar-brand">
        <img src="./../public/images/codesmith-logo-md.png" alt="Codesmith Logo" />
      </NavLink>
    </div>
  </nav>
);

export default NavBar;
