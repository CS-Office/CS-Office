import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, NavItem, MenuItem, Button } from 'react-bootstrap';

const Header = (props) => {
  const { user } = props;
  const fullName = `${user.firstName} ${user.lastName}`;
  const { isAuth } = props;
  const UserBtn = () => {
    if (isAuth) {
      return (
        <Nav pullRight>
          <NavDropdown eventKey={3} title={fullName} id="basic-nav-dropdown">
            <MenuItem eventKey={3.1} className="csx-signout" onClick={props.logout}>
              Sign out
            </MenuItem>
          </NavDropdown>
        </Nav>
      );
    }
  };

  return (
    <Navbar id="top-nav">
      <Navbar.Header>
        <Navbar.Brand>
          <NavLink to="/">
            <img id="cs-logo" src="./../public/images/codesmith-logo-md.png" alt="Codesmith Logo" />
          </NavLink>
        </Navbar.Brand>
      </Navbar.Header>
      {UserBtn()}
    </Navbar>
  );
};

Header.propTypes = {
  isAuth: PropTypes.bool.required,
  logout: PropTypes.func.required,
};

export default Header;
