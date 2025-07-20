import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../services/api";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

      loginAdmin(username, password)
          .then((response) => {
              const token = response.data.token;
              if (token) {
                  sessionStorage.setItem("token", token);
                  navigate("/admin");
              } else {
                  setError("Invalid response from server");
              }
          })
          .catch((err) => {
              setError(err.response?.data?.message || "Invalid username or password");
          })
          .finally(() => setLoading(false));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md p-8 bg-gray-100 rounded-lg shadow-lg"
      >
        <h2 className="mb-6 text-3xl font-bold text-center">Admin Login</h2>
        {error && <p className="mb-4 text-center text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter username"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 font-semibold">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter password"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-bold text-white uppercase ${
            loading
              ? "bg-green-400 cursor-not-allowed"
              : "bg-[#00B425] cursor-pointer hover:bg-green-600"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
