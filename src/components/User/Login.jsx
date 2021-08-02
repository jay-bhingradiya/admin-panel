import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AdminContext from "../../store/admin-context";

const Login = () => {
  const history = useHistory;
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const adminCtx = useContext(AdminContext);
  const onChangeHandler = (e) =>
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });

  const submitHandler = (e) => {
    e.preventDefault();
    if (userData.email.trim() === "" || userData.password.trim() === "") {
      alert("Please Enter Details");
      return;
    }
    adminCtx.login(userData);

    // history.push("/change-password");
  };

  return (
    <div className="register">
      <form onSubmit={submitHandler} className="register-form">
        <div className="form-group">
          <label>Email</label>
          <input
            className="form-input"
            type="email"
            name="email"
            value={userData.email}
            onChange={onChangeHandler}
          />
        </div>

        <div className="form-group">
          <label>password</label>
          <input
            className="form-input"
            type="password"
            name="password"
            value={userData.password}
            onChange={onChangeHandler}
          />
          <div className="error-div">
            {/* {userData.password.length === 0 && "Please enter password"} */}
          </div>
        </div>
        <input type="submit" className="submit-btn" value="Login" />
      </form>
    </div>
  );
};

export default Login;
