import React, { Component } from 'react';

const Login = function(props) {
  return (
    <div>
      <form>
        <label htmlFor="email">Email Address:</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />
        <input type="submit" value="Login" />
        <br />
        <li>
          <a href="/auth/google">
            <img id="google_button" src="../public/images/google_button.png" />
          </a>
        </li>
      </form>
    </div>
  );
};

export default Login;
