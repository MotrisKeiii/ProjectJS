"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthProvider";
import { useCart } from "@/context/CartContext";
import { createOrder } from "@/services/orderService";
import { getProvinces, getWardsByProvince } from "@/services/addressService";
import OrderSummary from "@/components/checkout/OrderSummary";
import { Banknote, Building2, CheckCircle2, ChevronRight, CreditCard, LocateFixed, MapPin, NotebookPen, Truck, UserRound, WalletCards } from "lucide-react";

export default function CheckoutPage() {
  const { user } = useAuth();
  const { cart, setCart, total: subtotal } = useCart();
  const provinces = useMemo(() => getProvinces(), []);
  const [wards, setWards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    user_id: "",
    customer_name: "",
    phone: "",
    email: "",
    province_code: "",
    province_name: "",
    ward_code: "",
    ward_name: "",
    address_line: "",
    latitude: null,
    longitude: null,
    shipping_method: "standard",
    payment_method: "cod",
    note: "",
  });

  useEffect(() => {
    if (!user) return;
    setFormData((current) => ({ ...current, user_id: user.user_id, customer_name: user.fullname, email: user.email }));
  }, [user]);

  const shippingFee = formData.shipping_method === "express" ? 45000 : subtotal >= 500000 ? 0 : 20000;
  const discountAmount = 0;
  const grandTotal = subtotal + shippingFee - discountAmount;

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleProvinceChange = (event) => {
    const province = provinces.find((item) => item.province_code === event.target.value);
    const provinceWards = province ? getWardsByProvince(province.province_code) : [];
    setWards(provinceWards);
    setFormData((current) => ({ ...current, province_code: province ? province.province_code : "", province_name: province ? province.name : "", ward_code: "", ward_name: "" }));
  };

  const handleWardChange = (event) => {
    const ward = wards.find((item) => item.ward_code === event.target.value);
    setFormData((current) => ({ ...current, ward_code: ward ? ward.ward_code : "", ward_name: ward ? ward.name : "" }));
  };

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Trình duyệt không hỗ trợ xác định vị trí");
      return;
    }
    setLocating(true);
    setError("");
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      let addressLine = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&accept-language=vi`);
        if (response.ok) {
          const result = await response.json();
          if (result.display_name) addressLine = result.display_name;
        }
      } catch {
        setError("Đã lấy tọa độ nhưng chưa thể nhận diện địa chỉ. Vui lòng chọn tỉnh/xã và kiểm tra lại.");
      }
      setFormData((current) => ({ ...current, latitude, longitude, address_line: addressLine }));
      setLocating(false);
    }, (locationError) => {
      if (locationError.code === 1) setError("Bạn đã từ chối quyền truy cập vị trí");
      else setError("Không thể xác định vị trí hiện tại");
      setLocating(false);
    }, { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 });
  };

  const validate = () => {
    if (!formData.customer_name.trim()) return "Vui lòng nhập họ và tên";
    if (!/^[0-9]{9,11}$/.test(formData.phone)) return "Số điện thoại phải có từ 9 đến 11 chữ số";
    if (!formData.email.trim()) return "Vui lòng nhập email";
    if (!formData.province_code) return "Vui lòng chọn tỉnh hoặc thành phố";
    if (!formData.ward_code) return "Vui lòng chọn phường, xã hoặc đặc khu";
    if (!formData.address_line.trim()) return "Vui lòng nhập địa chỉ chi tiết";
    if (cart.length === 0) return "Giỏ hàng đang trống";
    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (formData.payment_method !== "cod") {
      setError("Thanh toán online cần cấu hình cổng thanh toán. Vui lòng chọn thanh toán khi nhận hàng.");
      return;
    }

    const address = [formData.address_line, formData.ward_name, formData.province_name].join(", ");
    const data = {
      order: {
        ...formData,
        address,
        shipping_fee: shippingFee,
        payment_status: "unpaid",
        subtotal,
        discount_code: "",
        discount_amount: discountAmount,
        total: grandTotal,
        status: 0,
      },
      details: cart.map((item) => ({ product_id: item.product_id, quantity: Number(item.quantity) })),
    };

    try {
      setLoading(true);
      setError("");
      const response = await createOrder(data);
      setSuccess(response.data);
      setCart([]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return <main className="min-h-[65vh] bg-slate-50 px-4 py-16"><div className="mx-auto max-w-xl rounded-3xl border border-green-100 bg-white p-10 text-center shadow-xl"><CheckCircle2 className="mx-auto h-16 w-16 text-green-500" /><h1 className="mt-5 text-3xl font-black text-blue-950">Đặt hàng thành công</h1><p className="mt-3 text-slate-500">Mã đơn hàng của bạn là <b className="text-blue-700">#{success.order_id}</b></p><p className="mt-2 text-slate-500">Tổng thanh toán: <b>{Number(success.total).toLocaleString("vi-VN")}đ</b></p><div className="mt-8 flex justify-center gap-3"><Link href="/products" className="rounded-xl bg-blue-600 px-5 py-3 font-bold text-white">Tiếp tục mua sắm</Link><Link href="/" className="rounded-xl border border-slate-200 px-5 py-3 font-bold text-slate-700">Về trang chủ</Link></div></div></main>;
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#eff6ff,_transparent_32%),linear-gradient(to_bottom,_#f8fafc,_#ffffff)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px]">
        <nav className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-400"><Link href="/cart" className="hover:text-blue-600">Giỏ hàng</Link><ChevronRight className="h-4 w-4" /><span className="font-bold text-blue-600">Thanh toán</span><ChevronRight className="h-4 w-4" /><span>Hoàn tất</span></nav>
        <div className="mb-7"><h1 className="text-3xl font-black text-blue-950">Thanh toán đơn hàng</h1><p className="mt-2 text-sm text-slate-500">Vui lòng kiểm tra thông tin và chọn phương thức thanh toán.</p></div>
        {error ? <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{error}</div> : null}

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(360px,.75fr)]">
          <form id="checkout-form" onSubmit={handleSubmit} className="overflow-hidden rounded-2xl border border-slate-200 bg-white px-5 shadow-sm sm:px-7">
            <section className="border-b border-slate-100 py-6"><div className="mb-5 flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600"><UserRound className="h-5 w-5" /></span><h2 className="font-black text-blue-950">1. Thông tin liên hệ</h2></div><div className="grid gap-4 md:grid-cols-3"><label className="text-sm font-bold text-slate-700">Họ và tên *<input name="customer_name" value={formData.customer_name} onChange={handleChange} className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 font-normal outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" /></label><label className="text-sm font-bold text-slate-700">Số điện thoại *<input name="phone" value={formData.phone} onChange={handleChange} inputMode="numeric" className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 font-normal outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" /></label><label className="text-sm font-bold text-slate-700">Email *<input name="email" type="email" value={formData.email} onChange={handleChange} className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 font-normal outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" /></label></div></section>

            <section className="border-b border-slate-100 py-6"><div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600"><MapPin className="h-5 w-5" /></span><h2 className="font-black text-blue-950">2. Địa chỉ giao hàng</h2></div><button type="button" onClick={useCurrentLocation} disabled={locating} className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700 hover:bg-blue-100 disabled:opacity-60"><LocateFixed className="h-4 w-4" />{locating ? "Đang xác định..." : "Sử dụng vị trí hiện tại"}</button></div><div className="grid gap-4 md:grid-cols-2"><label className="text-sm font-bold text-slate-700">Tỉnh/Thành phố *<select value={formData.province_code} onChange={handleProvinceChange} className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 font-normal outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"><option value="">Chọn tỉnh/thành phố</option>{provinces.map((province) => <option key={province.province_code} value={province.province_code}>{province.name}</option>)}</select></label><label className="text-sm font-bold text-slate-700">Phường/Xã/Đặc khu *<select value={formData.ward_code} onChange={handleWardChange} disabled={!formData.province_code} className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 font-normal outline-none disabled:bg-slate-50"><option value="">Chọn phường/xã/đặc khu</option>{wards.map((ward) => <option key={ward.ward_code} value={ward.ward_code}>{ward.name}</option>)}</select></label><label className="text-sm font-bold text-slate-700 md:col-span-2">Địa chỉ chi tiết *<input name="address_line" value={formData.address_line} onChange={handleChange} placeholder="Số nhà, tên đường, thôn/ấp..." className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 font-normal outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" /></label></div></section>

            <section className="border-b border-slate-100 py-6"><div className="mb-5 flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600"><Truck className="h-5 w-5" /></span><h2 className="font-black text-blue-950">3. Phương thức giao hàng</h2></div><div className="grid gap-4 md:grid-cols-2">{[["standard", "Giao tiêu chuẩn", subtotal >= 500000 ? "Miễn phí" : "20.000đ", "Giao trong 24–48 giờ"], ["express", "Giao nhanh 2h", "45.000đ", "Giao trong 2 giờ kể từ khi xác nhận"]].map(([value, title, fee, description]) => <label key={value} className={`cursor-pointer rounded-xl border p-4 transition ${formData.shipping_method === value ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100" : "border-slate-200 hover:border-blue-300"}`}><input type="radio" name="shipping_method" value={value} checked={formData.shipping_method === value} onChange={handleChange} className="mr-3 accent-blue-600" /><b className="text-sm text-blue-950">{title}</b><b className="float-right text-sm text-blue-600">{fee}</b><p className="ml-6 mt-1 text-xs text-slate-500">{description}</p></label>)}</div></section>

            <section className="border-b border-slate-100 py-6"><div className="mb-5 flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600"><CreditCard className="h-5 w-5" /></span><h2 className="font-black text-blue-950">4. Phương thức thanh toán</h2></div><div className="grid gap-3 md:grid-cols-3">{[["cod", Banknote, "Thanh toán khi nhận hàng", "Thanh toán bằng tiền mặt"], ["bank_transfer", Building2, "Chuyển khoản ngân hàng", "Cần cấu hình tài khoản"], ["vnpay", WalletCards, "Ví điện tử/VNPAY", "Cần cấu hình cổng thanh toán"]].map(([value, Icon, title, description]) => <label key={value} className={`cursor-pointer rounded-xl border p-4 transition ${formData.payment_method === value ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100" : "border-slate-200 hover:border-blue-300"}`}><input type="radio" name="payment_method" value={value} checked={formData.payment_method === value} onChange={handleChange} className="sr-only" /><span className="flex items-start gap-3"><Icon className="h-5 w-5 shrink-0 text-blue-600" /><span><b className="block text-sm text-blue-950">{title}</b><span className="mt-1 block text-xs text-slate-500">{description}</span></span></span></label>)}</div></section>

            <section className="py-6"><div className="mb-5 flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600"><NotebookPen className="h-5 w-5" /></span><h2 className="font-black text-blue-950">5. Ghi chú & yêu cầu</h2></div><textarea name="note" value={formData.note} onChange={handleChange} rows={4} maxLength={200} placeholder="Ghi chú cho đơn hàng (thiệp chúc mừng, thời gian giao cụ thể...)" className="w-full resize-none rounded-xl border border-slate-200 p-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" /><p className="mt-1 text-right text-xs text-slate-400">{formData.note.length}/200</p></section>
          </form>

          <OrderSummary cart={cart} subtotal={subtotal} shippingFee={shippingFee} discountAmount={discountAmount} total={grandTotal} loading={loading} />
        </div>
      </div>
    </main>
  );
}
