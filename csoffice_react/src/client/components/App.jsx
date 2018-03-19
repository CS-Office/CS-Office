import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import NavBar from './NavBar.jsx';
import Office from './Office.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';

const history = createHistory();

class App extends React.Component {
  constructor(props) {
    super(props);
    // MAKE SURE TO CHANGE BACK TO FALSE!!!!!!!!!!!!!
    this.state = { isAuthenticated: false };
    this.authenticate = this.authenticate.bind(this);
  }

  authenticate() {
    this.setState({ ...this.state, isAuthenticated: true });
  }

  render() {
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={() => (this.state.isAuthenticated ? <Component /> : <Redirect to="/login" />)}
      />
    );

    return (
      <div className="wrapper">
        <NavBar />
        <main>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            <Route path="/sign-up" component={Signup} />
            <Route
              path="/login"
              render={() =>
                (this.state.isAuthenticated ? (
                  <Redirect to="/office" />
                ) : (
                  <Login oAuthSuccess={this.authenticate} />
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
