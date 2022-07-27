import React, { useState } from "react";
import { addNewPosts } from "../app/features/post/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { postSchema } from "../validations/userValidation";

import { selectAlluser } from "../app/features/users/userSlice";
import { nanoid } from "@reduxjs/toolkit";

const AddPostForm = () => {
  const dispatch = useDispatch();
  const userNames = useSelector(selectAlluser);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const [addRequestStatus, setAddReqeuestStatus] = useState("idle");

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);
  console.log(userId);

  //const canSave = Boolean(title) && Boolean(content) && Boolean(userId) && addRequestStatus==="idle";
  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";
  //?we check if title content auserId  and also  addRequest status  all true if it, then button is enabled.

  const onSavePostClicked = async () => {
    const data = {
      title,
      content,
    };
    const isValidEntry = await postSchema.isValid(data);
    //!we get false if we do not meet rules defined in postSchema.

    // if (title && content) {
    //   dispatch(postAdded(title, content, userId));
    // }
    if (canSave) {
      try {
        setAddReqeuestStatus("pending");
        dispatch(
          addNewPosts({ title, body: content, userId: nanoid() })
        ).unwrap();
        setContent("");
        setTitle("");
        setUserId("");
      } catch (error) {
        console.error("Failed to save the post", error);
      } finally {
        setAddReqeuestStatus("idle");
      }
    }
  };

  const usersOptions = userNames.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add a New Post</h2>
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
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
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

export default AddPostForm;
