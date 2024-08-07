import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";

const app = <App />;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(app);
// ReactDOM.render(app, document.getElementById("root"));