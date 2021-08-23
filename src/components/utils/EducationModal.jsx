import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom";

const EducationModal = ({ data, onSubmitModal, onClose }) => {
  const [eduData, setEduData] = useState({
    institute: data.institute,
    course: data.course,
    marks: data.marks,
    startDate: data.startDate,
    endDate: data.endDate,
  });

  const onEducationChange = (e) => {
    if (e.target.name === "marks") {
      if (e.target.value > 100 || e.target.value < 0) {
        alert("enter valid percentage");
        return;
      }
    }

    setEduData({
      ...eduData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const { institute, course, marks, startDate, endDate } = eduData;

    if (
      institute === "" ||
      course === "" ||
      marks === "" ||
      startDate === "" ||
      endDate === ""
    ) {
      alert("Please fill all the field");
      return;
    }
    onSubmitModal(eduData);
  };

  return ReactDOM.createPortal(
    <Fragment>
      <div className="backdrop" onClick={onClose}></div>
      <div className="modal-content">
        <div className="register">
          <form className="register-form" onSubmit={submitHandler}>
            <div className="form-group">
              <label>Institute</label>
              <input
                className="form-input"
                type="text"
                name="institute"
                onChange={onEducationChange}
                value={eduData.institute}
              />
            </div>
            <div className="form-group">
              <label>Course</label>
              <input
                className="form-input"
                type="text"
                name="course"
                onChange={onEducationChange}
                value={eduData.course}
              />
            </div>
            <div className="form-group">
              <label>Percentage/CGPA</label>
              <input
                className="form-input"
                type="text"
                name="marks"
                onChange={onEducationChange}
                value={eduData.marks}
              />
            </div>
            <div className="form-group">
              <label>startDate</label>
              <input
                className="form-input"
                type="date"
                name="startDate"
                onChange={onEducationChange}
                value={eduData.startDate}
              />
            </div>
            <div className="form-group">
              <label>endDate</label>
              <input
                className="form-input"
                type="date"
                name="endDate"
                onChange={onEducationChange}
                value={eduData.endDate}
              />
            </div>
            <div className="modal-btns">
              <input
                type="submit"
                className="btn-light"
                value="Edit Education"
              />
              <button type="btn" className="btn-dark ml-5" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>,
    document.getElementById("forModal")
  );
};

export default EducationModal;
