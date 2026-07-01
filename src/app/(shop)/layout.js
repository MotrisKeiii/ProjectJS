import Header from '@/components/shop/Header'
import Footer from '@/components/shop/Footer'

export default function ShopLayout({ children }) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">{children}</main>
      <Footer />
    </>
  )
}
