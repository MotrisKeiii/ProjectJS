import ProductCard from "./ProductCard";

export default function ProductList({ products, title }) {
  return (
    <div className="max-w-6xl mx-auto ">
      <h1 className="text-2xl text-center font-bold mb-5">
        {title}
      </h1>
      <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.slice(0, 12).map((p) => (
          <ProductCard key={p.product_id} product={p} />
        ))}
      </div>
    </div>
  );
}
