
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";


export default function Login() {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const numtable = searchParams.get("numtable");
  const redirectPath = searchParams.get("redirect");


  const loginUser = async (formData) => {
    const user = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await fetch("http://localhost:8000/ELACO/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
        credentials: "include",
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.message || "Login failed. Please check your credentials.");
      }


      toast.success("Login successful! Redirecting...", { autoClose: 100 });

      setTimeout(() => {
        if (redirectPath) window.location.href = redirectPath;
        else if (numtable) window.location.href = `/booking?numtable=${numtable}`;
        else window.location.href = "/dashboard1/profile";
      }, 10);
      
    } catch (err) {
      const errorMsg = err.message;

      if (errorMsg.toLowerCase().includes("email")) setEmailError(errorMsg);
      else if (errorMsg.toLowerCase().includes("password")) setPasswordError(errorMsg);
      else setGeneralError(errorMsg);

      toast.error(errorMsg);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* LEFT SIDE - FORM */}
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-gradient-to-br from-white via-white to-blue-gray-50 rounded-bl-[60px] md:rounded-bl-[80px]">
        <Link href="/" className="text-gray-500 mb-6 hover:text-black transition inline-flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </Link>

        <h1 className="text-3xl font-bold mb-2 text-blue-gray-900">Welcome Back</h1>
        <p className="text-blue-gray-600 mb-8">Log in to your Elaco account</p>

        {generalError && <p className="text-red-500 mb-4">{generalError}</p>}

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            await loginUser(formData);
          }}
        >
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className={`px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#07ebbd] focus:border-transparent w-full ${emailError ? "border-red-500" : ""}`}
          />
          {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className={`px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#07ebbd] focus:border-transparent w-full mt-4 ${passwordError ? "border-red-500" : ""}`}
          />
          {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}

          <div className="flex justify-end mt-2">
            <Link href="/forgotpassword" className="text-sm text-gray-500 hover:text-[#07ebbd]">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="bg-gray-900 hover:bg-black text-white py-3 rounded-xl w-full mt-6 font-medium shadow-md hover:shadow-lg transition"
          >
            Login
          </button>
        </form>

        <button
          type="button"
          onClick={() => window.location.href = "http://localhost:8000/auth/google"}
          className="flex items-center justify-center gap-2 border border-gray-300 py-3 mt-4 rounded-lg font-medium hover:bg-gray-50 transition w-full"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Login with Google
        </button>

        <p className="text-sm text-gray-600 text-center mt-6">
          Don't have an account?{" "}
          <Link href="/signup" className="text-[#07ebbd] font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>

      {/* RIGHT SIDE - INFO */}
      <div className="hidden md:flex md:w-1/2 bg-gray-900 text-white relative overflow-hidden">
        {/* Background image + overlay */}
        <div className="absolute inset-0 bg-cover bg-center opacity-10 blur-sm z-0" style={{ backgroundImage: "url('/coo.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-[#07ebbd]/20 z-0" />

        <div className="flex flex-col justify-between w-full p-16 relative z-10">
          <div className="mb-12">
            <h3 className="text-xl font-bold text-[#07ebbd]">ELACO</h3>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">
              Welcome to ELACO <span className="text-[#07ebbd]">working space</span>
            </h2>

            <p className="text-gray-300 mb-12">
              A flexible space to build, create, and connect. Designed for 
              freelancers, startups, and teams that thrive on inspiration.
            </p>

            <div className="space-y-6">
              {[
                { emoji: "🚀", text: "24/7 Access — work when you're inspired, anytime." },
                { emoji: "🤝", text: "Community events — grow your network effortlessly." },
                { emoji: "⚡", text: "Fast Wi-Fi — no lag, just flow." },
                { emoji: "☕", text: "Free coffee & tea — always brewing creativity." },
              ].map(({ emoji, text }) => (
                <div key={text} className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#07ebbd]/10 flex items-center justify-center mr-4">
                    <span className="text-[#07ebbd]">{emoji}</span>
                  </div>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-sm text-gray-400 mt-12">© 2025 ELACO</p>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
