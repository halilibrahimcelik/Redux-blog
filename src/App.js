import AddPostForm from "./components/AddPostForm";
import PostList from "./components/PostList";
import SinglePostPage from "./pages/SinglePostPage";
import Layout from "./components/layout/Layout";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostList />} />
        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
