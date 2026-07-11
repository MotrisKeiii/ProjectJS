import ProductCard from "./ProductCard";

export default function ProductList({ products, title }) {
  return (
    <div className="mx-auto max-w-none">
      {title ? (
        <h1 className="mb-3 text-left text-2xl font-bold text-slate-950">
          {title}
        </h1>
      ) : null}
      <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {products.slice(0, 12).map((p) => (
          <ProductCard key={p.product_id} product={p} />
        ))}
      </div>
    </div>
  );
}
