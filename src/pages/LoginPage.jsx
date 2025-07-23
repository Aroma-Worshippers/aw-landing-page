import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../services/api";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setError("");
    setLoading(true);

    loginAdmin(username, password)
      .then((res) => {
        console.log(res.data);
        if (res.data.message === "Successfully logged in!") {
          sessionStorage.setItem("isLoggedIn", "true");
          navigate("/admin");
        } else {
          setError("Login failed. Please try again.");
        }
      })
      .catch(() => {
        setError("Login failed. Please check your credentials.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-center text-green-700">
          Admin Login
        </h1>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
            placeholder="Enter username"
          />
        </div>

        <div className="relative mb-6">
          <label className="block mb-2 font-semibold">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 pr-12 border rounded-lg focus:ring-2 focus:ring-green-500"
            placeholder="Enter password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute text-green-600 top-12 right-3"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {error && <p className="mb-4 text-red-600">{error}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-3 font-semibold text-white transition bg-green-600 rounded-lg hover:bg-green-700"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
