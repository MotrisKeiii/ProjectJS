"use client";
import ProductList from "@/components/shop/product/ProductList";
import { getCategories } from "@/services/categoryService";
import { getProducts } from "@/services/productService";
import { useEffect, useState } from "react";
import Pagination from "@/components/common/Pagination";
import Search from "@/components/shop/product/Search";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [params, setParams] = useState({
    page: 1,
    limit: 12,
    trash: 0,
    status: 1,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // goi api
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getProducts(params);
        setProducts(data.data);
        setTotalPages(data.totalPage);
        const data1 = await getCategories({ trash: 0, status: 1 });
        setCategories(data1);
      } catch (e) {
        setErrors({ message: e.data });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params]);

  return (
    <section className="mx-auto max-w-[1600px] px-2 py-4 sm:px-4 lg:px-5">
      {/* <div className="mb-4 flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm ring-1 ring-slate-200">
          {products.length} sản phẩm
        </div>
      </div> */}

      <div className="grid gap-4 lg:grid-cols-[250px_minmax(0,1fr)] xl:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="self-start rounded-lg border border-slate-200 bg-white p-3 shadow-sm lg:sticky lg:top-24">
          <Search
            categories={categories}
            setParams={setParams}
            params={params}
          />
        </aside>

        <div className="min-w-0">
          {errors.message ? (
            <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
              {errors.message}
            </p>
          ) : null}
          {loading ? (
            <div className="rounded-lg border border-slate-200 bg-white px-6 py-16 text-center text-sm font-semibold text-slate-500 shadow-sm">
              Đang tải sản phẩm...
            </div>
          ) : (
            <ProductList products={products} title="Danh Sách Sản Phẩm" />
          )}
          {!loading ? (
            <Pagination
              totalPages={totalPages}
              params={params}
              onChangeParams={setParams}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
