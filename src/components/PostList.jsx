import { useSelector, useDispatch } from "react-redux/es/exports";
import {
  selectAllPost,
  getAllErrors,
  getAllStatus,
  fetchPosts,
} from "../app/features/post/postSlice";

import PostAuthor from "./PostAuthor";
import React, { useEffect } from "react";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const PostList = () => {•	Gathering intel and data for AI Machine learning
  const posts = useSelector(selectAllPost);
  const status = useSelector(getAllStatus);
  const error = useSelector(getAllErrors);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [dispatch, status]);
  console.log(posts);
  //slice creates a shadow copy of posts array
  const orderedPost = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));
  //?we are creating article for each posts
  const renderedPosts = orderedPost.map((post) => (
    <article key={post.id}>
      <h3>{post.title} </h3>
      <p>{post.content.substring(0, 100)} </p>
      <PostAuthor userId={post.userId} />
      <TimeAgo timestamp={post.date} />
      <ReactionButtons post={post} />
    </article>
  ));
  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
};

export default PostList;
