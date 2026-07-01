import ProductCard from "./ProductCard";

export default function ProductList({ products }) {
  if (!products.length) {
    return (
      <p className="rounded-lg bg-white px-4 py-6 text-center text-sm font-semibold text-slate-500 shadow-sm">
        Không có sản phẩm.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.product_id} product={p} />
      ))}
    </div>
  );
}
