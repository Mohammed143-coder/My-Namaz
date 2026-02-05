"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AiOutlineUser,
  AiOutlineLock,
  AiOutlineEnvironment,
} from "react-icons/ai";
import { LuMail } from "react-icons/lu";
import { MdOutlineMosque } from "react-icons/md";
import { BiShieldQuarter } from "react-icons/bi";

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Form, 2: OTP
  const [formDataState, setFormDataState] = useState(null); // Store email for OTP
  const [otp, setOtp] = useState("");

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      const userName = formData.get("username");
      const userEmail = formData.get("useremail");
      const password = formData.get("password");
      const masjidName = formData.get("masjidName");
      const masjidLocation = formData.get("masjidLocation");

      const signupRes = await axios.post("/api/signUp", {
        userName,
        userEmail,
        password,
        masjid: masjidName,
        masjidLocation,
      });

      if (signupRes.data.success) {
        console.info("SignUp Initial Success, waiting for OTP");
        setFormDataState({ userEmail }); // Save email for verification
        setStep(2); // Move to OTP step
      } else {
        alert("Failed to Signup: " + signupRes.data.message);
      }
    } catch (error) {
      console.error(error.message);
      alert(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("/api/verify-email", {
        email: formDataState.userEmail,
        otp,
      });

      if (res.data.success) {
        alert("Email Verified Successfully! Please Login.");
        router.push("/login");
      } else {
        alert("Verification Failed: " + res.data.message);
      }
    } catch (error) {
      console.error(error.message);
      alert(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-black p-4">
      <div className="w-full max-w-md p-8 border border-black rounded-lg shadow-md mx-4 md:mx-0">
        <h1 className="text-2xl font-bold text-center mb-6">
          {step === 1 ? "Create Account" : "Verify Email"}
        </h1>

        {step === 1 ? (
          <form action={handleSubmit}>
            {/* Username */}
            <div className="mb-4 flex items-center border border-black rounded px-3 py-2">
              <AiOutlineUser className="mr-2 text-gray-700" />
              <input
                type="text"
                required
                name="username"
                placeholder="Username"
                className="w-full bg-transparent outline-none"
              />
            </div>
            <div className="mb-4 flex items-center border border-black rounded px-3 py-2">
              <LuMail className="mr-2 text-gray-700" />
              <input
                type="email"
                required
                name="useremail"
                placeholder="Email"
                className="w-full bg-transparent outline-none"
              />
            </div>

            {/* Password */}
            <div className="mb-4 flex items-center border border-black rounded px-3 py-2">
              <AiOutlineLock className="mr-2 text-gray-700" />
              <input
                type="password"
                name="password"
                required
                placeholder="Password"
                className="w-full bg-transparent outline-none"
              />
            </div>

            {/* Masjid Name */}
            <div className="mb-4 flex items-center border border-black rounded px-3 py-2">
              <MdOutlineMosque className="mr-2 text-gray-700" />
              <input
                type="text"
                name="masjidName"
                required
                placeholder="Masjid Name"
                className="w-full bg-transparent outline-none"
              />
            </div>

            {/* Masjid Location */}
            <div className="mb-4 flex items-center border border-black rounded px-3 py-2">
              <AiOutlineEnvironment className="mr-2 text-gray-700" />
              <input
                type="text"
                name="masjidLocation"
                required
                placeholder="Masjid Location"
                className="w-full bg-transparent outline-none"
              />
            </div>

            {/* Submit Button */}
            {loading ? (
              <button
                disabled
                className="w-full py-2 bg-gray-800 text-white rounded opacity-70 cursor-not-allowed"
              >
                Processing...
              </button>
            ) : (
              <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
                Sign Up
              </button>
            )}

            {/* Switch between Login / Sign Up */}
            <p className="text-center text-sm mt-4">
              Already have an account?{" "}
              <button
                type="button"
                className="underline"
                onClick={() => router.push("/login")}
              >
                Login
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <p className="text-center text-sm mb-4 text-gray-600">
              We have sent an OTP to <strong>{formDataState?.userEmail}</strong>
            </p>
            {/* OTP Input */}
            <div className="mb-6 flex items-center border border-black rounded px-3 py-2">
              <BiShieldQuarter className="mr-2 text-gray-700" />
              <input
                type="text"
                required
                placeholder="Enter 6-digit OTP"
                className="w-full bg-transparent outline-none tracking-widest text-center text-lg font-bold"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
              />
            </div>

            {loading ? (
              <button
                disabled
                className="w-full py-2 bg-gray-800 text-white rounded opacity-70 cursor-not-allowed"
              >
                Verifying...
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
              >
                Verify OTP
              </button>
            )}
            <button
              type="button"
              className="w-full mt-2 text-sm text-gray-600 hover:underline"
              onClick={() => setStep(1)}
            >
              Back
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
