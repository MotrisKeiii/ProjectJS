"use client";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Userinfo from "./auth/Userinfo";
import { HeaderProductSearch } from "./product/Search";
import { shopMenu } from "@/data/menu";
import {
  Headphones,
  PackageCheck,
  ShoppingCart,
  SlidersHorizontal,
  Truck,
} from "lucide-react";

export default function Header() {
  const { totalItems } = useCart();
  const pathname = usePathname();
  const isProductsPage = pathname === "/products";

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_5px_20px_rgba(15,23,42,0.07)]">
      <div className="mx-auto flex min-h-[92px] max-w-[1760px] items-center gap-6 px-5 py-4 sm:px-8 xl:px-10">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <img
            src="/icon.png"
            alt="Motris Shop"
            className="h-16 w-16 rounded-full object-cover"
          />
          <span className="hidden sm:block">
            <span className="block text-2xl font-black uppercase tracking-[0.18em] text-blue-950 dark:text-blue-300">
              Motris Shop
            </span>
            <span className="mt-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
              Trao yêu thương, gửi hạnh phúc
            </span>
          </span>
        </Link>

        <div className="relative hidden min-w-0 flex-1 xl:block xl:max-w-[470px]">
          <HeaderProductSearch />
        </div>
        <ThemeToggle />

        <div className="ml-auto hidden items-center gap-7 2xl:flex">
          <div className="flex items-center gap-3">
            <span className="text-blue-700">
              <Truck className="h-8 w-8" strokeWidth={1.8} />
            </span>
            <span className="text-sm">
              <b className="block text-slate-800 dark:text-slate-300">
                Miễn phí giao hàng
              </b>
              <span className="text-slate-500 dark:text-slate-400">
                Đơn từ 500k
              </span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-blue-700">
              <PackageCheck className="h-8 w-8" strokeWidth={1.8} />
            </span>
            <span className="text-sm">
              <b className="block text-slate-800 dark:text-slate-300">
                Đổi trả dễ dàng
              </b>
              <span className="text-slate-500 dark:text-slate-400">
                Trong 7 ngày
              </span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-blue-700">
              <Headphones className="h-8 w-8" strokeWidth={1.8} />
            </span>
            <span className="text-sm">
              <b className="block text-slate-800">Hỗ trợ 24/7</b>
              <span className="text-slate-500">0785 043 757</span>
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 bg-white transition-colors dark:border-slate-700 dark:bg-slate-900">
        <div className="mx-auto flex min-h-[64px] max-w-[1760px] items-center gap-5 px-5 sm:px-8 xl:px-10">
          <nav className="flex min-w-0 items-center gap-6 overflow-x-auto sm:gap-10">
            {shopMenu.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex h-10 items-center gap-2 border-l border-slate-200 pl-4 text-sm font-bold text-slate-800 transition hover:text-blue-600 dark:border-slate-700 dark:text-slate-200 dark:hover:text-blue-400"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-3">
            {isProductsPage ? (
              <button
                type="button"
                onClick={() =>
                  window.dispatchEvent(new Event("open-product-filters"))
                }
                className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 px-3 text-sm font-bold text-blue-700 transition hover:border-blue-300 hover:bg-blue-50"
              >
                <SlidersHorizontal className="h-5 w-5" />

                <span className="hidden sm:inline">Bộ lọc</span>
              </button>
            ) : null}

            <Link
              href="/cart"
              className="inline-flex h-10 items-center gap-2 border-l border-slate-200 pl-4 text-sm font-bold text-slate-800 transition hover:text-blue-600"
            >
              <span className="relative">
                <ShoppingCart className="h-6 w-6" />

                {totalItems > 0 ? (
                  <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] text-white">
                    {totalItems}
                  </span>
                ) : null}
              </span>

              <span className="hidden md:inline">Giỏ hàng</span>
            </Link>

            <Userinfo />
          </div>
        </div>
      </div>
    </header>
  );
}
