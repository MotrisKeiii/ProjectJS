"use client";

import { useState } from "react";
import CartPage from "../cart/page";
import { useAuth } from "@/context/AuthProvider";
import { useCart } from "@/context/CartContext";
import { createOrder } from "@/services/orderService";

const Page = () => {
  const { user } = useAuth();
  const { cart, setCart, total } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    user_id: user?.user_id ?? "",
    customer_name: user?.fullname ?? "",
    phone: "",
    email: user?.email ?? "",

    province_code: "",
    province_name: "",
    ward_code: "",
    ward_name: "",
    address_line: "",
    address: "",

    latitude: null,
    longitude: null,

    shipping_method: "standard",
    shipping_fee: 20000,

    payment_method: "cod",
    payment_status: "unpaid",

    discount_code: "",
    discount_amount: 0,

    note: "",
    status: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      setError("Giỏ hàng đang trống");
      return;
    }

    const address = [
      formData.address_line,
      formData.ward_name,
      formData.province_name,
    ].filter(Boolean).join(", ");

    const subtotal = total;
    const finalTotal = subtotal + Number(formData.shipping_fee) - Number(formData.discount_amount);

    const data = {
      order: {
        user_id: formData.user_id,
        customer_name: formData.customer_name,
        phone: formData.phone,
        email: formData.email,
        province_code: formData.province_code,
        province_name: formData.province_name,
        ward_code: formData.ward_code,
        ward_name: formData.ward_name,
        address_line: formData.address_line,
        address,
        latitude: formData.latitude,
        longitude: formData.longitude,
        shipping_method: formData.shipping_method,
        shipping_fee: Number(formData.shipping_fee),
        payment_method: formData.payment_method,
        payment_status: formData.payment_status,
        subtotal,
        discount_code: formData.discount_code,
        discount_amount: Number(formData.discount_amount),
        total: finalTotal,
        note: formData.note,
        status: formData.status,
      },
      details: cart.map((item) => ({
        product_id: item.product_id,
        product_name: item.product_name,
        product_image: item.image,
        price: Number(item.price),
        quantity: Number(item.quantity),
      })),
    };

    try {
      setLoading(true);
      setError("");
      const res = await createOrder(data);

      console.log(res);

      setSuccess("Tạo đơn hàng thành công");
      setCart([]);
    } catch (e) {
      console.log(e);
      setError("Có lỗi xảy ra khi chuẩn bị đơn hàng!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-1/2 max-w-xl rounded-xl bg-white p-6 shadow-lg md:p-8"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Thông tin thanh toán
        </h2>
        <p>{error} {success}</p>
        <div className="mb-5">
          <label
            htmlFor="customer_name"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Họ và tên
          </label>

          <input
            type="text"
            id="customer_name"
            name="customer_name"
            placeholder="Nhập họ và tên"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            value={formData.customer_name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="address_line"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Địa chỉ
          </label>

          <input
            type="text"
            id="address_line"
            name="address_line"
            placeholder="Nhập địa chỉ"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            value={formData.address_line}
            onChange={handleChange}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Số điện thoại
          </label>

          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Nhập số điện thoại"
            pattern="[0-9]{9,11}"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Email
          </label>

          <input
            type="email"
            id="email"
            name="email"
            placeholder="Nhập email"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="note"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Ghi chú
          </label>

          <textarea
            id="note"
            name="note"
            rows={4}
            placeholder="Nhập ghi chú cho đơn hàng"
            className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            value={formData.note}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {loading ? "Đang xử lý..." : "Đặt hàng"}
        </button>
      </form>

      <div className="w-1/2">
        <CartPage />
      </div>
    </div>
  );
};

export default Page;
