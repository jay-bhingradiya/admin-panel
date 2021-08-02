import React, { useContext, useState } from "react";
import AdminContext from "../../store/admin-context";
import EducationModal from "../utils/EducationModal";

const EducationDetails = () => {
  const adminCtx = useContext(AdminContext);
  const { users, deleteEducation, editEducation } = adminCtx;

  const [modal, setModal] = useState({
    showModal: false,
    data: {},
    userId: null,
    eduIndex: null,
  });

  const editHandler = (userId, eduIndex) => {
    const currentData = users.find((data) => data.id === userId);
    setModal({
      showModal: true,
      data: currentData.education[eduIndex],
      userId,
      eduIndex,
    });
  };

  const deleteHandler = (userId, eduIndex) => {
    if (window.confirm("Are you sure?")) {
      deleteEducation({ userId, eduIndex });
    }
  };

  const submitEditedEducation = (editedData) => {
    editEducation({
      editedData,
      userId: modal.userId,
      eduIndex: modal.eduIndex,
    });

    setModal({
      showModal: false,
      data: {},
      userId: null,
      eduIndex: null,
    });
  };

  const closeModal = () =>
    setModal({
      showModal: false,
      data: {},
      userId: null,
      eduIndex: null,
    });

  return (
    <div>
      {modal.showModal && (
        <EducationModal
          onClose={closeModal}
          onSubmitModal={submitEditedEducation}
          data={modal.data}
        />
      )}

      <div className="eduDetails">
        <table border="1" cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <th>Name</th>
              <th>Institute</th>
              <th>Course</th>
              <th>Percentage</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th style={{ width: "130px" }}>Actions</th>
            </tr>
            {users.map((user, key) =>
              user.education.map((data, eduIndex) => (
                <tr key={`${key}${eduIndex}`}>
                  <td>{user.name}</td>
                  <td>{data.institute}</td>
                  <td>{data.course}</td>
                  <td>{data.marks}</td>
                  <td>{data.startDate}</td>
                  <td>{data.endDate}</td>
                  <td className="table-action">
                    <button
                      className="btn-dark"
                      onClick={() => editHandler(user.id, eduIndex)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-danger ml-5"
                      onClick={() => deleteHandler(user.id, eduIndex)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EducationDetails;
