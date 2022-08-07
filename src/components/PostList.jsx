import React from "react";
import { useSelector } from "react-redux/es/exports";
import {
  selectAllPost,
  getAllErrors,
  getAllStatus,
} from "../app/features/post/postSlice";

import PostExcerpt from "./PostExcerpt";

const PostList = () => {
  const posts = useSelector(selectAllPost);
  const status = useSelector(getAllStatus);
  const error = useSelector(getAllErrors);
  // const dispatch = useDispatch();
  //!index js'de sayfa yüklenir yüklenmez veriyi çekiyorum
  // useEffect(() => {
  //   if (status === "idle") {
  //     dispatch(fetchPosts());
  //   }
  // }, [dispatch, status]);

  let content;
  if (status === "loading") {
    content = <p>Loading </p>;
  } else if (status === "succeeded") {
    // slice creates a shadow copy of posts array
    const orderedPost = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPost.map((post) => (
      <PostExcerpt key={post.id} post={post} />
    ));
  } else if (status === "failed") {
    content = <p>{error} </p>;
  }
  return <section>{content}</section>;
};

export default PostList;
