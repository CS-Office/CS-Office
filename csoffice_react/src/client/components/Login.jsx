import React from 'react';
import { Link } from 'react-router-dom';
import Input from './Input';
import OAuth from './OAuth';

const Login = props => (
  <div className="container-boundingbox">
    <div className="row sign-in-row">
      <div className="col-xs-12 col-sm-10 col-md-8 col-lg-7 inner-sign-in-wrapper">
        <div className="sign-in-container well well-csx">
          <div className="sign-in-header">Sign in to your account</div>
          <form className="sign-in-form" onSubmit={props.submitHandler}>
            <Input type="email" />
            <Input type="password" />
            <div>
              <Input
                type="submit"
                className="button btn btn-primary sign-in-button"
                value="Login"
              />
            </div>
          </form>
          <div className="horizontal-line">or</div>
          <div className="oAuth-wrapper">
            <OAuth type="google" clickHandler={props.oAuthSuccess} />
          </div>
        </div>
        <div className="check-user">
          <p>
            Not yet a user? <Link to="/sign-up">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Login;
