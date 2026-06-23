"use client"
import { AuthProvider } from '@/context/AuthProvider';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
