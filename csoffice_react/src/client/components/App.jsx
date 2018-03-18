import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Header from './Header.jsx';
import Office from './Office.jsx';
import Login from './Login.jsx';
import Signup from './SignUp.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    // MAKE SURE TO CHANGE BACK TO FALSE!!!!!!!!!!!!!
    this.state = { isAuthenticated: false };
    this.authenticate = this.authenticate.bind(this);
  }

  authenticate() {
    console.log('hello');
    this.setState({ ...this.state, isAuthenticated: true });
  }

  render() {
    console.log(this.state);
    const PrivateRoute = ({ component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          (this.state.isAuthenticated === true ? <component {...props} /> : <Redirect to="/login" />)
        }
      />
    );

    return (
      <div className="wrapper">
        <Header />
        <main>
          {/* <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            <Route path="/login" render={() => <Login oAuthSuccess={this.authorize} />} />
            <Route path="/sign-up" component={Signup} />
            <PrivateRoute path="/office" component={Office} />
          </Switch> */}
          <Switch>
            <Route
              exact
              path="/"
              render={() =>
                (!this.state.isAuthenticated ? (
                  <Login oAuthSuccess={this.authenticate} />
                ) : (
                  <Redirect to="/office" />
                ))
              }
            />
            <Route path="/sign-up" component={Signup} />
            <Route path="/login" render={() => <Login oAuthSuccess={this.authenicate} />} />
            <Route path="/office" component={Office} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
