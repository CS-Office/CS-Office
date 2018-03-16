import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Header from './Header.jsx';
import Office from './Office.jsx';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isAuth: false };

    this.authorize = this.authorize.bind(this);
  }

  authorize() {
    this.setState({ isAuth: true });
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route
              exact
              path="/"
              render={() =>
                (this.state.isAuth ? (
                  <Redirect to="/office" />
                ) : (
                  <Login clickHandler={this.authorize} />
                ))
              }
            />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route
              path="/office"
              render={() =>
                (this.state.isAuth ? <Office /> : <Login clickHandler={this.authorize} />)
              }
            />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
