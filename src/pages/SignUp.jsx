import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "react-feather"; // Import Feather icons
import "../index.css";
import MachindranathImage from "../assets/Machindranath.jpg";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const userData = {
        username: formData.name,
        email: formData.email,
        password: formData.password,
      };

      const response = await axios.post("http://localhost:5000/register", userData);

      if (response.data) {
        toast.success("Registration Successful! Redirecting...");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (e) {
      toast.error(e.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-800 dark:bg-gray-400">
      <Toaster position="top-center" />

      <div className="w-full max-w-5xl flex flex-col md:flex-row rounded-xl overflow-hidden shadow-2xl">
        
        {/* Image Section */}
        <div className="relative w-full md:w-1/2 h-56 sm:h-64 md:h-auto">
          <div className="absolute inset-0 bg-black/30 flex items-start p-4">
            <h2 className="text-white font-semibold text-xl bg-black/40 px-3 py-1 rounded-md">
              JatraMaps
            </h2>
          </div>
          <img src={MachindranathImage} alt="Machindranath festival" className="w-full h-full object-cover" />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-6 bg-slate-800">
          <h1 className="text-white text-2xl font-medium">Create Your Account</h1>
          <p className="text-slate-400 text-sm mt-1">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-500 hover:underline">
              Log in
            </Link> 
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Full Name Field */}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-md"
              required
            />

            {/* Email Field */}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-md"
              required
            />

            
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-md pr-10"
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

            
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-md pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-white"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-md font-medium transition ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
