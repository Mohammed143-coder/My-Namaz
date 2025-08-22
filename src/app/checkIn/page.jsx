"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AiOutlineUser,
  AiOutlineLock,
  AiOutlineEnvironment,
} from "react-icons/ai";
import { MdOutlineMosque } from "react-icons/md";

export default function AdminPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const handleSubmit = (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const masjidName = formData.get("masjidName");
    const masjidLocation = formData.get("masjidLocation");
    console.log("Login form submitted", username, password);
    if (username === "admin" && password === "admin") {
      router.push(`/checkIn/${username}`);
    } 
    else if(username === "dev" && password === "dev"){
      router.push(`/checkIn/${password}`);
    }

    else if (
      username &&
      password &&
      confirmPassword &&
      masjidName &&
      masjidLocation
    ) {
      router.push(`/checkIn/${username}`);
    } else {
      alert("Please fill all fields correctly");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-black ">
      <div className="w-full max-w-md p-8 border border-black rounded-lg shadow-md mx-4 md:mx-0">
        <h1 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Admin Login" : "Create Account"}
        </h1>
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

          {/* Confirm Password (Sign Up only) */}
          {!isLogin && (
            <div className="mb-4 flex items-center border border-black rounded px-3 py-2">
              <AiOutlineLock className="mr-2 text-gray-700" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full bg-transparent outline-none"
              />
            </div>
          )}

          {/* Masjid Name (Sign Up only) */}
          {!isLogin && (
            <div className="mb-4 flex items-center border border-black rounded px-3 py-2">
              <MdOutlineMosque className="mr-2 text-gray-700" />
              <input
                type="text"
                name="masjidName"
                placeholder="Masjid Name"
                className="w-full bg-transparent outline-none"
              />
            </div>
          )}

          {/* Masjid Location (Sign Up only) */}
          {!isLogin && (
            <div className="mb-4 flex items-center border border-black rounded px-3 py-2">
              <AiOutlineEnvironment className="mr-2 text-gray-700" />
              <input
                type="text"
                name="masjidLocation"
                placeholder="Masjid Location"
                className="w-full bg-transparent outline-none"
              />
            </div>
          )}

          {/* Submit Button */}
          <button className="w-full  bg-black text-white py-2 rounded hover:bg-gray-800 transition">
            {isLogin ? "Login" : "Sign Up"}
          </button>

          {/* Switch between Login / Sign Up */}
          <p className="text-center text-sm mt-4">
            {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
            <button className="underline" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
