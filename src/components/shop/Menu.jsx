export default function Menu({ items }) {
  return (
    <nav className="hidden items-center gap-6 md:flex">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-sm font-semibold text-slate-600 hover:text-blue-600"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
