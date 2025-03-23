import { useState } from "react"
import { Link } from "react-router-dom" 
import "../index.css"
import MachindranathImage from "../assets/Machindranath.jpg" 

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!")
      return
    }
    console.log("Sign up attempt with:", formData)
    // Add your sign-up logic here (e.g., API call to register the user)
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 md:p-6 lg:p-8">
      <div className="max-w-5xl w-full flex flex-col md:flex-row rounded-xl overflow-hidden shadow-2xl">
        {/* Image section */}
        <div className="relative w-full md:w-1/2 h-56 sm:h-64 md:h-auto">
          <div className="absolute inset-0 bg-black/20 z-10 flex items-start p-4">
            <h2 className="text-white font-semibold text-xl bg-black/30 px-3 py-1 rounded-md">JatraMaps</h2>
          </div>
          <img src={MachindranathImage} alt="Machindranath festival" className="w-full h-full object-cover" />
        </div>

        {/* Form section */}
        <div className="w-full md:w-1/2 bg-slate-800 p-5 sm:p-6 md:p-8 lg:p-10">
          <div className="space-y-5 md:space-y-6">
            <div>
              <h1 className="text-white text-2xl sm:text-3xl font-medium mb-1">Create your account</h1>
              <p className="text-slate-400 text-sm">
                Already have an account?{" "}
                <Link to="/Login" className="text-orange-500 hover:text-orange-400 hover:underline">
                  Log in
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name Field */}
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full px-3 py-2.5 rounded-md bg-slate-700 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full px-3 py-2.5 rounded-md bg-slate-700 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full px-3 py-2.5 rounded-md bg-slate-700 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Confirm Password Field */}
              <div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="w-full px-3 py-2.5 rounded-md bg-slate-700 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-md bg-orange-600 hover:bg-orange-700 text-white font-medium transition-colors duration-200"
              >
                Sign Up
              </button>
            </form>

            {/* Divider */}
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-600"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-800 px-2 text-slate-400">Or continue with</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* Google Button */}
              <button className="flex items-center justify-center py-2.5 px-4 bg-slate-700 hover:bg-slate-600 rounded-md text-white transition-colors duration-200">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                </svg>
                Google
              </button>

              {/* Facebook Button */}
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
    </div>
  )
}

export default SignUp