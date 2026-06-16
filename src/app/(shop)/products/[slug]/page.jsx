import ProductDetail from "@/components/shop/product/ProductDetail";
import { product } from "@/data/product";

export default function ProductDetailPage({ params }) {
  const { slug } = params;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-blue-600">Chi tiết sản phẩm</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Product Detail: {slug}
          </h1>
        </div>

        <ProductDetail product={product} />
      </div>
    </main>
  );
}