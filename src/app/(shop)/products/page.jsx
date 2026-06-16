import { products } from "@/data/products";
import ProductList from "@/components/shop/product/ProductList";

export default function ProductsPage() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-14">
      <div className="mb-10 rounded-3xl bg-white p-8 shadow-md">
        <p className="font-bold uppercase tracking-widest text-blue-600">Shop</p>
        <h1 className="mt-2 text-4xl font-black text-slate-900">Products</h1>
        <p className="mt-3 text-slate-500">Danh sách sản phẩm đang bán tại HTSV Shop.</p>
      </div>
      <ProductList products={products} />
    </section>
  );
}