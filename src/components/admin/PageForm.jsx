"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthProvider";

const emptyPage = { title: "", content: "", status: 1 };

export default function PageForm({ initialData = emptyPage, onSubmit, title, submitLabel }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ ...emptyPage, ...initialData });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: name === "status" ? Number(value) : value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = {};
    const pageTitle = formData.title.trim();
    const content = formData.content.trim();
    if (!pageTitle) nextErrors.title = "Vui lòng nhập tiêu đề";
    if (!content) nextErrors.content = "Vui lòng nhập nội dung";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    try {
      setLoading(true);
      await onSubmit({
        title: pageTitle,
        content,
        created_by: initialData.created_by || user?.user_id,
        status: formData.status,
      });
    } catch (error) {
      setErrors({ message: error?.data?.error || error?.message || "Không thể lưu trang" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-4xl space-y-5 rounded-xl bg-white p-6 shadow">
      <div className="flex items-center justify-between gap-4"><h1 className="text-2xl font-bold text-slate-800">{title}</h1><Link href="/admin/pages" className="text-sm font-semibold text-blue-600">Quay lại</Link></div>
      {errors.message && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{errors.message}</p>}
      <div><label className="mb-1 block text-sm font-medium">Tiêu đề</label>{errors.title && <p className="mb-1 text-sm text-red-500">{errors.title}</p>}<input name="title" value={formData.title} onChange={handleChange} className="w-full rounded-lg border px-3 py-2" /></div>
      <div><label className="mb-1 block text-sm font-medium">Nội dung</label>{errors.content && <p className="mb-1 text-sm text-red-500">{errors.content}</p>}<textarea name="content" rows={14} value={formData.content} onChange={handleChange} className="w-full rounded-lg border px-3 py-2" /></div>
      <div><label className="mb-1 block text-sm font-medium">Trạng thái</label><select name="status" value={formData.status} onChange={handleChange} className="w-full rounded-lg border px-3 py-2"><option value={1}>Hiển thị</option><option value={0}>Ẩn</option></select></div>
      <button disabled={loading} className="w-full rounded-lg bg-blue-600 py-2.5 font-semibold text-white disabled:opacity-50">{loading ? "Đang xử lý..." : submitLabel}</button>
    </form>
  );
}
