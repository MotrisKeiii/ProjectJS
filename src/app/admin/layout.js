'use client';

import AdminHeader from '@/components/admin/AdminHeader';
import Sidebar from '@/components/admin/Sidebar';
import Footer from '@/components/shop/Footer';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthProvider';

export default function AdminLayout({ children }) {
  const { user, authLoading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (authLoading) return;

    if (!user || user.user_type !== 'admin') {
      router.push('/');
    }
  }, [user, authLoading, router]);

  if (authLoading) {
    return <p>Loading...</p>;
  }

  if (!user || user.user_type !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <AdminHeader />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
