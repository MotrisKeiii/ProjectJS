"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminTable from "@/components/admin/AdminTable";
import { deletePage, getPages } from "@/services/pageService";

const columns = [
  { key: "page_id", label: "ID", width: "w-20" },
  { key: "title", label: "Tiêu đề" },
];

export default function AdminPagesPage() {
  const router = useRouter();
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchPages = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getPages({ trash: 0 });
      setPages(Array.isArray(data) ? data : data?.data || []);
    } catch (err) {
      setError(err?.message || "Không tải được danh sách trang");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  const handleDelete = async (page) => {
    if (!window.confirm(`Bạn có chắc muốn xóa trang "${page.title}" không?`))
      return;
    try {
      await deletePage(page.page_id);
      setMessage("Xóa trang thành công");
      await fetchPages();
    } catch (err) {
      setError(err?.message || "Xóa trang thất bại");
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quản lý trang</h1>
        <Link
          href="/admin/pages/create"
          className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white"
        >
          Thêm trang
        </Link>
      </div>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      {error && <p className="mb-4 text-red-600">{error}</p>}
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <AdminTable
          columns={columns}
          data={pages}
          onEdit={(page) => router.push(`/admin/pages/${page.page_id}`)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
