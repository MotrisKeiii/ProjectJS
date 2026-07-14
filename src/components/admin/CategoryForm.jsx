"use client";

import UploadSingleFile from "@/components/admin/Upload";
import Link from "next/link";
import { useState } from "react";

const emptyCategory = {
  cat_name: "",
  alias: "",
  image: "",
  parent_id: 0,
  trash: 0,
  status: 1,
};

export default function CategoryForm({ initialData = emptyCategory, onSubmit, title, submitLabel }) {
  const [formData, setFormData] = useState({ ...emptyCategory, ...initialData });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: name === "trash" || name === "status" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = {};

    const categoryName = String(formData.cat_name ?? "").trim();
    const alias = String(formData.alias ?? "").trim();
    const image = String(formData.image ?? "").trim();

    if (!categoryName) nextErrors.cat_name = "Vui lòng nhập tên danh mục";
    if (!alias) nextErrors.alias = "Vui lòng nhập alias";
    else if (!/^[a-z0-9-]+$/.test(alias)) {
      nextErrors.alias = "Alias chỉ gồm chữ thường, số và dấu gạch ngang";
    }
    if (!image) nextErrors.image = "Vui lòng upload ảnh danh mục";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    try {
      setLoading(true);
      await onSubmit({
        cat_name: categoryName,
        alias,
        image,
        parent_id: 0,
        trash: formData.trash,
        status: formData.status,
      });
    } catch (error) {
      setErrors({ message: error?.data?.error || error?.message || "Có lỗi xảy ra" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-5 rounded-xl bg-white p-6 shadow">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
        <Link href="/admin/categories" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
          Quay lại
        </Link>
      </div>

      {errors.message && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{errors.message}</p>}

      <div>
        <label className="mb-1 block text-sm font-medium">Tên danh mục</label>
        {errors.cat_name && <p className="mb-1 text-sm text-red-500">{errors.cat_name}</p>}
        <input name="cat_name" value={formData.cat_name ?? ""} onChange={handleChange} className="w-full rounded-lg border px-3 py-2" />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Alias</label>
        {errors.alias && <p className="mb-1 text-sm text-red-500">{errors.alias}</p>}
        <input name="alias" value={formData.alias ?? ""} onChange={handleChange} className="w-full rounded-lg border px-3 py-2" placeholder="vi-du-danh-muc" />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Hình ảnh</label>
        {errors.image && <p className="mb-1 text-sm text-red-500">{errors.image}</p>}
        <input name="image" value={formData.image ?? ""} onChange={handleChange} className="mb-3 w-full rounded-lg border px-3 py-2" />
        <UploadSingleFile onUploadSuccess={(image) => setFormData((current) => ({ ...current, image }))} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Trash</label>
          <select name="trash" value={formData.trash ?? 0} onChange={handleChange} className="w-full rounded-lg border px-3 py-2">
            <option value={0}>Chưa xoá</option>
            <option value={1}>Đã xoá</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Trạng thái</label>
          <select name="status" value={formData.status ?? 1} onChange={handleChange} className="w-full rounded-lg border px-3 py-2">
            <option value={1}>Hiển thị</option>
            <option value={0}>Ẩn</option>
          </select>
        </div>
      </div>

      <button type="submit" disabled={loading} className="w-full rounded-lg bg-blue-600 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:opacity-50">
        {loading ? "Đang xử lý..." : submitLabel}
      </button>
    </form>
  );
}
