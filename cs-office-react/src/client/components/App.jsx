import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import Header from './Header.jsx';
import Office from './Office.jsx';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    dds
    this.state = { isAuth: false };

    this.authorize = this.authorize.bind(this);
  }

  authorize(response) {
  //   e.preventDefault();
  //   const href = e.target.parentNode.href;
    // console.log(response);

  //   axios.get('/api/current_user').then(function(user) {
  //     if (user) {
  //       this.setState({ isAuth: true });
  //     } else {
  //       console.log('SIGN IN PLEASE');
  //     }
  //   });

  // fetch('/auth/google')
    // .then(this.setState({ isAuth: true }))
  //   .catch(err => console.log(err));
  this.setState({ isAuth: true });
  }

  render() {
    console.log(this.state);
    return <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" render={() => (this.state.isAuth ? <Redirect to="/office" /> : <Login clickHandler={this.authorize} />)} />
            <Route exact={true} path="/login" component={Login} />
            <Route exact={true} path="/signup" component={SignUp} />
            <Route exact={true} path="/office" render={() => (this.state.isAuth ? <Office /> : <Login clickHandler={this.authorize} />)} />
          </div>
        </BrowserRouter>
      </div>;
  }
}

export default App;
