import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";

const formatPrice = (price) => Number(price || 0).toLocaleString("vi-VN");

export default function CartItem({ item, onQuantityChange, onRemove }) {
  const details = [item.cat_name, item.brand_name].filter(Boolean).join(" • ");
  let itemPrice = Number(item.price);

  if (Number(item.sale_price) > 0 && Number(item.sale_price) < itemPrice) {
    itemPrice = Number(item.sale_price);
  }

  const subtotal = itemPrice * Number(item.quantity);

  return (
    <div className="grid gap-4 p-4 transition-colors duration-200 hover:bg-slate-50 sm:p-5 lg:grid-cols-[minmax(220px,1fr)_100px_108px_120px_36px] lg:items-center lg:gap-3">
      <div className="flex min-w-0 items-center gap-3">
        <Link
          href={`/products/${item.product_id}`}
          className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100"
        >
          <img
            src={process.env.NEXT_PUBLIC_IMG_URL + item.image}
            alt={item.product_name}
            className="h-full w-full object-cover"
          />
        </Link>
        <div className="min-w-0">
          <Link
            href={`/products/${item.product_id}`}
            className="line-clamp-2 text-sm font-bold text-slate-900 hover:text-blue-600"
          >
            {item.product_name}
          </Link>
          {details ? (
            <p className="mt-1 truncate text-xs font-medium text-slate-500">
              {details}
            </p>
          ) : null}
          {item.summary ? (
            <p className="mt-1 line-clamp-1 text-xs text-slate-400">
              {item.summary}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 lg:block">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400 lg:hidden">
          Đơn giá
        </span>
        <span className="text-sm font-semibold text-slate-700">
          {formatPrice(itemPrice)}đ
        </span>
      </div>

      <div className="flex items-center justify-between gap-3 lg:justify-center">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400 lg:hidden">
          Số lượng
        </span>
        <div className="inline-flex h-10 items-center overflow-hidden rounded-lg border border-slate-300 bg-white">
          <button
            type="button"
            onClick={() => onQuantityChange(item.product_id, item.quantity - 1)}
            disabled={item.quantity <= 1}
            aria-label={`Giảm số lượng ${item.product_name}`}
            className="flex h-full w-9 items-center justify-center text-slate-600 transition hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:text-slate-300"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="min-w-9 border-x border-slate-200 px-2 text-center text-sm font-bold text-slate-800">
            {item.quantity}
          </span>
          <button
            type="button"
            onClick={() => onQuantityChange(item.product_id, item.quantity + 1)}
            aria-label={`Tăng số lượng ${item.product_name}`}
            className="flex h-full w-9 items-center justify-center text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 lg:block lg:text-right">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400 lg:hidden">
          Thành tiền
        </span>
        <span className="text-base font-bold text-blue-600">
          {formatPrice(subtotal)}đ
        </span>
      </div>

      <button
        type="button"
        onClick={() => onRemove(item.product_id)}
        className="inline-flex h-9 w-9 items-center justify-center self-end rounded-lg text-red-500 transition hover:bg-red-50 hover:text-red-600 lg:self-auto"
        aria-label={`Xóa ${item.product_name} khỏi giỏ hàng`}
        title="Xóa khỏi giỏ hàng"
      >
        <Trash2 className="h-5 w-5" strokeWidth={1.8} />
      </button>
    </div>
  );
}
