import Header from "@/components/shop/Header";
import Footer from "@/components/shop/Footer";
import { CartProvider } from "@/context/CartContext";

export default function ShopLayout({ children }) {
  return (
    <>
      <CartProvider>
        <Header />
        <main className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
          {children}
        </main>
        <Footer />
      </CartProvider>
    </>
  );
}
