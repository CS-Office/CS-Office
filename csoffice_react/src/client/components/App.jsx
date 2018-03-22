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
      isAuth: false,
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

  authenticate(google) {
    const profile = google.profileObj;

    const user = {
      email: profile.email,
      firstName: profile.givenName,
      lastName: profile.familyName,
    };
    
    // fetch('auth/login/google', {
    //   method: 'POST',
    //   headers: new Headers({
    //     'Content-Type': 'application/json',
    //   }),
    //   body: JSON.stringify(profile),
    // })
    //   .then(res => res.json())
    //   .then((info) => {
    //     console.log('Returning data', info);
    //     this.setState({ ...this.state, user: info, isAuth: true });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    this.setState({ ...this.state, user, isAuth: true });
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
    fetch('/auth/signup', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(user), // must match ‘Content-Type’ header
    })
      .then(result => result.json())
      .then((data) => {
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
      .then(result => result.json())
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
    const { isAuth, user } = this.state;
    console.log(isAuth);
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props => (isAuth ? <Component {...props} /> : <Redirect to="/login" />)}
      />
    );

    return (
      <div className="wrapper">
        <Header isAuth={isAuth} user={user} logout={this.logout} />
        <main>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            <Route
              path="/sign-up"
              render={() => (isAuth ? <Redirect to="/office" /> : <Signup signup={this.signup} />)}
            />
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
            <PrivateRoute path="/office" component={Office} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
