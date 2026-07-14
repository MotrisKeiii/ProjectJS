"use client";

import CartItem from "@/components/cart/CartItem";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, total, removeFromCart, updateQuantity } = useCart();

  return (
    <main className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Giỏ hàng của bạn
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Kiểm tra lại sản phẩm và số lượng trước khi tiến hành thanh toán.
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between gap-4">
                <h2 className="font-semibold text-slate-800">Sản phẩm trong giỏ</h2>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                  {cart.length} sản phẩm
                </span>
              </div>
            </div>

            {cart.length ? (
              <>
                <div className="hidden border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs font-bold uppercase tracking-wide text-slate-500 lg:grid lg:grid-cols-[minmax(220px,1fr)_100px_108px_120px_36px] lg:gap-3">
                  <span>Sản phẩm</span>
                  <span>Đơn giá</span>
                  <span className="text-center">Số lượng</span>
                  <span className="text-right">Thành tiền</span>
                  <span className="sr-only">Xóa</span>
                </div>
                <div className="divide-y divide-slate-200">
                  {cart.map((item) => (
                    <CartItem key={item.product_id} item={item} onQuantityChange={updateQuantity} onRemove={removeFromCart} />
                  ))}
                </div>
              </>
            ) : (
              <div className="px-6 py-16 text-center text-sm font-medium text-slate-500">
                Giỏ hàng của bạn chưa có sản phẩm nào.
              </div>
            )}
          </section>

          <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-6">
            <h2 className="text-lg font-bold text-slate-900">Tóm tắt đơn hàng</h2>
            <div className="my-5 border-t border-dashed border-slate-200" />
            <div className="flex items-center justify-between gap-4 py-6">
              <span className="text-base font-medium text-slate-600">Tổng thanh toán</span>
              <span className="text-xl font-bold text-red-600">{total.toLocaleString("vi-VN")} đ</span>
            </div>
            <Link href="/checkout" type="button" className=" mt-6 w-full rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-slate-800 active:scale-[0.98] ">
              Tiến hành thanh toán
            </Link>
            <p className="mt-4 text-center text-xs leading-5 text-slate-400">
              Giá sản phẩm và số lượng sẽ được xác nhận khi thanh toán.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}
