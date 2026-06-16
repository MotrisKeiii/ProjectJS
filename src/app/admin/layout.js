import AdminHeader from "@/components/admin/AdminHeader";
import Sidebar from "@/components/admin/Sidebar";
import Footer from "@/components/shop/Footer";

export default function AdminLayout({ children }) {
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
