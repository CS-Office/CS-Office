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
    this.logout = this.logout.bind(this);
  }

  authenticate() {
    this.setState({ ...this.state, isAuth: true });
  }

  logout() {
    this.setState({ ...this.state, isAuth: false });
  }

  render() {
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
                (isAuth ? <Redirect to="/office" /> : <Login oAuthSuccess={this.authenticate} />)
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
