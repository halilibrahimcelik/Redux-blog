import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { fetchUsers } from "./app/features/users/userSlice";

import store from "./app/store";
const root = ReactDOM.createRoot(document.getElementById("root"));

store.dispatch(fetchUsers());
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
