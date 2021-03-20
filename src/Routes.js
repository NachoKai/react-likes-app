import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/HomePage";
import FavPage from "./components/FavPage";
import LoginPage from "./components/LoginPage";

const PrivateRoute = ({ path, component, ...rest }) => {
  let storage = localStorage.getItem("storage");
  storage = JSON.parse(storage);
  if (storage && storage.user) {
    return <Route path={path} component={component} {...rest} />;
  } else {
    return <Redirect to="/login" {...rest} />;
  }
};

export const Routes = () => {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute path="/favs" component={FavPage} />
      <Route path="/login" component={LoginPage} />
    </Switch>
  );
};

export default Routes;
