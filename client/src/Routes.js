import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from './containers/Login';
import Signup from './containers/Signup';
import NotFound from './containers/NotFound';
import DailyReport from './containers/DailyReport';

import AppliedRoute from "./sharedComponents/AppliedRoute";

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
    <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
    <AppliedRoute path="/dailyReport" exact component={DailyReport} props={childProps} />
    <Route component={NotFound} />
  </Switch>;
