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
    this.state = { isAuth: false };
    this.authorize = this.authorize.bind(this);
  }

  authorize() {
    this.setState({ isAuth: true });
  }

  render() {
    return (
      <div className="wrapper">
        <Header />
        <main>
          <Switch>
            <Route
              exact
              path="/"
              render={() =>
                (!this.state.isAuth ? <Login oAuthSuccess={this.authorize} /> : <Redirect to="/office" />)
              }
            />
            <Route path="/sign-up" component={Signup} />
            <Route path="/login" render={() => <Login oAuthSuccess={this.authorize} />} />
            <Route path="/office" component={Office} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
