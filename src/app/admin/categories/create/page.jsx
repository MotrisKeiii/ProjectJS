"use client";

import CategoryForm from "@/components/admin/CategoryForm";
import { createCategory } from "@/services/categoryService";
import { useRouter } from "next/navigation";

export default function CreateCategoryPage() {
  const router = useRouter();

  return (
    <CategoryForm
      title="Thêm danh mục"
      submitLabel="Tạo danh mục"
      onSubmit={async (data) => {
        await createCategory(data);
        router.push("/admin/categories");
      }}
    />
  );
}
