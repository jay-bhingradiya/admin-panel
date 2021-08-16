import React, { Fragment, useContext, useState } from "react";
import AdminContext from "../../store/admin-context";

const Register = () => {
  const adminCtx = useContext(AdminContext);
  const [showFirstPage, setShowFirstPage] = useState(true);

  const [errors, setErrors] = useState([]);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    gender: "",
  });

  const [education, setEducation] = useState([
    {
      institute: "",
      course: "",
      marks: "",
      startDate: "",
      endDate: "",
    },
  ]);

  const userDetails = {
    display: showFirstPage ? "block" : "none",
  };

  const educationDetails = {
    display: !showFirstPage ? "block" : "none",
  };

  const addEduHandler = () => {
    setEducation([
      ...education,
      {
        institute: "",
        course: "",
        marks: "",
        startDate: "",
        endDate: "",
      },
    ]);
  };

  const onEducationChange = (e, index) => {
    const list = [...education];
    list[index][e.target.name] = e.target.value;
    setEducation(list);
  };

  const removeEdu = (id) => {
    const newList = [...education];
    newList.splice(id, 1);
    setEducation(newList);
  };

  const onUserChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const pageHandler = () => setShowFirstPage(!showFirstPage);

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  const submitHandler = () => {
    const formData = {
      ...userData,
      education,
    };

    let error = [];

    if (!formData.name.length) error.push("please enter name");
    if (!formData.email.length) error.push("please enter email");
    if (!validateEmail(formData.email)) error.push("Please enter valid email");
    if (formData.phone.length !== 10) error.push("Please enter valid number");
    if (!formData.gender.length) error.push("please select Gender");
    if (!formData.password.length) error.push("please enter your password");
    if (!formData.email.length) error.push("please confirm yout password");
    if (formData.password !== formData.confirmPassword)
      error.push("password didn't match ");

    console.log(errors);

    formData.education.forEach((data, index) => {
      for (let [key, value] of Object.entries(data)) {
        if (value === "") {
          error.push(`Please fill data in education-${index + 1}`);
          break;
        }
      }
    });

    if (error.length) {
      console.log(error);
      setErrors(error);
      setTimeout(() => setErrors([]), 3000);
      return;
    }

    formData["id"] = Math.random();
    adminCtx.register(formData);
  };

  const errorComponent = (
    <ul>
      {errors.map((error) => (
        <li>{error}</li>
      ))}
    </ul>
  );

  return (
    <Fragment>
      <div className="register-backdrop">
        <div className="register">
          <form className="register-form">
            <div className="page-1" style={userDetails}>
              <div className="form-group">
                <label>Name</label>
                <input
                  className="form-input"
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={onUserChange}
                  required
                />
                <div className="error-div">{errors.name}</div>
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  className="form-input"
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={onUserChange}
                  required
                />
                <div className="error-div">{errors.email}</div>
              </div>
              <div className="form-group">
                <label>gender</label>
                <span>
                  <input
                    // className="form-input"
                    type="radio"
                    name="gender"
                    value="male"
                    onChange={onUserChange}
                    required
                  />
                  <span>Male</span>
                  <input
                    // className="form-input"
                    type="radio"
                    name="gender"
                    value="female"
                    onChange={onUserChange}
                  />
                  <span>Female</span>

                  {/* <spa className="error-div">{errors.email}</spa> */}
                </span>
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  className="form-input"
                  type="number"
                  name="phone"
                  value={userData.phone}
                  onChange={onUserChange}
                  required
                />
                <div className="error-div">{errors.phone}</div>
              </div>
              <div className="form-group">
                <label>password</label>
                <input
                  className="form-input"
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={onUserChange}
                  required
                />
                <div className="error-div">{errors.password}</div>
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  className="form-input"
                  type="password"
                  name="confirmPassword"
                  value={userData.confirmPassword}
                  onChange={onUserChange}
                  required
                />
                <div className="error-div">{errors.ChangePassword}</div>
              </div>
            </div>
            <div className="page-2" style={educationDetails}>
              {education &&
                education.map((data, key) => (
                  <div className="education" key={key}>
                    <div className="form-group">
                      <label>Institute</label>
                      <input
                        className="form-input"
                        type="text"
                        name="institute"
                        onChange={(e) => onEducationChange(e, key)}
                        value={data.institute}
                      />
                    </div>
                    <div className="form-group">
                      <label>Course</label>
                      <input
                        className="form-input"
                        type="text"
                        name="course"
                        onChange={(e) => onEducationChange(e, key)}
                        value={data.course}
                      />
                    </div>
                    <div className="form-group">
                      <label>Percentage/CGPA</label>
                      <input
                        className="form-input"
                        type="text"
                        name="marks"
                        onChange={(e) => onEducationChange(e, key)}
                        value={data.marks}
                      />
                    </div>
                    <div className="form-group">
                      <label>startDate</label>
                      <input
                        className="form-input"
                        type="date"
                        name="startDate"
                        onChange={(e) => onEducationChange(e, key)}
                        value={data.startDate}
                      />
                    </div>
                    <div className="form-group">
                      <label>endDate</label>
                      <input
                        className="form-input"
                        type="date"
                        name="endDate"
                        onChange={(e) => onEducationChange(e, key)}
                        value={data.endDate}
                      />
                    </div>
                    <button type="button" onClick={() => removeEdu(key)}>
                      Remove
                    </button>
                  </div>
                ))}
            </div>
          </form>
          {errorComponent}
          <div className="buttons">
            {showFirstPage ? (
              <button onClick={pageHandler}>Next</button>
            ) : (
              <button onClick={pageHandler}>Previous</button>
            )}

            <button onClick={addEduHandler}>Add Education</button>
            <button onClick={submitHandler}>Submit</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
