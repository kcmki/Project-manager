import * as React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import Navbar from "./Navbar";
import Header from "./Header";

ReactDOM.render(
  <React.StrictMode>

    <Navbar />
    <Header />
  </React.StrictMode>,
  document.getElementById("root")
);
