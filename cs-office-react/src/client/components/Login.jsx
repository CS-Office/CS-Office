import React, { Component } from "react";
import GoogleLogin from "react-google-login";

const Login = function(props) {
  const responseGoogle = response => {
    console.log("This is the googleID", response.googleId);
    console.log("This is the tokenID", response.tokenId);
    props.clickHandler(response);
  };
  return <div>
      <form class="login-form">
        <GoogleLogin className="oAuth-Button" clientId="881814036265-o68utsk4u8c3drq95k0p16qe72ups74j.apps.googleusercontent.com" buttonText="" onSuccess={responseGoogle} onFailure={responseGoogle} />
        <input type="email" id="email" className="text-input" name="email" placeholder="Email address" />
        <input type="password" id="password" name="password" placeholder="Password" />
        <input type="submit" value="Login" />
      </form>
    </div>;
};

export default Login;
