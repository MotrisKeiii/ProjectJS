"use client";

import { useEffect, useState } from "react";
import ProductList from "@/components/shop/product/ProductList";
import {
  getBestSellerProducts,
  getNewProducts,
  getProducts,
} from "@/services/productService";

const getList = (response) => {
  if (Array.isArray(response)) return response;
  return response?.data || response?.value || [];
};

const initialProducts = {
  new: [],
  bestSeller: [],
  mostViewed: [],
  hot: [],
};

export default function Page() {
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const [newRes, bestSellerRes, allRes] = await Promise.all([
          getNewProducts(4),
          getBestSellerProducts({ limit: 4, trash: 0, status: 1 }),
          getProducts({ limit: 100, trash: 0, status: 1 }),
        ]);

        const newProducts = getList(newRes).slice(0, 4);
        const bestSellerProducts = getList(bestSellerRes).slice(0, 4);
        const allProducts = getList(allRes);

        const mostViewedProducts = [...allProducts]
          .sort((a, b) => Number(b.view || 0) - Number(a.view || 0))
          .slice(0, 4);

        const hotProducts = allProducts
          .filter((item) => item?.tag?.toLowerCase() === "hot")
          .slice(0, 4);

        setProducts({
          new: newProducts,
          bestSeller: bestSellerProducts,
          mostViewed: mostViewedProducts,
          hot: hotProducts,
        });
      } catch (err) {
        setError(err?.message || "Không tải được sản phẩm.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const productSections = [
    {
      title: "Sản phẩm mới",
      products: products.new,
    },
    {
      title: "Sản phẩm bán chạy",
      products: products.bestSeller,
    },
    {
      title: "Sản phẩm được xem nhiều nhất",
      products: products.mostViewed,
    },
    {
      title: "Sản phẩm hot",
      products: products.hot,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-[1440px] px-4 py-8 lg:px-6">
        <section className="mb-8 rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-sm">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
            HTSV Shop
          </p>

          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Khám phá sản phẩm nổi bật
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            Tổng hợp những sản phẩm mới, bán chạy, được xem nhiều và đang hot
            tại cửa hàng.
          </p>
        </section>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-20 text-center shadow-sm">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

            <p className="text-sm font-semibold text-slate-500">
              Đang tải sản phẩm...
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {productSections.map((section) => {
              if (!section.products.length) return null;

              return (
                <section
                  key={section.title}
                  className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:p-6"
                >
                  <ProductList
                    title={section.title}
                    products={section.products}
                  />
                </section>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
