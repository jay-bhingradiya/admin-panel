import React from "react";
import { Route } from "react-router-dom";

const HigherRoute = (WrappedRoute) => {
  const checkLogin = (props) => {
    return (
      <h3>
        <WrappedRoute />
      </h3>
    );
  };
  return checkLogin;
};

export default HigherRoute;
