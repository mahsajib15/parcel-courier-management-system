// src/app/layout.js
import Navbar from '@/components/Shared/Navbar';
import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'Courier System',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-right" reverseOrder={false} />
        <Navbar />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
