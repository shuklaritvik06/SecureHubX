import React from "react";
import { ToastContainer } from "react-toastify";
import "./global/style.css";
import Check from "./screens/Check";
const App = () => {
  return (
    <div>
      <ToastContainer />
      <Check />
    </div>
  );
};

export default App;
