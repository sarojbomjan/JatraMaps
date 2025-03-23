"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import "../index.css"
import MachindranathImage from "../assets/Machindranath.jpg"

const Login = () => {
  const [formData, setState] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Login attempt with:", formData)
    // Add your authentication logic here
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
              <h1 className="text-white text-2xl sm:text-3xl font-medium mb-1">Login to your account</h1>
              <p className="text-slate-400 text-sm">
                Don't have an account?{" "}
                <Link to="/signUp" className="text-orange-500 hover:text-orange-400 hover:underline">
                  Sign up
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
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

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 rounded border-slate-500 bg-slate-700 text-orange-500 focus:ring-orange-500"
                  />
                  <label htmlFor="remember" className="text-sm font-medium text-slate-300">
                    Remember me
                  </label>
                </div>

                <Link href="/forgot-password" className="text-sm text-orange-500 hover:text-orange-400 hover:underline">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-md bg-orange-600 hover:bg-orange-700 text-white font-medium transition-colors duration-200"
              >
                Login
              </button>
            </form>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-600"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-800 px-2 text-slate-400">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <button className="flex items-center justify-center py-2.5 px-4 bg-slate-700 hover:bg-slate-600 rounded-md text-white transition-colors duration-200">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                </svg>
                Google
              </button>
              <button className="flex items-center justify-center py-2.5 px-4 bg-slate-700 hover:bg-slate-600 rounded-md text-white transition-colors duration-200">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login