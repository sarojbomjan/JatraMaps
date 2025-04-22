import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function VerifyEmailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");

  // Get email from navigation state (passed from SignUp)
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    } else {
      // If no email, redirect back to signup
      navigate("/signup");
    }
  }, [location.state, navigate]);

  const handleVerification = async (e) => {
    e.preventDefault();

    if (!verificationCode.trim() || verificationCode.length !== 6) {
      setErrorMessage("Please enter a valid 6-digit code");
      setVerificationStatus("error");
      return;
    }

    setIsVerifying(true);

    try {
      const response = await axios.post(`http://localhost:5000/verify`, {
        email,
        code: verificationCode,
      });

      if (response.data.success) {
        setVerificationStatus("success");
        toast.success("Email verified successfully!");
        setTimeout(() => navigate("/login"), 200);
      } else {
        setErrorMessage(response.data.message || "Verification failed");
        setVerificationStatus("error");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Verification failed");
      setVerificationStatus("error");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    try {
      await axios.post("http://localhost:5000/resend-verification", { email });
      toast.success("Verification code resent to your email!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend code");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center mb-2">
          Verify Your Email
        </h1>
        <p className="text-sm text-center text-gray-600 mb-4">
          We sent a verification code to <strong>{email}</strong>. Enter the
          6-digit code below.
        </p>

        {verificationStatus === "success" && (
          <div className="mb-4 p-4 border border-green-200 bg-green-50 text-green-700 rounded-md">
            <strong>Email Verified!</strong> Redirecting to login...
          </div>
        )}

        {verificationStatus === "error" && (
          <div className="mb-4 p-4 border border-red-200 bg-red-50 text-red-700 rounded-md">
            <strong>Error:</strong> {errorMessage}
          </div>
        )}

        <form onSubmit={handleVerification} className="space-y-4">
          <div className="grid grid-cols-6 gap-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={verificationCode[index] || ""}
                className="w-full text-center p-2 border border-gray-300 rounded"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.match(/^[0-9]$/) || value === "") {
                    const newCode = verificationCode.split("");
                    newCode[index] = value;
                    setVerificationCode(newCode.join(""));

                    if (value && index < 5) {
                      const nextInput = document.getElementById(
                        `digit-${index + 1}`
                      );
                      if (nextInput) nextInput.focus();
                    }
                  }
                }}
                onKeyDown={(e) => {
                  if (
                    e.key === "Backspace" &&
                    !verificationCode[index] &&
                    index > 0
                  ) {
                    const prevInput = document.getElementById(
                      `digit-${index - 1}`
                    );
                    if (prevInput) prevInput.focus();
                  }
                }}
                id={`digit-${index}`}
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={
              verificationCode.length !== 6 ||
              isVerifying ||
              verificationStatus === "success"
            }
          >
            {isVerifying ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        <div className="text-center text-sm mt-4">
          <span className="text-gray-500">Didn't receive a code? </span>
          <button
            type="button"
            className="text-blue-600 hover:underline"
            onClick={handleResendCode}
          >
            Resend Code
          </button>
        </div>
      </div>
    </div>
  );
}
