"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Minus, Plus } from "lucide-react";

export default function ProductDetail({ product }) {
  const { addToCart } = useCart();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  if (!product?.product_id) {
    return <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">Không tìm thấy sản phẩm.</div>;
  }

  const hasSale = Number(product.sale_price) > 0 && Number(product.sale_price) < Number(product.price);
  const currentPrice = hasSale ? Number(product.sale_price) : Number(product.price || 0);
  const discountPercent = hasSale ? Math.round((1 - currentPrice / Number(product.price)) * 100) : 0;
  const imageUrl = product.image?.startsWith("http") ? product.image : `${process.env.NEXT_PUBLIC_IMG_URL || ""}${product.image || ""}`;

  const addSelectedQuantity = () => {
    for (let index = 0; index < quantity; index += 1) addToCart(product);
  };

  return (
    <section className="mx-auto max-w-[1380px] px-5 py-8 sm:px-8 lg:px-10">
      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm font-medium text-slate-500">
        <Link href="/" className="hover:text-blue-600">Trang chủ</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-blue-600">Sản phẩm</Link>
        <span>/</span>
        <span className="max-w-[240px] truncate text-slate-800">{product.product_name}</span>
      </nav>

      <div className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,1fr)] lg:p-6">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100">
          {hasSale ? <span className="absolute left-4 top-4 z-10 rounded-full bg-red-500 px-3 py-1.5 text-sm font-black text-white shadow-sm">-{discountPercent}%</span> : null}
          <img src={imageUrl} alt={product.product_name} className="h-full w-full object-cover" />
        </div>

        <div className="flex flex-col py-2">
          {(product.cat_name || product.category) ? <span className="w-fit rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">{product.cat_name || product.category}</span> : null}
          <h1 className="mt-4 text-3xl font-black leading-tight text-slate-950 sm:text-4xl">{product.product_name}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
            <span className="font-bold text-amber-500">★ 4.9</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500">Sản phẩm chất lượng</span>
            {product.brand_name ? <><span className="text-slate-300">|</span><span className="text-slate-500">{product.brand_name}</span></> : null}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="text-3xl font-black text-blue-600">{currentPrice.toLocaleString("vi-VN")}đ</span>
            {hasSale ? <><span className="text-base font-medium text-slate-400 line-through">{Number(product.price).toLocaleString("vi-VN")}đ</span><span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-500">Giảm {discountPercent}%</span></> : null}
          </div>

          <p className="mt-6 text-base leading-7 text-slate-600">{product.detail || product.description || product.summary || "Sản phẩm được lựa chọn kỹ lưỡng, phù hợp để gửi tặng và trang trí không gian."}</p>

          <div className="mt-6 grid gap-3 rounded-2xl border border-blue-100 bg-blue-50/50 p-4 text-sm sm:grid-cols-3">
            <div><b className="block text-blue-700">Tươi mới 100%</b><span className="text-slate-500">Sản phẩm chất lượng</span></div>
            <div><b className="block text-blue-700">Giao hàng nhanh</b><span className="text-slate-500">Hỗ trợ nội thành</span></div>
            <div><b className="block text-blue-700">Thanh toán an toàn</b><span className="text-slate-500">Bảo mật thông tin</span></div>
          </div>

          <div className="mt-6">
            <p className="mb-3 text-sm font-bold text-slate-800">Số lượng</p>
            <div className="inline-flex h-11 items-center rounded-lg border border-slate-200 bg-white">
              <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} disabled={quantity <= 1} aria-label="Giảm số lượng" className="flex h-full w-11 items-center justify-center text-slate-600 transition hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:text-slate-300"><Minus className="h-4 w-4" /></button>
              <span className="min-w-10 text-center text-sm font-bold text-slate-800">{quantity}</span>
              <button type="button" onClick={() => setQuantity((value) => value + 1)} aria-label="Tăng số lượng" className="flex h-full w-11 items-center justify-center text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"><Plus className="h-4 w-4" /></button>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button type="button" onClick={addSelectedQuantity} className="h-12 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700">Thêm vào giỏ hàng</button>
            <button type="button" onClick={() => { addSelectedQuantity(); router.push("/cart"); }} className="h-12 rounded-xl border border-blue-600 bg-white px-5 text-sm font-bold text-blue-600 transition hover:bg-blue-50">Mua ngay</button>
          </div>
          <p className="mt-5 text-sm font-medium text-slate-500">✓ Cam kết hoàn tiền nếu sản phẩm không đúng như mô tả.</p>
        </div>
      </div>
    </section>
  );
}
