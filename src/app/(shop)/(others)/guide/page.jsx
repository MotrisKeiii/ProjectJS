export default function GuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <section className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm sm:p-12">
        <h1 className="text-3xl font-black text-slate-900">Hướng dẫn mua hàng</h1>
        <ol className="mt-6 list-decimal space-y-3 pl-5 leading-8 text-slate-600">
          <li>Chọn sản phẩm bạn muốn mua.</li>
          <li>Thêm sản phẩm vào giỏ hàng.</li>
          <li>Kiểm tra giỏ hàng và tiến hành thanh toán.</li>
        </ol>
      </section>
    </main>
  );
}
