export default function Input({ value, onChange, className = "", ...rest }) {
  return (
    <input
      value={value}
      onChange={onChange}
      className={`w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 ${className}`}
      {...rest}
    />
  );
}
