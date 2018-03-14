import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header.jsx';
import Office from './Office.jsx';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';

class App extends Component {
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact={true} path="/" component={Login} />
            <Route exact={true} path="/signup" component={SignUp} />
            {/* <Route exact={true} path="/office" component={Office} /> */}
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
