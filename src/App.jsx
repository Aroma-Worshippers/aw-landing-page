import LandingPage from "./pages/LandingPage"
import RegistrationPage from "./pages/RegisterPage"
import AttendancePage from "./pages/AttendancePage"
import { Routes, Route } from "react-router-dom"
import Header from './components/Header';
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/admin" element={<AttendancePage />} />
        <Route path="/login" element={<LoginPage/>}/>
      </Routes>
      <Footer/>
    </>
  );
}
export default App
