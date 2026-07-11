'use client';

import AdminHeader from '@/components/admin/AdminHeader';
import Sidebar from '@/components/admin/Sidebar';
import AdminFooter from '@/components/admin/AdminFooter';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthProvider';

export default function AdminLayout({ children }) {
  const { user, authLoading } = useContext(AuthContext);
  const router = useRouter();
  const userRole = user?.user_type ?? user?.userType ?? user?.role;
  const isAdmin = String(userRole ?? '').toLowerCase() === 'admin';

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      router.replace('/login');
    } else if (!isAdmin) {
      router.replace('/');
    }
  }, [user, authLoading, isAdmin, router]);

  if (authLoading) {
    return <p>Loading...</p>;
  }

  if (!user || !isAdmin) {
    return <p className="p-6">Checking admin permission...</p>;
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <AdminHeader />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
      <AdminFooter />
    </div>
  );
}
