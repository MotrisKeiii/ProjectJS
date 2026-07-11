export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <section className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm sm:p-12">
        <h1 className="text-3xl font-black text-slate-900">Liên hệ</h1>
        <div className="mt-6 space-y-3 leading-8 text-slate-600">
          <p>Hotline: <a className="font-semibold text-blue-600 hover:underline" href="tel:0123456789">0123 456 789</a></p>
          <p>Email: <a className="font-semibold text-blue-600 hover:underline" href="mailto:nguyenminhtri.hitc@gmail.com">nguyenminhtri.hitc@gmail.com</a></p>
          <p>Địa chỉ: Quận 9, Thành phố Hồ Chí Minh.</p>
        </div>
      </section>
    </main>
  );
}
