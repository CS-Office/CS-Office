import React, { Component } from 'react';

class SignUp extends Component {
  render() {
    return (
      <div>
        <form>
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" name="firstName" />
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" name="lastName" />
          <label htmlFor="email">Email Address:</label>
          <input type="email" id="email" name="email" />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
          <input type="submit" value="Sign Up" />
        </form>
      </div>
    );
  }
}

export default SignUp;
