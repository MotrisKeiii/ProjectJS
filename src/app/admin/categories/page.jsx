"use client";

import AdminTable from "@/components/admin/AdminTable";
import { deleteCategory, getCategories } from "@/services/categoryService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const columns = [
  { key: "cat_id", label: "ID", width: "w-20" },
  { key: "cat_name", label: "Tên danh mục" },
  { key: "alias", label: "Alias" },
  { key: "image", label: "Hình ảnh" },
  { key: "status", label: "Trạng thái", width: "w-28" },
];

export default function AdminCategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getCategories({ trash: 0 });
      setCategories(Array.isArray(response) ? response : response?.data || []);
    } catch (err) {
      setError(err?.message || "Không tải được danh mục");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleDelete = async (category) => {
    if (!window.confirm(`Bạn có chắc muốn xoá "${category.cat_name}" không?`)) return;
    try {
      await deleteCategory(category.cat_id);
      setMessage("Xoá danh mục thành công");
      await fetchCategories();
    } catch (err) {
      setError(err?.message || "Xoá danh mục thất bại");
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quản lý danh mục</h1>
        <Link href="/admin/categories/create" className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">
          Thêm danh mục
        </Link>
      </div>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      {error && <p className="mb-4 text-red-600">{error}</p>}
      {loading ? (
        <p>Đang tải danh mục...</p>
      ) : (
        <AdminTable columns={columns} data={categories} onEdit={(category) => router.push(`/admin/categories/${category.cat_id}`)} onDelete={handleDelete} />
      )}
    </div>
  );
}
