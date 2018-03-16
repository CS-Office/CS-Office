import React from 'react';
import GoogleLogin from 'react-google-login';
import PropTypes from 'prop-types'; // for validating PropTypes

const Login = (props) => {
  const responseGoogle = (response) => {
    props.clickHandler(response);
  };

  return (
    <div>
      <form className="login-form">
        <div className="oAuth-wrapper">
          <GoogleLogin
            className="oAuth-Button"
            clientId="881814036265-o68utsk4u8c3drq95k0p16qe72ups74j.apps.googleusercontent.com"
            buttonText=""
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          />
        </div>
        <input
          type="email"
          id="email"
          className="text-input"
          name="email"
          placeholder="Email address"
        />
        <input type="password" id="password" name="password" placeholder="Password" />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

Login.propTypes = {
  clickHandler: PropTypes.func,
};

export default Login;
