import Header from "@/components/shop/Header";
import Footer from "@/components/shop/Footer";
import ProductList from "@/components/shop/product/ProductList";
import { products } from "@/data/products";

export default function Page() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-900 px-5 py-20 text-white md:py-28">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">
            <div>
              <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-bold text-blue-100 ring-1 ring-white/20">
                New Collection 2026
              </span>
              <h2 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
                Mua sắm dễ dàng với giao diện hiện đại
              </h2>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="/products" className="rounded-2xl bg-white px-6 py-3 font-black text-blue-600 shadow-xl hover:bg-blue-50">
                  Xem sản phẩm
                </a>
                <a href="/admin" className="rounded-2xl border border-white/30 px-6 py-3 font-black text-white hover:bg-white/10">
                  Vào Admin
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] bg-white/10 p-4 shadow-2xl ring-1 ring-white/20 backdrop-blur">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&auto=format&fit=crop"
                alt="Shop"
                className="h-80 w-full rounded-[1.5rem] object-cover md:h-[430px]"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="font-bold uppercase tracking-widest text-blue-600">Featured Products</p>
              <h3 className="mt-2 text-3xl font-black text-slate-900 md:text-4xl">Sản phẩm nổi bật</h3>
            </div>
            <a href="/products" className="font-bold text-blue-600 hover:text-blue-700">
              Xem tất cả →
            </a>
          </div>

          <ProductList products={products} />
        </section>
      </main>
      <Footer />
    </>
  );
}
