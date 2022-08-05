import AddPostForm from "./components/AddPostForm";
import PostList from "./components/PostList";
import SinglePostPage from "./pages/SinglePostPage";
import Layout from "./components/layout/Layout";
import { Routes, Route } from "react-router-dom";

import EditPostForm from "./components/EditPostForm";
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
      </Route>
    </Routes>
  );
}

export default App;
