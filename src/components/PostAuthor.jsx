import { useSelector } from "react-redux";
import { selectAlluser } from "../app/features/users/userSlice";

import React from "react";

const PostAuthor = ({ userId }) => {
  const users = useSelector(selectAlluser);
  const author = users.find((user) => user.id === userId);
  return <span>by {author ? author.name : "Unknown author"} </span>;
};

export default PostAuthor;
