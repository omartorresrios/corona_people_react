import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../components/Home';
import AdminSignIn from '../views/AdminSignIn';
import AdminSignUp from '../views/AdminSignUp';
import AdminDashboard from '../components/AdminDashboard';
import NotFound from '../components/NotFound';

const createRoutes = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/admin_dashboard" component={AdminDashboard} />
        <Route path="/admin/signup" component={AdminSignUp} />
        <Route path="/admin/signin" component={AdminSignIn} />
        <Route path="*" component={NotFound}/>
      </Switch>
    </BrowserRouter>
  );
};

export default createRoutes;
