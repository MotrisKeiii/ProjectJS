export default function ProductDetail({ product }) {
  return (
    <div className="grid gap-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl md:grid-cols-2 md:p-10">
      <div className="overflow-hidden rounded-3xl bg-slate-100">
        <img src={product.image} alt={product.name} className="h-full min-h-96 w-full object-cover" />
      </div>

      <div className="flex flex-col justify-center">
        <span className="mb-4 w-fit rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-600">
          {product.category}
        </span>
        <h2 className="text-4xl font-black text-slate-900">{product.name}</h2>
        <h3 className="mt-4 text-3xl font-black text-blue-600">{product.price.toLocaleString()}đ</h3>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          {product.description || "Sản phẩm chất lượng cao, thiết kế hiện đại và dễ sử dụng."}
        </p>
        <button className="mt-8 rounded-2xl bg-blue-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-blue-200 hover:bg-blue-700">
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
}
