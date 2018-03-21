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
  }

  authenticate(data) {
    console.log('This is the returned info from Google: ', data);
    // fetch('/login/gooAuth', {
    //   method: 'POST',
    //   mode: 'cors',
    //   headers: {
    //     'content-type': 'application/json',
    //   },
    //   credentials: 'same-origin', // include, same-origin, *omit
    //   body: JSON.stringify(data), // must match 'Content-Type' header
    //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // }).then();
    this.setState({ ...this.state, isAuth: true });
  }

  emailLogIn(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const user = { email, password };
    console.log('This is the user info', user);

    fetch('/auth/login/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user), // must match 'Content-Type' header
    })
      .then(JSON.parse(result))
      .then((data) => {
        console.log(data);
      })
      .catch(err => console.log(err));
  }

  logout() {
    this.setState({ ...this.state, isAuth: false });
  }

  render() {
    console.log(this.user);
    const { isAuth } = this.state;
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={() => (isAuth ? <Component /> : <Redirect to="/login" />)} />
    );

    return (
      <div className="wrapper">
        <Header isAuth={isAuth} logout={this.logout} />
        <main>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            <Route path="/sign-up" component={Signup} />
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
