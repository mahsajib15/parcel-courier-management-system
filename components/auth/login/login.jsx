"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaGoogle, FaPhone } from "react-icons/fa";
import supabase from "@/lib/supabaseClient";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const { data: userProfile } = await supabase
        .from("user_profile")
        .select("*")
        .eq("email", email)
        .single();

      if (!userProfile) {
        setErrorMsg("User not found");
        return;
      }

      if (userProfile.password !== password) {
        setErrorMsg("Invalid password");
        return;
      }

      toast.success("Login successful!");

      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      const expires = new Date();
      expires.setDate(expires.getDate() + 7);
      const cookieOptions = `expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
      
      document.cookie = `token=${userProfile.id}; ${cookieOptions}`;
      document.cookie = `userRole=${userProfile.role}; ${cookieOptions}`;

      console.log("Setting cookies:", {
        token: userProfile.id,
        userRole: userProfile.role
      });

      const userData = {
        id: userProfile.id,
        email: userProfile.email,
        role: userProfile.role,
        full_name: userProfile.full_name,
      };

      localStorage.setItem("user", JSON.stringify(userData));

      window.dispatchEvent(new Event("storage"));

      setTimeout(() => {
        const role = userProfile.role.toLowerCase();
        if (role === "admin") {
          router.push("/admin/dashboard");
        } else if (role === "delivery agent") {
          router.push("/agent/dashboard");
        } else {
          router.push("/customer/dashboard");
        }
      }, 100);
    } catch (err) {
      console.error("Login error:", err);
      setErrorMsg("Something went wrong");
    }
  };

  const handleGoogleLogin = () => alert("Redirecting to Google Login (Not implemented)");
  const handlePhoneLogin = () => alert("Redirecting to Phone Login (Not implemented)");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
          Courier Management System
        </h2>

        {errorMsg && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm mb-1 text-gray-600">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-600">Password</label>
            <input
              type="password"
              placeholder="********"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/auth/registration">
            <span className="text-blue-600 hover:underline font-medium">Register</span>
          </Link>
        </p>

        <div className="flex items-center gap-2 my-6">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 border py-2 rounded hover:bg-gray-100 transition"
        >
          <FaGoogle className="text-red-500" />
          <span>Continue with Google</span>
        </button>

        <button
          type="button"
          onClick={handlePhoneLogin}
          className="mt-2 w-full flex items-center justify-center gap-2 border py-2 rounded hover:bg-gray-100 transition"
        >
          <FaPhone className="text-green-600" />
          <span>Register with Phone</span>
        </button>
      </div>
    </div>
  );
}
