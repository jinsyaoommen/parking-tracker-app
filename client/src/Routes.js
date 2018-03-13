import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from './containers/Login';
import Signup from './containers/Signup';
import NotFound from './containers/NotFound';
import DailyReport from './containers/DailyReport';
import AuthenticatedRoute from "./sharedComponents/AuthenticatedRoute";
import UnauthenticatedRoute from "./sharedComponents/UnauthenticatedRoute";

import AppliedRoute from "./sharedComponents/AppliedRoute";

export default ({ childProps }) =>
  <Switch>
    <AuthenticatedRoute path="/" exact component={Home} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
    <AuthenticatedRoute path="/dailyReport" exact component={DailyReport} props={childProps} />
    <Route component={NotFound} />
  </Switch>;
