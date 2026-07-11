"use client";

import ProductList from "@/components/shop/product/ProductList";
import { getCategories } from "@/services/categoryService";
import { getProducts } from "@/services/productService";
import { useEffect, useState } from "react";
import Pagination from "@/components/common/Pagination";
import Search from "@/components/shop/product/Search";
import { SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);
  const [params, setParams] = useState({ page: 1, limit: 12, trash: 0, status: 1 });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const name = searchParams.get("name")?.trim() || "";

    setParams((current) => {
      if ((current.name || "") === name) return current;

      const next = { ...current, page: 1 };
      if (name) next.name = name;
      else delete next.name;
      return next;
    });
  }, [searchParams]);

  useEffect(() => {
    const openFilters = () => setFilterOpen(true);
    window.addEventListener("open-product-filters", openFilters);
    return () => window.removeEventListener("open-product-filters", openFilters);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const requestParams = { ...params };
        if (params.sort) {
          requestParams.page = 1;
          requestParams.limit = 1000;
          delete requestParams.sort;
        }

        const data = await getProducts(requestParams);
        let list = data.data || [];
        if (params.sort) {
          list = [...list].sort((a, b) => {
            if (params.sort === "price_asc") return Number(a.price || 0) - Number(b.price || 0);
            if (params.sort === "price_desc") return Number(b.price || 0) - Number(a.price || 0);
            if (params.sort === "latest") return new Date(b.created_at || b.launch_date || 0) - new Date(a.created_at || a.launch_date || 0);
            return 0;
          });
          const limit = Number(params.limit || 12);
          const page = Number(params.page || 1);
          setTotalPages(Math.ceil(list.length / limit));
          setProducts(list.slice((page - 1) * limit, page * limit));
        } else {
          setProducts(list);
          setTotalPages(data.totalPage);
        }
        setCategories(await getCategories({ trash: 0, status: 1 }));
      } catch (error) {
        setErrors({ message: error.data || "Không thể tải sản phẩm." });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params]);

  return (
    <section className="min-h-screen bg-slate-50 py-8 sm:py-10">
      <div className="mx-5 sm:mx-8 lg:mx-[100px]">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">Flower collection</p>
            <h1 className="mt-2 text-3xl font-black text-slate-950">Danh sách sản phẩm</h1>
            <p className="mt-2 text-sm text-slate-500">Khám phá các sản phẩm phù hợp với nhu cầu của bạn.</p>
          </div>
          <button type="button" onClick={() => setFilterOpen(true)} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-4 text-sm font-bold text-blue-700 shadow-sm transition hover:border-blue-400 hover:bg-blue-50"><SlidersHorizontal className="h-5 w-5" />Bộ lọc sản phẩm</button>
        </div>

        {errors.message ? <p className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm font-semibold text-red-600">{errors.message}</p> : null}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 lg:p-6">
          {loading ? <div className="flex min-h-[360px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-sm font-semibold text-slate-500">Đang tải sản phẩm...</div> : <ProductList products={products} title="" />}
        </div>
        <div className="mt-6 flex justify-center rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-6">
          <Pagination totalPages={totalPages} params={params} onChangeParams={setParams} />
        </div>
      </div>

      {filterOpen ? <>
        <button type="button" onClick={() => setFilterOpen(false)} aria-label="Đóng bộ lọc" className="fixed inset-0 z-40 cursor-default bg-slate-950/55 backdrop-blur-[2px]" />
        <aside className="fixed bottom-0 left-0 top-[158px] z-[60] w-full max-w-[440px] overflow-y-auto bg-white shadow-2xl">
          <Search categories={categories} setParams={setParams} params={params} onClose={() => setFilterOpen(false)} />
        </aside>
      </> : null}
    </section>
  );
}
