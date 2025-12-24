import React from "react";
import { useState } from "react";
import UseContext from "../context/usercontest.jsx";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_BASE } from "../apiConfig";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserfunc, setIsLoggedInfunc } = UseContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const fetchlogin = async () => {
      try {
        const normalizedEmail = String(email).toLowerCase().trim();
        const response = await fetch(`${API_BASE}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email: normalizedEmail, password }),
        });
        const data = await response.json();
        if (response.ok) {
          toast.success("Login successful!");
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('isLoggedIn', 'true');
          setUserfunc(data.user);
          setIsLoggedInfunc(true);
          navigate('/');
        } else {
          const msg = Array.isArray(data.message) ? data.message.join(', ') : (data.message || 'Login failed');
          toast.error("Login failed: " + msg);
          setIsLoggedInfunc(false);
          if (data.message === "User not found") {
            navigate("/signup");
          } else if (data.message === "Invalid credentials") {
            navigate("/login");
          }
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Login error: " + (error.message || error));
      }
    };
    fetchlogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex flex-col justify-center px-4 sm:px-6">
      <div className="mx-auto w-full max-w-sm">
        <div className="bg-white shadow-md rounded-lg px-5 py-6">
          {/* Login Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-indigo-600">Welcome Back</h2>
            <p className="text-sm text-gray-600 mt-1">Please sign in to your account</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-gray-700">Remember me</label>
              </div>
              <button type="button" className="text-indigo-600 hover:text-indigo-500 bg-transparent border-0 p-0">
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Sign In
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Don't have an account?{" "}
              <Link to="/signup" className="text-indigo-600 hover:text-indigo-500 font-medium">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
