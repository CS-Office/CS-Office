import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';

import LoginPage from '../components/LoginPage.jsx';
import SignUp from '../components/SignUp.jsx';
import App from '../components/App.jsx';
import AdminPage from '../components/AdminPage.jsx';

const AppRouter = () => (
  <BrowserRouter>
    <div>
     
        <Switch>
          <Route path='/' component={LoginPage} exact={true} />
          <Route path='/signup' component={SignUp} />
          <Route path='/office-hours' component={App} />
          <Route path='/admin-control' component={AdminPage} />
        </Switch>
     
    </div>    
  </BrowserRouter>
);


export default AppRouter;