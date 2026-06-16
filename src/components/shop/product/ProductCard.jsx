export default function ProductCard({ product }) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative h-56 overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-blue-600 shadow">
          {product.category}
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-black text-slate-900">{product.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
          {product.description || "Sản phẩm chất lượng, phù hợp cho nhu cầu hằng ngày."}
        </p>
        <p className="mt-4 text-2xl font-black text-blue-600">
          {product.price.toLocaleString()}đ
        </p>
        <button className="mt-5 w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-blue-600">
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
}
