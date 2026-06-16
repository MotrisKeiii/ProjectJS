export default function Modal({ title, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-5 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl">
        <header className="border-b border-slate-200 px-6 py-5">
          <h3 className="text-xl font-black text-slate-900">{title}</h3>
        </header>
        <div className="p-6 text-slate-700">{children}</div>
      </div>
    </div>
  );
}
