import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { FaSquareXTwitter, FaGithub } from 'react-icons/fa6';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';

const LoginModal = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-20 right-10 w-96 p-6 bg-white dark:bg-gray-800 text-white rounded-lg border-2 border-dashed border-[#3C5A68] shadow-lg z-50 ">
      <div className="flex justify-between items-center">
        <h2 className="text-xl text-yellow-500 font-bold">Welcome back!</h2>
        <button onClick={onClose} aria-label="Close Login">
          <AiOutlineClose size={24} />
        </button>
      </div>
      <div className="mt-4 space-y-3">
        <button className="w-full bg-[#072533] text-white flex items-center gap-2 p-2 border rounded">
          <FcGoogle size={20} /> Log in with Google
        </button>

        {/* Line separator */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-t border-[#3C5A68]" />
          <span className="mx-2 text-gray-500">or</span>
          <hr className="flex-grow border-t border-[#3C5A68]" />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="w-full p-2 bg-[#072533] border rounded"
            placeholder="Enter your email"
          />
        </div>

        <div className="relative">
          <label className="block mb-1">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="w-full p-2 bg-[#072533] border rounded"
            placeholder="Password"
          />
          <button
            type="button"
            className="absolute right-3 top-9 text-gray-500"
            onClick={togglePassword}
            aria-label="Toggle Password Visibility"
          >
            {showPassword ? (
              <IoEyeOffOutline size={20} />
            ) : (
              <IoEyeOutline size={20} />
            )}
          </button>
        </div>

        <div className="flex justify-between items-center text-sm">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Remember me
          </label>
          <a href="#" className="text-blue-500">
            Forgot password?
          </a>
        </div>

        <button className="w-full mt-4 p-2 bg-blue-500 text-white rounded">
          Log in
        </button>
        <p className="mt-3 text-center text-sm">
          Don’t have an account?{" "}
          <a href="#" className="text-blue-500">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;