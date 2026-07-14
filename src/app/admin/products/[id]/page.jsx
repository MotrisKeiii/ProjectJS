"use client";

import ProductForm from "@/components/admin/ProductForm";
import { getProductById, updateProduct } from "@/services/productService";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const toDateTimeLocal = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
};

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct({ ...data, launch_date: toDateTimeLocal(data.launch_date) });
      } catch (err) {
        setError(err?.message || "Không tải được sản phẩm");
      }
    };
    if (id) fetchProduct();
  }, [id]);

  if (error) return <p className="text-red-600">{error}</p>;
  if (!product) return <p>Đang tải sản phẩm...</p>;

  return (
    <ProductForm
      title={`Sửa sản phẩm #${id}`}
      submitLabel="Cập nhật sản phẩm"
      initialData={product}
      onSubmit={async (data) => {
        await updateProduct(data, id);
        router.push("/admin/products");
      }}
    />
  );
}
