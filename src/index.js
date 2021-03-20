import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import generateStore from "./redux/store";
import App from "./App";
import "./index.css";
import "font-awesome/css/font-awesome.css";

let store = generateStore();

const WithRouter = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

const WithStore = () => (
  <Provider store={store}>
    <WithRouter />
  </Provider>
);

ReactDOM.render(<WithStore />, document.getElementById("root"));
