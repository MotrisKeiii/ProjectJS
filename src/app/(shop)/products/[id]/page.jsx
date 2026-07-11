"use client";

import ProductDetail from "@/components/shop/product/ProductDetail";
import { getProductById } from "@/services/productService";
import { use, useEffect, useState } from "react";
import Loading from "@/components/common/Loading";

export default function ProductDetailPage({ params }) {
  const { id } = use(params);
  const [product, setProduct] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setProduct(await getProductById(id));
      } catch (error) {
        setErrors({ message: error.data || "Không thể tải sản phẩm." });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-slate-50 px-5 py-10"><Loading /></div>;
  if (errors.message) return <div className="min-h-screen bg-slate-50 px-5 py-10"><div className="mx-auto max-w-4xl rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">{errors.message}</div></div>;
  return <main className="min-h-screen bg-slate-50"><ProductDetail product={product} /></main>;
}
