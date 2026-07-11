import Link from "next/link";
import { useCart } from "@/context/CartContext";
export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  return (
    <div className="group flex h-full min-h-[350px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
      <div className="relative aspect-[4/3] shrink-0 overflow-hidden rounded-lg bg-slate-100">
        <Link href={`/products/${product.product_id}`}>
          <img
            src={process.env.NEXT_PUBLIC_IMG_URL + product.image}
            alt={product.product_name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>
        <span className="absolute left-2 top-2 max-w-[calc(100%-1rem)] truncate rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-600 shadow-sm ring-1 ring-blue-100">
          {product.cat_name}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-1 pt-3">
        <h3 className="line-clamp-1 min-h-5 break-words text-sm font-bold leading-5 text-slate-950">
          {product.product_name}
        </h3>
        <p className="mt-2 line-clamp-2 min-h-9 text-xs leading-[18px] text-slate-500">
          {product.summary || "Chưa có mô tả cho sản phẩm này."}
        </p>
        <p className="mt-auto pt-3 text-xl font-bold tracking-tight text-blue-600">
          {product.price?.toLocaleString("vi-VN")}đ
        </p>
        <button
          onClick={() => addToCart(product)}
          className="mt-3 h-9 w-full rounded-lg bg-slate-950 px-4 text-xs font-bold text-white shadow-sm hover:bg-blue-600"
        >
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
}
