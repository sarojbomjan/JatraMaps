import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import MachindranathImage from "../assets/Machindranath.jpg";
import axios from "axios";

const Login = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    setError(null); 

    try{
      const response = await axios.post("http://localhost:5000/users/login", formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("Success", response.data);

      if (response.data) {
        // store tokens and user data
        localStorage.setItem('accessToken', response.data.accessToken); 
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // navigate to dashboard
        navigate('/dashboard');
      }
    } catch (error){
      console.log("Login error: ", error);
      setError(
        error.response?.data?.msg || error.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-900">
      <div className="w-full max-w-4xl flex flex-col md:flex-row rounded-xl overflow-hidden shadow-xl bg-slate-800">
        
        {/* Left: Image Section */}
        <div className="relative w-full md:w-1/2 h-60 md:h-auto">
          <div className="absolute inset-0 bg-black/30 flex items-start p-4">
            <h2 className="text-white text-xl font-semibold bg-black/40 px-3 py-1 rounded-md">JatraMaps</h2>
          </div>
          <img src={MachindranathImage} alt="Machindranath festival" className="w-full h-full object-cover" />
        </div>

        {/* Right: Login Form */}
        <div className="w-full md:w-1/2 p-6 md:p-10">
          <h1 className="text-white text-2xl font-semibold">Login to your account</h1>
          <p className="text-slate-400 text-sm mt-1">
            Don't have an account?{" "}
            <Link to="/signUp" className="text-orange-500 hover:underline">Sign up</Link>
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

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-3 py-2 rounded bg-slate-700 border border-slate-600 text-white focus:ring-2 focus:ring-orange-500"
              required
            />

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center space-x-2 text-slate-300">
                <input type="checkbox" className="w-4 h-4 text-orange-500 bg-slate-700 border-slate-600 focus:ring-orange-500" />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-orange-500 hover:underline">Forgot password?</Link>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-md font-medium transition"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-600"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase bg-slate-800 px-2 text-slate-400">
              Or continue with
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          
            <button className="flex items-center justify-center py-2 bg-slate-700 hover:bg-slate-600 rounded text-white transition">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
              </svg>
              Google
            </button>

            <button className="flex items-center justify-center py-2.5 px-4 bg-slate-700 hover:bg-slate-600 rounded-md text-white transition-colors duration-200">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.987H7.898v-2.892h2.54V9.689c0-2.507 1.493-3.89 3.777-3.89 1.095 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.776-1.63 1.572v1.89h2.773l-.443 2.892h-2.33v6.987C18.343 21.128 22 16.991 22 12z" />
              </svg>
               Facebook
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
