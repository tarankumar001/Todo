import { useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.MODE === "production" ? "" : "http://localhost:5000";

export default function AuthModal({ show, onClose, onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const url = isLogin ? `${API_BASE}/api/auth/login` : `${API_BASE}/api/auth/register`;
      const res = await axios.post(url, { email, password });
      onAuthSuccess(res.data.token, res.data.user);
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop-simple" style={{ zIndex: 1001 }}>
      <div className="main-card bg-white rounded-2xl shadow-xl w-full max-w-sm p-8 relative" style={{ zIndex: 1002 }}>
        <button className="absolute top-4 right-4 text-gray-400 hover:text-blue-500 text-2xl font-bold" onClick={onClose}>&times;</button>
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
            className="flex-1 outline-none px-3 py-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="flex-1 outline-none px-3 py-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-lg"
          />
          {error && <div className="text-red-600 bg-red-50 rounded-md px-3 py-2 text-center text-sm font-medium">{error}</div>}
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium cursor-pointer" disabled={loading}>
            {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
          </button>
        </form>
        <div className="mt-4 text-center text-gray-500 text-sm">
          {isLogin ? (
            <span>
              New here?{' '}
              <button type="button" className="text-blue-500 hover:underline font-medium" onClick={() => setIsLogin(false)}>
                Register
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <button type="button" className="text-blue-500 hover:underline font-medium" onClick={() => setIsLogin(true)}>
                Login
              </button>
            </span>
          )}
        </div>
      </div>
      <style>{`
        .modal-backdrop-simple {
          position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
          background: rgba(30, 41, 59, 0.10); display: flex; align-items: center; justify-content: center; z-index: 1001;
        }
        /* Ensure DarkModeToggle stays above the modal if needed */
        .darkmode-toggle {
          position: fixed;
          top: 2rem;
          right: 2rem;
          z-index: 1100;
          pointer-events: auto;
        }
      `}</style>
    </div>
  );
} 