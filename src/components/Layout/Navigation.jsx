import React, { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  const [isLogin, setIsLogin] = useState(false);

  const protectedLinks = (
    <Fragment>
      <NavLink
        to="/change-password"
        activeClassName="active"
        className="nav-link"
      >
        Change Password
      </NavLink>
      <NavLink
        to="/change-password"
        activeClassName="active"
        className="nav-link"
      >
        Logout
      </NavLink>
    </Fragment>
  );

  const links = (
    <Fragment>
      <NavLink to="/login" activeClassName="active" className="nav-link">
        Login
      </NavLink>
      <NavLink to="/register" activeClassName="active" className="nav-link">
        Register
      </NavLink>
    </Fragment>
  );

  return (
    <nav className="navbar">
      <div className="logo">
        <h1>Admin Panel</h1>
      </div>
      <div className="nav-links">
        <NavLink exact to="/" activeClassName="active" className="nav-link">
          Home
        </NavLink>
        {isLogin ? protectedLinks : links}
      </div>
    </nav>
  );
};

export default Navigation;
