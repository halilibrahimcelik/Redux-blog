import React from "react";
import { useSelector } from "react-redux";
import { selectPostById } from "../app/features/post/postSlice";

import PostAuthor from "../components/PostAuthor";

import ReactionButtons from "../components/ReactionButtons";
import TimeAgo from "../components/TimeAgo";
import { useParams } from "react-router-dom";
const SinglePostPage = () => {
  //retrive postId with react Router
  const { postId } = useParams();

  const post = useSelector((state) => selectPostById(state, Number(postId)));
  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }
  return (
    <article>
      <h2>{post.title} </h2>
      <p>{post.body} </p>
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};

export default SinglePostPage;
