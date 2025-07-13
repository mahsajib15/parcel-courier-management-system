// src/app/page.js
'use client';
import LoginPage from '@/components/auth/login/login';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);


    // Load user from localStorage
  // useEffect(() => {
  //   const checkUser = () => {
  //     const userData = localStorage.getItem("user");
  //     if (userData) {
  //       setUser(JSON.parse(userData));
  //     }
  //   };

  useEffect(() => {
    const checkUser = () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
    checkUser();

    window.addEventListener("storage", checkUser);
    return () => window.removeEventListener("storage", checkUser);
  }, [])

  useEffect(() => {
    fetch('http://localhost:5000/api/test')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(() => setMessage('Failed to fetch from backend.'));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-4">Courier Management System</h1>
      {!user ? (
            <h1 className='text-center'>Please Login</h1>
          ):(
            <h1 className='text-center'>Welcome <span className='text-blue-500 font-bold'>{user.full_name}</span></h1>
          )}
    </div>
  );
}
