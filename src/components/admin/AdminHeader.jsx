export default function AdminHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Admin Panel</h2>
          <p className="text-sm text-slate-500">Quản lý sản phẩm và đơn hàng</p>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden text-sm font-semibold text-slate-600 sm:inline">Xin chào, Admin</span>
          <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:bg-blue-600">
            Đăng xuất
          </button>
        </div>
      </div>
    </header>
  );
}
