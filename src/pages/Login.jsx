import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "react-feather";
import "../index.css";
import MachindranathImage from "../assets/Machindranath.jpg";
import axios from "axios";
import { useAuth } from "../utils/authContext";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    const savedPassword = localStorage.getItem("rememberedPassword");
    if (savedEmail && savedPassword) {
      setFormData({ email: savedEmail, password: savedPassword });
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Success", response.data);

      if (response.data) {
        login(response.data.user, {
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        });

        if (rememberMe) {
          localStorage.setItem("rememberedEmail", formData.email);
          localStorage.setItem("rememberedPassword", formData.password);
        } else {
          localStorage.removeItem("rememberedEmail");
          localStorage.removeItem("rememberedPassword");
        }

        toast.success("Login Sucessfull");

        const userRole = response.data.user?.role?.toLowerCase();
        switch (userRole) {
          case "admin":
            navigate("/admin/dashboard");
            break;
          case "moderator":
            navigate("/moderator/dashboard");
            break;
          case "customer":
            navigate("/customer/dashboard");
            break;
          default:
            navigate("/dashboard");
        }
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please try again.";
      setError(errorMessage);

      // Show error toast based on the error type
      if (error.response?.status === 401) {
        if (
          error.response.data.message === "User with this email doesn't exist"
        ) {
          toast.error("User with this email doesn't exist");
        } else if (error.response.data.message === "Incorrect password") {
          toast.error("Incorrect password");
        }
      } else {
        toast.error("Login Failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-800 dark:bg-gray-400">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="w-full max-w-4xl flex flex-col md:flex-row rounded-xl overflow-hidden shadow-xl bg-slate-800">
        <div className="relative w-full md:w-1/2 h-60 md:h-auto">
          <div className="absolute inset-0 bg-black/30 flex items-start p-4">
            <h2 className="text-white text-xl font-semibold bg-black/40 px-3 py-1 rounded-md">
              JatraMaps
            </h2>
          </div>
          <img
            src={MachindranathImage}
            alt="Machindranath festival"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 p-6 md:p-10">
          <h1 className="text-white text-2xl font-semibold">
            Login to your account
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Don't have an account?{" "}
            <Link to="/signUp" className="text-orange-500 hover:underline">
              Sign up
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-3 py-2 rounded bg-slate-700 border border-slate-600 text-white focus:ring-2 focus:ring-orange-500"
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-3 py-2 rounded bg-slate-700 border border-slate-600 text-white focus:ring-2 focus:ring-orange-500 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center space-x-2 text-slate-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleRememberMe}
                  className="w-4 h-4 text-orange-500 bg-slate-700 border-slate-600 focus:ring-orange-500"
                />
                <span>Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-orange-500 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-md font-medium transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
