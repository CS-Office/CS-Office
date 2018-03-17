import React from 'react';
import GoogleLogin from 'react-google-login';

const OAuth = (props) => {
  switch (props.type) {
    case 'google':
      return (
        <GoogleLogin
          clientId="881814036265-o68utsk4u8c3drq95k0p16qe72ups74j.apps.googleusercontent.com"
          className="oAuth-button"
          onSuccess={props.clickHandler}
          onFailure={props.clickHandler}
        >
          <div className="oauth-google-inner">
            <img id="google-logo" src="./../public/images/GGL_logo_googleg_18.png" alt="" />
            <div className="oAuth-text">Sign in with Google</div>
          </div>
        </GoogleLogin>
      );
    default:
  }
};

export default OAuth;
