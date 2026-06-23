import Userinfo from "./auth/Userinfo";
import Menu from "./Menu";
import { shopMenu } from "@/data/menu";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <a href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-xl font-black text-white shadow-lg shadow-blue-200">
            H
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-slate-900">HTSV Shop</h1>
            <p className="text-xs font-medium text-slate-500">Modern Store</p>
          </div>
        </a>

        <Menu items={shopMenu} />

        <a
          href="#cart"
          className="rounded-2xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-blue-600"
        >
          🛒 Cart
        </a>
        <Userinfo />
      </div>
    </header>
  );
}
