import React, { createContext, useReducer } from "react";
import { useHistory } from "react-router-dom";

let retriveData = JSON.parse(localStorage.getItem("userData"));
let storedUsers = [];

if (retriveData !== null) {
  storedUsers = retriveData;
}else{
  storedUsers['users'] = []
}

const AdminContext = createContext({
  isLogin: true,
  currentUser: null,
  users: [],
  login: (data) => {},
  logout: (data) => {},
  register: (data) => {},
  resetPassword: (data) => {},
  editEducation: (userId, index) => {},
  deleteEducation: (userId, index) => {},
});



const initalState = {
  isLogin: storedUsers.isLogin,
  currentUser: storedUsers.currentUser,
  users: storedUsers.users ,
};

const userReducer = (state = initalState, action) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        isLogin: true,
        currentUser: action.payload,
      };
    case "logout":
      return {
        ...state,
        isLogin: false,
      };
    case "registerUser":
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case "editUser":
    case "deleteUserData":
    case "changePassword":
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};

export const AdminProvider = ({ children }) => {
  const [userState, dispatchUserAction] = useReducer(userReducer, initalState);
  const history = useHistory();

  const loginHandler = (data) => {
    console.log(userState.users)
    const checkUser = userState.users.find((user) => user.email === data.email);

    if (!checkUser) {
      alert("User not found!!");
      return;
    }

    if (checkUser.password !== data.password) {
      alert("Wrong password!!");
      return;
    }
    let payload = {
      id: checkUser.id,
      email: checkUser.email,
    };

    dispatchUserAction({
      type: "login",
      payload,
    });

    let storedData = {
      ...userState,
      isLogin: true,
      currentUser: payload,
    };

    localStorage.setItem("userData", JSON.stringify(storedData));
    history.push("/personal-details");
  };

  const logoutHandler = () => {
    dispatchUserAction({
      type: "logout",
    });

    let storedData = {
      ...userState,
      isLogin: false,
      currentUser: {},
    };

    localStorage.setItem("userData", JSON.stringify(storedData));

    history.push("/");
  };

  const modifyUserHandler = (data) => {
    const { editedData, eduIndex, userId } = data;
    const userList = [...userState.users];
    const updatedData = userList.find((data) => data.id === userId);
    const existingUserIndex = userList.findIndex((user) => user.id === userId);
    updatedData.education[eduIndex] = editedData;
    userList[existingUserIndex] = updatedData;

    dispatchUserAction({
      type: "editUser",
      payload: userList,
    });

    let storedData = {
      ...userState,
      users: userList,
    };

    localStorage.setItem("userData", JSON.stringify(storedData));
  };

  const deleteHandler = (data) => {
    const { userId, eduIndex } = data;
    let newList = [...userState.users];

    let existingUser = newList.find((user) => user.id === userId);
    let existingUserIndex = newList.findIndex((user) => user.id === userId);

    const updatedUserEdu = existingUser.education.filter(
      (data, index) => index !== eduIndex
    );
    // const updatedUserEdu = existingUser.education.splice(eduIndex, 1);

    newList[existingUserIndex].education = updatedUserEdu;

    dispatchUserAction({
      type: "deleteUserData",
      payload: newList,
    });

    let storedData = {
      ...userState,
      users: newList,
    };

    localStorage.setItem("userData", JSON.stringify(storedData));
  };

  const registerHandler = (data) => {
    const checkUser = userState.users.find((user) => user.email === data.email);
    const checkId = userState.users.find((user) => user.id === data.id);

    if (checkUser) {
      alert("email already registered");
      return;
    }
    if (checkId) {
      alert("please re-submit form");
      return;
    }

    dispatchUserAction({
      type: "registerUser",
      payload: data,
    });

    dispatchUserAction({
      type: "login",
      payload: {
        id: data.id,
        email: data.email,
      },
    });

    let storedData = {
      ...userState,
      currentUser: {
        id: data.id,
        email: data.email,
      },
      users: [...userState.users, data],
    };

    localStorage.setItem("userData", JSON.stringify(storedData));
    history.push("/personal-details");
  };

  const resetPasswordHandler = (userId, newPass) => {
    const userList = [...userState.users];

    const userIndex = userList.findIndex((user) => user.id === userId);
    const user = userList.find((user) => user.id === userId);

    user.password = newPass;
    userList[userIndex] = user;

    dispatchUserAction({
      type: "changePassword",
      payload: userList,
    });

    let storedData = {
      ...userState,
      users: userList,
    };

    localStorage.setItem("userData", JSON.stringify(storedData));
  };

  const context = {
    currentUser: userState.currentUser,
    isLogin: userState.isLogin,
    users: userState.users,
    register: registerHandler,
    login: loginHandler,
    logout: logoutHandler,
    editEducation: modifyUserHandler,
    deleteEducation: deleteHandler,
    resetPassword: resetPasswordHandler,
  };

  return (
    <AdminContext.Provider value={context}>{children}</AdminContext.Provider>
  );
};

export default AdminContext;
