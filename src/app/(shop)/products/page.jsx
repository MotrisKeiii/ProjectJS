"use client";
import ProductList from "@/components/shop/product/ProductList";
import CategoryMenu from "@/components/shop/product/CategoryMenu";
import { getCategories } from "@/services/categoryService";
import { getProducts } from "@/services/productService";
import { useEffect, useState } from "react";
import Pagination from "@/components/common/Pagination";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    trash: 0,
    status: 1,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getProducts(params);
        setProducts(data.data);
        setTotalPages(data.totalPage || 0);
        const data1 = await getCategories({ trash: 0, status: 1 });
        setCategories(data1.data);
      } catch (e) {
        setErrors({ message: e?.message || e?.data?.message || "Khong tai duoc danh sach san pham." });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params]);
  return (
    <section className="mx-auto max-w-7xl px-5 py-14">
      <div className="mb-10 rounded-3xl bg-white p-8 shadow-md">
        <p className="font-bold uppercase tracking-widest text-blue-600">
          Shop
        </p>
        <h1 className="mt-2 text-4xl font-black text-slate-900">Products</h1>
        <p className="mt-3 text-slate-500">
          Danh sách sản phẩm đang bán tại HTSV Shop.
        </p>
      </div>
      <div className="flex">
        <div className="w-1/4">
          <CategoryMenu categories={categories} />
        </div>
        <div className="w-3/4">
          {errors.message ? (
            <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
              {errors.message}
            </p>
          ) : null}
          {loading ? "loading..." : <ProductList products={products} />}
          {loading ? (
            ""
          ) : (
            <Pagination
              totalPages={totalPages}
              params={params}
              onChangeParams={setParams}
            />
          )}
        </div>
      </div>
    </section>
  );
}
