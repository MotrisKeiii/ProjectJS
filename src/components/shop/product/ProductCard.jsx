export default function ProductCard({ product }) {
  return (
    <div className="group flex h-full min-h-[490px] flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
      <div className="relative h-60 shrink-0 overflow-hidden bg-slate-100 sm:h-64">
        <img
          src={process.env.NEXT_PUBLIC_IMG_URL + product.image}
          alt={product.product_name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 max-w-[calc(100%-1.5rem)] truncate rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-blue-600 shadow-sm ring-1 ring-slate-200">
          {product.cat_name}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 min-h-12 break-words text-lg font-semibold leading-6 text-slate-950">
          {product.product_name}
        </h3>
        <p className="mt-2 line-clamp-2 min-h-12 text-sm leading-6 text-slate-500">
          {product.summary || "Chưa có mô tả cho sản phẩm này."}
        </p>
        <p className="mt-auto pt-5 text-2xl font-bold tracking-tight text-blue-600">
          {product.price?.toLocaleString("vi-VN")}đ
        </p>
        <button className="mt-5 w-full rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-600">
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
}
