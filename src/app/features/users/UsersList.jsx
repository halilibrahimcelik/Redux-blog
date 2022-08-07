import { useSelector } from "react-redux";
import { selectAlluser } from "./userSlice";
import { Link } from "react-router-dom";
import React from "react";

const UsersList = () => {
  const users = useSelector(selectAlluser);
  const renderedUsers = users.map((user) => {
    return (
      <li key={user.id}>
        <Link to={`/user/${user.id}`}>{user.name} </Link>
      </li>
    );
  });
  return (
    <section>
      <h2>Users</h2>
      <ul>{renderedUsers} </ul>
    </section>
  );
};

export default UsersList;
