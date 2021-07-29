import React, { useState } from "react";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

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

    console.log(userData);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={onChangeHandler}
        />
      </div>

      <div className="form-group">
        <label>password</label>
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={onChangeHandler}
        />
      </div>
      <input type="submit" value="Login" />
    </form>
  );
};

export default Login;
