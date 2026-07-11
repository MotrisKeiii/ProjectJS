"use client";

import { useEffect, useState } from "react";
import {
  ArrowUp,
  CreditCard,
  Mail,
  MapPin,
  MessageCircle,
  MessagesSquare,
  Phone,
} from "lucide-react";

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setShowScrollTop(window.scrollY > 400);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <footer className="mt-16 border-t border-slate-200 bg-white text-slate-600">
        <div className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1.15fr] lg:gap-12">
            {/* Thông tin cửa hàng */}
            <div>
              <a href="/" className="inline-flex items-center gap-3">
                <img
                  src="/icon.png"
                  alt="Motris Shop"
                  className="h-11 w-11 rounded-xl object-cover shadow-md shadow-blue-200"
                />

                <span>
                  <span className="block text-lg font-black leading-none text-slate-900">
                    Motris Shop
                  </span>

                  <span className="mt-1 block text-xs font-medium text-slate-500">
                    Modern Store
                  </span>
                </span>
              </a>

              <p className="mt-5 max-w-[280px] text-sm leading-7 text-slate-500">
                Motris Shop – Nơi mang đến những bó hoa tươi thắm, gửi trọn yêu
                thương đến những người bạn quan tâm.
              </p>

              <div className="mt-5 flex items-center gap-3">
                <a
                  href="https://www.facebook.com/share/1AY9tRLQLy/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 transition duration-300 hover:-translate-y-1 hover:bg-blue-100 hover:shadow-md"
                >
                  <MessageCircle className="h-6 w-6 text-blue-600" />
                </a>

                <a
                  href="https://zalo.me/0785043757"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Zalo"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 transition duration-300 hover:-translate-y-1 hover:bg-blue-100 hover:shadow-md"
                >
                  <MessagesSquare className="h-6 w-6 text-blue-600" />
                </a>

                <a
                  href="tel:0785043757"
                  aria-label="Gọi ngay"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 transition duration-300 hover:-translate-y-1 hover:bg-blue-100 hover:shadow-md"
                >
                  <Phone className="h-6 w-6 text-blue-600" />
                </a>

                <a
                  href="mailto:nguyenminhtri.hitc@gmail.com"
                  aria-label="Gmail"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 transition duration-300 hover:-translate-y-1 hover:bg-blue-100 hover:shadow-md"
                >
                  <Mail className="h-6 w-6 text-blue-600" />
                </a>
              </div>
            </div>

            {/* Về chúng tôi */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-wide text-slate-900">
                Về chúng tôi
              </h3>

              <ul className="mt-5 space-y-3">
                <li>
                  <a
                    href="/about"
                    className="text-sm font-medium text-slate-500 transition hover:pl-1 hover:text-blue-600"
                  >
                    Giới thiệu
                  </a>
                </li>

                <li>
                  <a
                    href="/policy"
                    className="text-sm font-medium text-slate-500 transition hover:pl-1 hover:text-blue-600"
                  >
                    Chính sách hoạt động
                  </a>
                </li>

                <li>
                  <a
                    href="/privacy"
                    className="text-sm font-medium text-slate-500 transition hover:pl-1 hover:text-blue-600"
                  >
                    Chính sách bảo mật
                  </a>
                </li>

                <li>
                  <a
                    href="/terms"
                    className="text-sm font-medium text-slate-500 transition hover:pl-1 hover:text-blue-600"
                  >
                    Điều khoản sử dụng
                  </a>
                </li>

                <li>
                  <a
                    href="/contact"
                    className="text-sm font-medium text-slate-500 transition hover:pl-1 hover:text-blue-600"
                  >
                    Liên hệ
                  </a>
                </li>
              </ul>
            </div>

            {/* Hỗ trợ khách hàng */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-wide text-slate-900">
                Hỗ trợ khách hàng
              </h3>

              <ul className="mt-5 space-y-3">
                <li>
                  <a
                    href="/guide"
                    className="text-sm font-medium text-slate-500 transition hover:pl-1 hover:text-blue-600"
                  >
                    Hướng dẫn mua hàng
                  </a>
                </li>

                <li>
                  <a
                    href="/shipping"
                    className="text-sm font-medium text-slate-500 transition hover:pl-1 hover:text-blue-600"
                  >
                    Chính sách giao hàng
                  </a>
                </li>

                <li>
                  <a
                    href="/returns"
                    className="text-sm font-medium text-slate-500 transition hover:pl-1 hover:text-blue-600"
                  >
                    Chính sách đổi trả
                  </a>
                </li>

                <li>
                  <a
                    href="/faq"
                    className="text-sm font-medium text-slate-500 transition hover:pl-1 hover:text-blue-600"
                  >
                    Câu hỏi thường gặp
                  </a>
                </li>

                <li>
                  <a
                    href="/support"
                    className="text-sm font-medium text-slate-500 transition hover:pl-1 hover:text-blue-600"
                  >
                    Hỗ trợ khách hàng
                  </a>
                </li>
              </ul>
            </div>

            {/* Thông tin liên hệ */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-wide text-slate-900">
                Thông tin liên hệ
              </h3>

              <ul className="mt-5 space-y-5">
                <li className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                    <Phone className="h-5 w-5 text-blue-600" />
                  </span>

                  <div>
                    <p className="text-xs font-semibold text-slate-400">
                      Hotline
                    </p>

                    <a
                      href="tel:0785043757"
                      className="mt-1 block text-sm font-semibold text-slate-600 transition hover:text-blue-600"
                    >
                      0785 043 757
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </span>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-400">
                      Gmail
                    </p>

                    <a
                      href="mailto:nguyenminhtri.hitc@gmail.com"
                      className="mt-1 block break-all text-sm font-semibold text-slate-600 transition hover:text-blue-600"
                    >
                      nguyenminhtri.hitc@gmail.com
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </span>

                  <div>
                    <p className="text-xs font-semibold text-slate-400">
                      Địa chỉ
                    </p>

                    <a
                      href="https://www.google.com/maps/search/?api=1&query=123+Duong+ABC+Quan+1+Thanh+pho+Ho+Chi+Minh"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 block text-sm font-semibold leading-6 text-slate-600 transition hover:text-blue-600"
                    >
                      123 Đường ABC, Quận 1, TP. Hồ Chí Minh
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-5 text-sm font-medium text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 HTSV Shop. All rights reserved.</p>

            <div className="flex items-center gap-3">
              {["Visa", "Mastercard", "PayPal"].map((method) => (
                <span
                  key={method}
                  className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-semibold text-slate-500"
                >
                  <CreditCard className="h-4 w-4" />
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <button
        type="button"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        aria-label="Cuộn lên đầu trang"
        className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-200 transition duration-300 hover:-translate-y-1 hover:bg-blue-700 ${
          showScrollTop
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </>
  );
}
