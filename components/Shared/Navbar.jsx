"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    const checkUser = () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };

    checkUser();

    window.addEventListener("storage", checkUser);
    return () => window.removeEventListener("storage", checkUser);
  }, []);

  const handleLogout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    document.cookie = 'userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';

    localStorage.removeItem('user');
    setUser(null);
    router.push('/auth/login');
  };

  let dashboardPath = "#";
  const role = user?.role?.toLowerCase();
  if (role === "admin") {
    dashboardPath = "/admin/dashboard";
  } else if (role === "customer") {
    dashboardPath = "/customer/dashboard";
  } else if (role === "delivery agent") {
    dashboardPath = "/agent/dashboard";
  }

  return (
    <nav className="bg-gray-900 text-white px-6 py-3">
      <div className="flex justify-between items-center">
        <Link href="/" className="font-bold text-lg">
          Courier
        </Link>

        <div className="space-x-4 flex items-center">
          <Link href="/">Home</Link>

          {/* Role-based Dashboard button */}
          {user && user.role && (
            <Link href={dashboardPath}>
              <button className="bg-green-600 hover:bg-green-500 text-white cursor-po px-3 py-1 rounded">
                Go to Dashboard
              </button>
            </Link>
          )}

          {/* Login / Profile & Logout */}
          {!user ? (
            <Link
              href="/auth/login"
              className="bg-blue-600 px-3 py-1 cursor-pointer rounded hover:bg-blue-500"
            >
              Login
            </Link>
          ) : (
            <div className="flex items-center space-x-2">
              {/* Placeholder profile circle */}
              <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center text-sm uppercase">
                {user.full_name?.charAt(0) || "U"}
              </div>

              {/* Name */}
              <span>{user.full_name || "User"}</span>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="bg-red-600 px-2 py-1 rounded hover:bg-red-500 cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
