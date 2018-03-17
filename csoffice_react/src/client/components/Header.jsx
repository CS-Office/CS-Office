import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <nav className="navbar navbar-default">
    <div className="container">
      <Link to="/office" className="navbar-brand">
        <img src="./../public/images/codesmith-logo-md.png" alt="Codesmith Logo" />
      </Link>
    </div>
  </nav>
);

export default Header;
