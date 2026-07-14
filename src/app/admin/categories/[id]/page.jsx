"use client";

import CategoryForm from "@/components/admin/CategoryForm";
import { getCategoryById, updateCategory } from "@/services/categoryService";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditCategoryPage() {
  const { id } = useParams();
  const router = useRouter();
  const [category, setCategory] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setCategory(await getCategoryById(id));
      } catch (err) {
        setError(err?.message || "Không tải được danh mục");
      }
    };
    if (id) fetchCategory();
  }, [id]);

  if (error) return <p className="text-red-600">{error}</p>;
  if (!category) return <p>Đang tải danh mục...</p>;

  return (
    <CategoryForm
      title={`Sửa danh mục #${id}`}
      submitLabel="Cập nhật danh mục"
      initialData={category}
      onSubmit={async (data) => {
        await updateCategory(id, data);
        router.push("/admin/categories");
      }}
    />
  );
}
