import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Video from './Video';
import Header from './Header';
import Office from './Office';
import Login from './Login';
import Signup from './Signup';

class App extends React.Component {
  constructor(props) {
    super(props);
    // MAKE SURE TO CHANGE BACK TO FALSE!!!!!!!!!!!!!
    this.state = {
      isAuth: true,
      isAdmin: true,
      adminName: 'Admin',
      user: {},
    };
    this.authenticate = this.authenticate.bind(this);
    this.emailLogIn = this.emailLogIn.bind(this);
    this.logout = this.logout.bind(this);
    this.emailLogIn = this.emailLogIn.bind(this);
    this.signup = this.signup.bind(this);
  }

  authenticate(data) {
    console.log('This is the returned info from Google: ', data.profileObj);
    fetch('auth/login/google', {
      method: 'POST',
      // mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ ...this.state, isAuth: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  signup(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const password = form.password.value;
    const user = {
      firstName,
      lastName,
      email,
      password,
    };
    console.log("This is the user", user);
    fetch('/auth/signup', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(user), // must match ‘Content-Type’ header
    })
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        // Grab user state from data object
        console.log('This is the return value from signup', data);
        if (data.firstName && data.email) {
          this.setState({ ...this.state, user: data, isAuth: true });
        }
      })
      .catch(err => console.log(err));
  }

  emailLogIn(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const user = { email, password };
    fetch('/auth/login/email', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(user), // must match ‘Content-Type’ header
    })
      .then((result) => {
        console.log('result: ', result);
        return result.json();
      })
      .then((data) => {
        // Grab user state from data object
        if (data.firstName && data.email) {
          this.setState({ ...this.state, user: data, isAuth: true });
        }
      })
      .catch(err => console.log(err));
  }

  logout() {
    this.setState({ ...this.state, isAuth: false });
  }

  render() {
    const { isAuth } = this.state;
    console.log('This is the render user', this.state.user);
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props => (isAuth ? <Component user={props.user} /> : <Redirect to="/login" />)}
      />
    );

    return (
      <div className="wrapper">
        <Header isAuth={isAuth} logout={this.logout} />
        <main>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            <Route path="/sign-up" render={() => (isAuth ? <Redirect to="/office" /> : <Signup signup={this.signup} />)} />
            <Route
              path="/login"
              render={() =>
                (isAuth ? (
                  <Redirect to="/office" />
                ) : (
                  <Login oAuthSuccess={this.authenticate} submitHandler={this.emailLogIn} />
                ))
              }
            />
            <PrivateRoute path="/office" component={Office} user={this.state.user} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
