import React, { Fragment, useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import AdminContext from "../../store/admin-context";
import ChangePassword from "../User/ChangePassword";

const Navigation = () => {
  const adminCtx = useContext(AdminContext);
  const logoutHandler = () => adminCtx.logout();

  const [passModal, setPassModal] = useState(false);

  const openModal = () => setPassModal(true);
  const closeModal = () => setPassModal(false);

  const protectedLinks = (
    <Fragment>
      <NavLink
        to="/personal-details"
        activeClassName="active"
        className="nav-link"
      >
        Personal Details
      </NavLink>
      <NavLink
        to="/education-details"
        activeClassName="active"
        className="nav-link"
      >
        Education Details
      </NavLink>

      <div
        style={{ display: "inline-block", cursor: "pointer" }}
        className="nav-link"
        onClick={logoutHandler}
      >
        Logout
      </div>
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
    <Fragment>
      {passModal && <ChangePassword onClose={closeModal} />}
      <nav className="navbar">
        <div className="upper">
          <div className="logo">
            <h1>Admin Panel</h1>
          </div>

          <div className="nav-links">
            <NavLink
              exact
              to="/dropzone"
              activeClassName="active"
              className="nav-link"
            >
              Dropzone
            </NavLink>
            <NavLink exact to="/" activeClassName="active" className="nav-link">
              Home
            </NavLink>
            {adminCtx.isLogin ? protectedLinks : links}
          </div>
        </div>
        {adminCtx.isLogin && (
          <div className="lowwer">
            <span onClick={openModal}>Change Password</span>
            <span>{`Logged in as ${adminCtx.currentUser.email}`}</span>
          </div>
        )}
      </nav>
    </Fragment>
  );
};

export default Navigation;
