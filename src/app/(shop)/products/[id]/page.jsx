"use client"
import ProductDetail from "@/components/shop/product/ProductDetail";
import { product } from "@/data/product";
import { getProductById } from "@/services/productService";
import { useState } from "react";


export default function ProductDetailPage({ params }) {
  const { id } = params;
  const [product, setProduct] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
      } catch (e) {
        setErrors({ message: e.data });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-blue-600">Chi tiết sản phẩm</p>
          {errors.message ? (
            <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
              {errors.message}
            </p>
          ) : null}
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Product Detail: {id}
          </h1>
        </div>
        {loading ? "loading..." : <ProductDetail product={product} /> }
      </div>
    </main>
  );
}
