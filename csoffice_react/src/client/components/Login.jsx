import React from 'react';
import GoogleLogin from 'react-google-login';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types'; // for validating PropTypes

const Login = (props) => {
  const responseGoogle = (response) => {
    props.clickHandler(response);
  };

  return (
    <div className="container-boundingbox">
      <div className="row sign-in-row">
        <div className="col-xs-12 col-sm-10 col-md-8 col-lg-7 inner-sign-in-wrapper">
          <div className="sign-in-container well well-csx">
            <div className="sign-in-header">Sign in to your account</div>
            <form className="sign-in-form">
              <input
                type="email"
                id="email"
                className="email-sign-in"
                name="email"
                required="true"
                placeholder="EMAIL ADDRESS"
              />
              <input
                type="password"
                id="password"
                className="password-sign-in"
                name="password"
                required="true"
                placeholder="PASSWORD"
              />
              <div>
                <input
                  type="submit"
                  className="button btn btn-primary sign-in-button"
                  value="Login"
                />
              </div>
            </form>
            <div className="horizontal-line">or</div>
            <div className="oAuth-wrapper">
              <GoogleLogin
                clientId="881814036265-o68utsk4u8c3drq95k0p16qe72ups74j.apps.googleusercontent.com"
                className="oAuth-button"
                onSuccess={responseGoogle}
                // onFailure={responseGoogle}
              >
                <div className="oauth-google-inner">
                  <img id="google-logo" src="./../public/images/GGL_logo_googleg_18.png" alt="" />
                  <div className="oAuth-text">Sign in with Google</div>
                </div>
              </GoogleLogin>
            </div>
          </div>
          <div className="check-user">
            <p>
              <Link to="/sign-up">Create account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
