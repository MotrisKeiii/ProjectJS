"use client";

import CartItem from "@/components/cart/CartItem";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { ArrowRight, ChevronRight, PackageOpen, ShieldCheck, Truck } from "lucide-react";

export default function CartPage() {
  const { cart, total, removeFromCart, updateQuantity } = useCart();

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#eff6ff,_transparent_32%),linear-gradient(to_bottom,_#f8fafc,_#ffffff)] py-8">
      <div className="mx-auto w-full max-w-[1380px] px-4 sm:px-6 lg:px-8">
        <nav className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-400"><Link href="/" className="hover:text-blue-600">Trang chủ</Link><ChevronRight className="h-4 w-4" /><span className="font-bold text-blue-600">Giỏ hàng</span></nav>
        <div className="mb-6">
          <h1 className="text-3xl font-black text-blue-950">
            Giỏ hàng của bạn
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Kiểm tra lại sản phẩm và số lượng trước khi tiến hành thanh toán.
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
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
                    <CartItem
                      key={item.product_id}
                      item={item}
                      onQuantityChange={updateQuantity}
                      onRemove={removeFromCart}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="px-6 py-16 text-center text-sm font-medium text-slate-500">
                <PackageOpen className="mx-auto h-14 w-14 text-blue-200" />
                <p className="mt-4">Giỏ hàng của bạn chưa có sản phẩm nào.</p>
                <Link href="/products" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-bold text-white">Khám phá sản phẩm <ArrowRight className="h-4 w-4" /></Link>
              </div>
            )}
          </section>

          <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.06)] lg:sticky lg:top-44">
            <h2 className="text-lg font-bold text-slate-900">Tóm tắt đơn hàng</h2>
            <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4"><div className="flex items-center gap-2 text-sm font-bold text-blue-700"><Truck className="h-5 w-5" />{total >= 500000 ? "Bạn được miễn phí giao tiêu chuẩn" : `Mua thêm ${(500000 - total).toLocaleString("vi-VN")}đ để miễn phí giao tiêu chuẩn`}</div><div className="mt-3 h-2 overflow-hidden rounded-full bg-white"><div className="h-full rounded-full bg-blue-600" style={{ width: `${Math.min(100, total / 5000)}%` }} /></div></div>
            <div className="my-5 border-t border-dashed border-slate-200" />
            <div className="flex items-center justify-between gap-4 py-6">
              <span className="text-base font-medium text-slate-600">Tổng thanh toán</span>
              <span className="text-xl font-bold text-red-600">
                {total.toLocaleString("vi-VN")} đ
              </span>
            </div>
            {cart.length > 0 ? <Link href="/checkout" className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5">Tiến hành thanh toán <ArrowRight className="h-4 w-4" /></Link> : null}
            <p className="mt-4 text-center text-xs leading-5 text-slate-400">
              Giá sản phẩm và số lượng sẽ được xác nhận khi thanh toán.
            </p>
            <p className="mt-3 flex items-center justify-center gap-2 text-xs font-medium text-slate-500"><ShieldCheck className="h-4 w-4 text-blue-600" />Thanh toán an toàn và bảo mật</p>
          </aside>
        </div>
      </div>
    </main>
  );
}
