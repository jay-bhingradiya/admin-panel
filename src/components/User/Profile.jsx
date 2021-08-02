import React, { useContext } from "react";
import AdminContext from "../../store/admin-context";

const Profile = () => {
  const users = useContext(AdminContext).users;
  return (
    <div>
      <table border="1" cellPadding="0" cellSpacing="0">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Phone Number</th>
          </tr>
          {users.map((user, key) => (
            <tr key={key}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.gender}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Profile;
