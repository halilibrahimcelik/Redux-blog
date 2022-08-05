import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { selectPostById, updatePost } from "../app/features/post/postSlice";
import { useSelector, useDispatch } from "react-redux";
import { selectAlluser } from "../app/features/users/userSlice";
const EditPostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const post = useSelector((state) => selectPostById(state, Number(postId)));
  const users = useSelector(selectAlluser);
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [userId, setUserId] = useState();
  const [requestStatus, setRequestStatus] = useState("idle");
  const dispatch = useDispatch();
  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);
  const canSave =
    [title, content, userId].every(Boolean) && requestStatus === "idle";

  const onSavePostClicked = () => {
    try {
      if (canSave) {
        setRequestStatus("pending");
        dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            reactions: post.reactions,
          })
        ).unwrap();
        //?unwrap allows us to throw an error if we had any allows us to use trycatch logic
        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/post/${postId}`);
      }
    } catch (error) {
      console.error("failed to save the post", error);
    } finally {
      setRequestStatus("idle");
    }
  };

  const userOptions = users.map((user) => {
    return (
      <option value={user.id} key={user.id}>
        {user.name}
      </option>
    );
  });
  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select
          id="postAuthor"
          defaultValue={userId}
          onChange={onAuthorChanged}
        >
          <option value=""></option>
          {userOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default EditPostForm;