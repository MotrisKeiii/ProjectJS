"use client";

import ProductForm from "@/components/admin/ProductForm";
import { createProduct } from "@/services/productService";
import { useRouter } from "next/navigation";

export default function CreateProductPage() {
  const router = useRouter();

  return (
    <ProductForm
      title="Thêm sản phẩm"
      submitLabel="Tạo sản phẩm"
      onSubmit={async (data) => {
        await createProduct(data);
        router.push("/admin/products");
      }}
    />
  );
}
