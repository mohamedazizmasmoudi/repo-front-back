import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Menu from "./core/Menu";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import PrivateRoute from "./auth/PrivateRoute";
import ForgotPassword from "./user/ForgotPassword";
import ResetPassword from "./user/ResetPassword";
import Admin from "./admin/Admin";
import { isAuthenticated, signin } from "./auth";

const MainRouter = () => (
  <div>
      {!isAuthenticated() && (

      <Switch>

            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            </Switch>

	         )}
            

    {isAuthenticated() && (
      <Switch>
          <Menu />
        <Route exact path="/" component={Home} />
        <PrivateRoute exact path="/admin" component={Admin} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route
          exact
          path="/reset-password/:resetPasswordToken"
          component={ResetPassword}
        />
        
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
      
      </Switch>
    )}
  </div>
);

export default MainRouter;
