import React, { Fragment, useContext, useState } from "react";
import ReactDOM from "react-dom";
import AdminContext from "../../store/admin-context";

const ChangePassword = ({ onClose }) => {
  const [passwords, setPasswords] = useState({
    oldPass: "",
    newPass: "",
    confirmPass: "",
  });

  const adminCtx = useContext(AdminContext);

  const onChangeHandler = (e) =>
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(passwords);

    const userId = adminCtx.currentUser.id;
    const user = adminCtx.users.find((user) => user.id === userId);

    if (!user) {
      alert("please login first");
      return;
    }
    if (passwords.oldPass === "" || passwords.newPass === "") {
      alert("please enter password");
      return;
    }

    if (passwords.oldPass !== user.password) {
      alert("Old Password didn't match");
      return;
    }
    if (passwords.newPass !== passwords.confirmPass) {
      alert("Password didn't match");
      return;
    }

    adminCtx.resetPassword(userId, passwords.newPass);
    alert("Password changed");
    onClose();
  };

  return ReactDOM.createPortal(
    <Fragment>
      <div className="backdrop" onClick={onClose}></div>
      <div className="modal-content">
        <div className="register">
          <form onSubmit={submitHandler} className="register-form">
            <div className="form-group">
              <label>Old password</label>
              <input
                className="form-input"
                type="password"
                name="oldPass"
                value={passwords.oldPass}
                onChange={onChangeHandler}
              />
            </div>
            <div className="form-group">
              <label>New password</label>
              <input
                className="form-input"
                type="password"
                name="newPass"
                value={passwords.newPass}
                onChange={onChangeHandler}
              />
            </div>
            <div className="form-group">
              <label>Confirm New password</label>
              <input
                className="form-input"
                type="password"
                name="confirmPass"
                value={passwords.confirmPass}
                onChange={onChangeHandler}
              />
            </div>
            <input
              type="submit"
              className="submit-btn"
              value="Change Password"
            />
          </form>
        </div>
      </div>
    </Fragment>,
    document.getElementById("forModal")
  );
};

export default ChangePassword;
