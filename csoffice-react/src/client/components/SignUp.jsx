import React from 'react';

const SignUp = () => (
  <div>
    <form>
      <input type="text" id="firstName" name="firstName" placeholder="First Name" />
      <input type="text" id="lastName" name="lastName" placeholder="Last Name" />
      <input type="email" id="email" name="email" placeholder="Email Address" />
      <input type="password" id="password" name="password" placeholder="Password" />
      <input type="submit" value="Sign Up" />
    </form>
  </div>
);

export default SignUp;
