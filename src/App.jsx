import LandingPage from "./pages/LandingPage"
import RegistrationPage from "./pages/RegisterPage"
import { Routes, Route } from "react-router-dom"
import Header from './components/Header';
import Footer from "./components/Footer";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegistrationPage />} />
      </Routes>
      <Footer/>
    </>
  );
}
export default App
