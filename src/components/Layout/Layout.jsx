import React, { Fragment } from "react";
import Navigation from "./Navigation";
import { Route, Switch } from "react-router-dom";
import Dashboard from "../Dashboard";
import Login from "../User/Login";
import Register from "../User/Register";

const Layout = () => {
  return (
    <Fragment>
      <Navigation />
    </Fragment>
  );
};

export default Layout;
