export default function Button({ children, params, setParams, category_name }) {
  return (
    <button
      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
      onClick={() => {
        setParams((prev) => ({
          ...prev,
          page: 1,
          limit: 500,
          ...(category_name && { category: category_name }),
        }));
      }}
    >
      {children}
    </button>
  );
}
