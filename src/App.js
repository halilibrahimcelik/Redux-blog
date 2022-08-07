import AddPostForm from "./components/AddPostForm";
import PostList from "./components/PostList";
import SinglePostPage from "./pages/SinglePostPage";
import Layout from "./components/layout/Layout";
import { Routes, Route, Navigate } from "react-router-dom";

import EditPostForm from "./components/EditPostForm";
import UserPage from "./pages/UserPage";
import UsersList from "./app/features/users/UsersList";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostList />} />
        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
          <Route path="edit/:postId" element={<EditPostForm />} />
        </Route>
        <Route path="user">
          <Route index element={<UsersList />} />
          <Route path=":userId" element={<UserPage />} />
        </Route>
        {/* Catch all page  */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
