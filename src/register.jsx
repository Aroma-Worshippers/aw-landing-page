import React from "react";
import ReactDOM from "react-dom/client";
import StaticHeader from "./components/StaticHeader.jsx";
import StaticFooter from "./components/StaticFooter.jsx";
import RegistrationPage from "./pages/RegisterPage.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StaticHeader />
    <RegistrationPage />
    <StaticFooter />
  </React.StrictMode>
);
