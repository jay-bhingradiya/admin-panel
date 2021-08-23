import React, { Fragment, useContext, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";

import AdminContext from "../../store/admin-context";
import FormInput from "../Input/FormInput";

const Register = () => {
  const adminCtx = useContext(AdminContext);
  const [showFirstPage, setShowFirstPage] = useState(true);
  const [errorList, setErrorList] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [activeNextBtn, setActiveNextBtn] = useState(false);
  const [eduErrorList, setEduErrorList] = useState([{}]);
  const [education, setEducation] = useState([
    {
      institute: "",
      course: "",
      marks: "",
      startDate: "",
      endDate: "",
    },
  ]);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    gender: "",
  });

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  useEffect(() => {
    let emptyUserData = false;
    let hasError = false;

    Object.entries(userData).forEach(([key, value]) => {
      if (value === "") {
        emptyUserData = true;
      }
    });

    Object.entries(errorList).forEach(([key, value]) => {
      if (value !== "") {
        hasError = true;
      }
    });

    let emptyEducationData = false;
    let hasEduErr = false;

    education.map((data) => {
      Object.entries(data).forEach(([key, value]) => {
        if (value === "") {
          emptyEducationData = true;
        }
      });
    });

    eduErrorList.map((data) => {
      Object.entries(data).forEach(([key, value]) => {
        if (value !== "") {
          hasEduErr = true;
        }
      });
    });

    if (!emptyUserData && !hasError) {
      setActiveNextBtn(true);
    } else {
      setActiveNextBtn(false);
    }

    if (!emptyUserData && !hasError && !emptyEducationData && !hasEduErr) {
      setIsSubmit(true);
    } else {
      setIsSubmit(false);
    }
  }, [userData, errorList, education, eduErrorList]);

  const onUserChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });

    const currentName = e.target.name;
    const currentValue = e.target.value;

    let tempErr = {};

    if (currentName === "name") {
      if (!currentValue.length) {
        tempErr.name = "Enter Name";
      } else {
        tempErr.name = "";
      }
    }

    if (currentName === "email") {
      if (currentValue.length === 0) {
        tempErr.email = "Enter Email";
      } else if (!validateEmail(currentValue)) {
        tempErr.email = "Enter Valid Email";
        // } else if (currentValue.search("@") === -1) {
        //   tempErr.email = "Enter Valid Email";
      } else {
        tempErr.email = "";
      }
    }

    if (currentName === "phone") {
      let val = currentValue.toString();
      if (val.length === 0) {
        tempErr[currentName] = "Enter Phone Number";
      } else if (val.length !== 10) {
        tempErr[currentName] = "Enter valid Phone number with 10 char.";
      } else {
        tempErr[currentName] = "";
      }
    }

    if (currentName === "password") {
      if (currentValue.length === 0) {
        tempErr[currentName] = "Enter Password";
      } else if (currentValue.length < 6) {
        tempErr[currentName] = "Password should more than 6 Characters";
      } else {
        tempErr[currentName] = "";
      }
    }

    if (currentName === "confirmPassword") {
      if (currentValue.length === 0) {
        tempErr[currentName] = "Confirm your password";
      } else if (userData.password !== currentValue) {
        tempErr[currentName] = "Password Didn't Match";
      } else {
        tempErr[currentName] = "";
      }
    }

    setErrorList({
      ...errorList,
      ...tempErr,
    });
    tempErr = {};
  };

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
    setEduErrorList([...eduErrorList, {}]);
  };

  const dateDiff = (start, end) => {
    return end - start;
  };

  const onEducationChange = (e, index) => {
    const currentName = e.target.name;
    const currentValue = e.target.value;

    const list = [...education];
    list[index][e.target.name] = e.target.value;
    setEducation(list);

    // Setting Error

    const errList = [...eduErrorList];
    const currentIndexError = errList[index];

    let errorObj = { ...currentIndexError };

    if (currentName === "institute") {
      if (currentValue === "") {
        errorObj[currentName] = "Enter your Institute";
      } else {
        errorObj[currentName] = "";
      }
    }
    if (currentName === "course") {
      if (currentValue === "") {
        errorObj[currentName] = "Enter your Course";
      } else {
        errorObj[currentName] = "";
      }
    }
    if (currentName === "marks") {
      if (currentValue === "") {
        errorObj[currentName] = "Enter your Percentage";
      } else if (currentValue < 0 || currentValue > 100) {
        errorObj[currentName] = "Enter Valid Percentage";
      } else {
        errorObj[currentName] = "";
      }
    }
    if (currentName === "startDate") {
      if (currentValue === "") {
        errorObj[currentName] = "Enter Starting Date of Course";
      } else if (dateDiff(new Date(currentValue), new Date()) < 0) {
        errorObj[currentName] = "Enter Valid Start Date";
      } else {
        errorObj[currentName] = "";
      }
      if (education[index].endDate !== "") {
        if (
          dateDiff(new Date(education[index].endDate), new Date(currentValue)) <
          0
        ) {
          errorObj["endDate"] = "";
        } else {
          errorObj["endDate"] = "Enter Valid End date";
        }
      }
    }

    if (currentName === "endDate") {
      if (currentValue === "") {
        errorObj[currentName] = "Enter End Date of Course";
      } else if (education[index].startDate === "") {
        errorObj[currentName] = "Enter Start Date first";
      } else if (
        dateDiff(new Date(education[index].startDate), new Date(currentValue)) <
        0
      ) {
        errorObj[currentName] = "Enter Valid End Date";
      } else {
        errorObj[currentName] = "";
      }
    }

    errList[index] = errorObj;
    setEduErrorList(errList);
  };

  const removeEdu = (id) => {
    const newList = [...education];
    if (newList.length <= 1) {
      alert("You have register at leaest one Education details");
      return;
    }

    newList.splice(id, 1);
    setEducation(newList);

    const newError = [...eduErrorList];
    newError.splice(id, 1);
    setEduErrorList(newError);
  };

  const pageHandler = () => setShowFirstPage(!showFirstPage);

  const submitHandler = () => {
    const formData = {
      ...userData,
      education,
      id: Math.random(),
    };

    adminCtx.register(formData);
  };

  return (
    <Fragment>
      <div className="register-backdrop">
        <div className="register">
          <form className="register-form">
            <div className="page-1" style={userDetails}>
              <FormInput
                label="Name"
                type="text"
                name="name"
                value={userData.name}
                onChange={onUserChange}
                error={errorList.name}
                required
              />
              <FormInput
                label="Email"
                type="email"
                name="email"
                value={userData.email}
                onChange={onUserChange}
                error={errorList.email}
                required
              />

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

                  {/* <spa className="error-div">Select Gender</spa> */}
                </span>
              </div>

              <FormInput
                label="Phone Number"
                type="number"
                name="phone"
                value={userData.phone}
                onChange={onUserChange}
                error={errorList.phone}
                required
              />

              <FormInput
                label="Password"
                type="password"
                name="password"
                value={userData.password}
                onChange={onUserChange}
                error={errorList.password}
                required
              />

              <FormInput
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={onUserChange}
                error={errorList.confirmPassword}
                required
              />
            </div>
            <div className="page-2" style={educationDetails}>
              {education &&
                education.map((data, key) => (
                  <div className="education" key={key}>
                    <FormInput
                      label="Institute"
                      type="text"
                      name="institute"
                      value={data.institute}
                      onChange={(e) => onEducationChange(e, key)}
                      error={eduErrorList[key].institute}
                      required
                    />
                    <FormInput
                      label="Course"
                      type="text"
                      name="course"
                      value={data.course}
                      onChange={(e) => onEducationChange(e, key)}
                      error={eduErrorList[key].course}
                      required
                    />

                    <FormInput
                      label="Percentage/CGPA"
                      type="number"
                      name="marks"
                      error={eduErrorList[key].marks}
                      onChange={(e) => onEducationChange(e, key)}
                      value={data.marks}
                      required
                    />

                    <FormInput
                      label="Start Date"
                      type="date"
                      name="startDate"
                      onChange={(e) => onEducationChange(e, key)}
                      value={data.startDate}
                      error={eduErrorList[key].startDate}
                      required
                    />
                    <FormInput
                      label="End Date"
                      type="date"
                      name="endDate"
                      onChange={(e) => onEducationChange(e, key)}
                      value={data.endDate}
                      error={eduErrorList[key].endDate}
                      disabled={data.startDate === "" ? true : false}
                      required
                    />

                    <button type="button" onClick={() => removeEdu(key)}>
                      Remove
                    </button>
                  </div>
                ))}
            </div>
          </form>
          <div className="buttons">
            {showFirstPage ? (
              <button
                disabled={!activeNextBtn}
                style={!activeNextBtn ? { opacity: ".4" } : {}}
                onClick={pageHandler}
              >
                Next
              </button>
            ) : (
              <button onClick={pageHandler}>Previous</button>
            )}

            <button
              onClick={addEduHandler}
              disabled={showFirstPage}
              style={showFirstPage ? { opacity: ".4" } : {}}
            >
              Add Education
            </button>
            <button
              type="submit"
              onClick={submitHandler}
              disabled={!isSubmit}
              style={!isSubmit ? { opacity: ".4" } : {}}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
