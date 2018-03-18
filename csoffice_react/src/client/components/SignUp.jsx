import React from 'react';
import { Link } from 'react-router-dom';
import Input from './Input.jsx';

const Signup = () => (
  <div className="container-boundingbox">
    <div className="row sign-in-row">
      <div className="col-xs-12 col-sm-10 col-md-8 col-lg-7 inner-sign-in-wrapper">
        <div className="sign-in-container well well-csx">
          <div className="sign-in-header">Create your account</div>
          <form className="sign-in-form">
            <Input type="email" />
            <Input type="text" className="email-sign-in" placeHolder="First Name" />
            <Input type="text" className="email-sign-in" placeHolder="Last Name" />
            <Input type="password" name="password" className="email-sign-in" />
            <Input type="password" name="confirm-password" placeHolder="Confirm Password" />
            <div>
              <Input
                type="submit"
                className="button btn btn-primary sign-in-button"
                value="Sign Up"
              />
            </div>
          </form>
        </div>
        <div className="check-user">
          <p>
            Already a user? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Signup;
