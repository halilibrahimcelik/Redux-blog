import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectAllPost } from "../app/features/post/postSlice";
import { selectUserById } from "../app/features/users/userSlice";
const UserPage = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, Number(userId)));
  const postsForUser = useSelector((state) => {
    const allPost = selectAllPost(state);
    return allPost.filter((post) => post.userId === Number(userId));
  });
  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/post/${post.id}`}> {post.title} </Link>
    </li>
  ));
  return (
    <section>
      <h2>{user?.name} </h2>
      <ol>{postTitles} </ol>
    </section>
  );
};

export default UserPage;
