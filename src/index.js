import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { fetchUsers } from "./app/features/users/userSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./app/store";
const root = ReactDOM.createRoot(document.getElementById("root"));

store.dispatch(fetchUsers());
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </Provider>
  </BrowserRouter>
);
