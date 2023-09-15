import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/authContext/AuthContext";
import { DarkModeContextProvider } from "../src/context/darkModeContext/darkModeContext";
ReactDOM.render(
  <AuthContextProvider>  
    <DarkModeContextProvider>
      <App />
    </DarkModeContextProvider>
  </AuthContextProvider>,
  document.getElementById("root")
);
