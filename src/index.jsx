import * as React from "react";
import ReactDOM from "react-dom";
import "./items/css/index.css";

import Navbar from "./items/Navbar";
import Header from "./items/Header";
import Content from "./items/Content";

ReactDOM.render(
  <React.StrictMode>

    <Navbar />

    <div id="container">
      <Header />
      <Content />
    </div>
    
  </React.StrictMode>,
  document.getElementById("root")
);
