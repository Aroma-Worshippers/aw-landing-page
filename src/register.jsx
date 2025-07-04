import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import RegistrationPage from "./pages/RegisterPage.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Header />
    <RegistrationPage />
    <Footer />
  </React.StrictMode>
);
