import Link from "next/link";
import { LockKeyhole, PackageCheck, ShieldCheck, Truck } from "lucide-react";

export default function OrderSummary({ cart, subtotal, shippingFee, discountAmount, total, loading }) {
  const freeShippingTarget = 500000;
  const remaining = Math.max(0, freeShippingTarget - subtotal);
  const progress = Math.min(100, (subtotal / freeShippingTarget) * 100);

  return (
    <aside className="space-y-4 lg:sticky lg:top-44">
      <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><Truck className="h-5 w-5" /></span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-slate-700">{remaining > 0 ? <>Mua thêm <b className="text-blue-700">{remaining.toLocaleString("vi-VN")}đ</b> để được miễn phí giao tiêu chuẩn</> : <b className="text-blue-700">Bạn đã được miễn phí giao tiêu chuẩn</b>}</p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${progress}%` }} /></div>
            <p className="mt-2 text-xs text-slate-500">Miễn phí giao tiêu chuẩn cho đơn từ 500.000đ</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="text-lg font-black text-blue-950">Đơn hàng <span className="text-sm font-medium text-slate-400">({cart.length} sản phẩm)</span></h2>
          <Link href="/cart" className="text-sm font-bold text-blue-600 hover:text-blue-700">Chỉnh sửa</Link>
        </div>

        <div className="max-h-[360px] space-y-4 overflow-y-auto py-5 pr-1">
          {cart.map((item) => {
            let itemPrice = Number(item.price);
            if (Number(item.sale_price) > 0 && Number(item.sale_price) < itemPrice) itemPrice = Number(item.sale_price);

            return <div key={item.product_id} className="flex gap-3">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-50"><img src={process.env.NEXT_PUBLIC_IMG_URL + item.image} alt={item.product_name} className="h-full w-full object-cover" /></div>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-sm font-bold text-slate-800">{item.product_name}</p>
                <p className="mt-1 truncate text-xs text-slate-400">{item.cat_name} {item.brand_name}</p>
                <div className="mt-2 flex items-center justify-between"><span className="text-xs font-semibold text-slate-500">x{item.quantity}</span><span className="text-sm font-black text-blue-950">{(itemPrice * Number(item.quantity)).toLocaleString("vi-VN")}đ</span></div>
              </div>
            </div>;
          })}
        </div>

        <div className="space-y-3 border-t border-slate-100 pt-4 text-sm">
          <div className="flex justify-between text-slate-500"><span>Tạm tính</span><b className="text-slate-800">{subtotal.toLocaleString("vi-VN")}đ</b></div>
          <div className="flex justify-between text-slate-500"><span>Phí giao hàng</span><b className={shippingFee === 0 ? "text-green-600" : "text-slate-800"}>{shippingFee === 0 ? "Miễn phí" : `${shippingFee.toLocaleString("vi-VN")}đ`}</b></div>
          {discountAmount > 0 ? <div className="flex justify-between text-slate-500"><span>Giảm giá</span><b className="text-green-600">-{discountAmount.toLocaleString("vi-VN")}đ</b></div> : null}
        </div>

        <div className="mt-5 flex items-end justify-between border-t border-dashed border-slate-200 pt-5"><span className="font-black text-blue-950">Tổng thanh toán</span><span className="text-2xl font-black text-blue-600">{total.toLocaleString("vi-VN")}đ</span></div>
        <button type="submit" form="checkout-form" disabled={loading || cart.length === 0} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 px-5 py-3.5 font-bold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"><LockKeyhole className="h-5 w-5" />{loading ? "Đang xử lý..." : "Đặt hàng"}</button>
        <div className="mt-5 flex items-center justify-center gap-2 text-xs font-medium text-slate-500"><ShieldCheck className="h-4 w-4 text-blue-600" />Thông tin được bảo mật an toàn</div>
        <div className="mt-2 flex items-center justify-center gap-2 text-xs text-slate-400"><PackageCheck className="h-4 w-4" />Cam kết hoàn tiền nếu có vấn đề</div>
      </div>
    </aside>
  );
}
