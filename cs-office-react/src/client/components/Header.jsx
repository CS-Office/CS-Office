import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';

class Header extends Component {
  // renderContent() {
  //   switch (this.props.auth) {
  //     case null:
  //       return;
  //     //if there is no id
  //     case false:
  //       return (
  // <li>
  //   <a href="/auth/google">Login with Google</a>
  // </li>
  //       );
  //     //there is an id
  //     default:
  //       return (
  //         <li>
  //           <a href="/api/logout">Logout</a>
  //         </li>
  //       );
  //   }
  // }
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to={this.props.auth ? '/office' : '/'} className="left brand-logo">
            Codesmith Office
          </Link>
          <ul id="nav-mobile" className="right">
            {/* {this.renderContent()} */}
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
