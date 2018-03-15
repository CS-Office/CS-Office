import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import Header from './Header.jsx';
import Office from './Office.jsx';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isAuth: false };

    // this.authorize = this.authorize.bind(this);
  }

  // authorize(e) {
  //   // e.preventDefault();
  //   const href = e.target.parentNode.href;
  //   // console.log(href);

  //   axios
  //     .get(href, {
  //       headers: {
  //         'Access-Control-Allow-Origin': '*'
  //       }
  //     })
  //     .then(function(response) {
  //       console.log(response);
  //       this.setState({ isAuth: true });
  //     });

  //   // fetch('/auth/google')
  //   //   .then(this.setState({ isAuth: true }))
  //   //   .catch(err => console.log(err));

  //   // this.setState({ isAuth: true });
  // }

  render() {
    console.log(this.state.isAuth);
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            {/* <Route
              exact
              path="/"
              render={() =>
                this.state.isAuth ? (
                  <Redirect to="/office" />
                ) : (
                  <Login clickHandler={this.authorize} />
                )
              }
            /> */}
            <Route exact path="/" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/office" component={Office} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
