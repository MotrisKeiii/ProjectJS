export default function Empty({ message = "Không có dữ liệu" }) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
      <p className="text-base font-semibold text-slate-500">{message}</p>
    </div>
  );
}
