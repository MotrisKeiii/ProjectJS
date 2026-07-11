export default function FaqPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <section className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm sm:p-12">
        <h1 className="text-3xl font-black text-slate-900">Câu hỏi thường gặp</h1>
        <div className="mt-6 space-y-5 text-slate-600">
          <div><h2 className="font-bold text-slate-800">Tôi có thể thay đổi số lượng sản phẩm không?</h2><p className="mt-1 leading-7">Bạn có thể thay đổi số lượng trực tiếp trong giỏ hàng trước khi thanh toán.</p></div>
          <div><h2 className="font-bold text-slate-800">Làm thế nào để được hỗ trợ?</h2><p className="mt-1 leading-7">Bạn có thể liên hệ qua hotline hoặc email được hiển thị ở Footer.</p></div>
        </div>
      </section>
    </main>
  );
}
