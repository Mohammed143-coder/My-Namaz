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

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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

      // ✅ check backend response
      if (signupRes.data.success) {
        console.info("SignUp Successful");
        router.push("/login");
      } else {
        alert("Failed to Signup");
      }
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-black ">
      <div className="w-full max-w-md p-8 border border-black rounded-lg shadow-md mx-4 md:mx-0">
        <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>
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

          {/* Confirm Password (Sign Up only)

          <div className="mb-4 flex items-center border border-black rounded px-3 py-2">
            <AiOutlineLock className="mr-2 text-gray-700" />
            <input
              type="password"
              name="confirmPassword"
              
              placeholder="Confirm Password"
              className="w-full bg-transparent outline-none"
            />
          </div> */}

          {/* Masjid Name (Sign Up only) */}

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

          {/* Masjid Location (Sign Up only) */}

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
              type="button"
              class="w-full py-2 font-medium text-white bg-black rounded-lg border border-gray-400 hover:bg-black/95  focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 "
            >
              <svg
                aria-hidden="true"
                role="status"
                class="inline w-4 h-4 me-3 text-white animate-spin "
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="#1C64F2"
                />
              </svg>
              Signup Ing...
            </button>
          ) : (
          
            <button className="w-full  bg-black text-white py-2 rounded hover:bg-gray-800 transition">
              Sign Up
            </button>
          )}

          {/* Switch between Login / Sign Up */}
          <p className="text-center text-sm mt-4">
            Already have an account ?{" "}
            <button className="underline" onClick={() => router.push("/login")}>
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
