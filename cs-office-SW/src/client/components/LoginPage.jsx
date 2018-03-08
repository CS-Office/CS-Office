import React, { Component } from 'react';

class LoginPage extends React.Component {
  render () {
    return (
      <div>
        <form>
          <label htmlFor="email">Email Address:</label>
          <input type="email" id="email" name="email" />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

export default LoginPage;