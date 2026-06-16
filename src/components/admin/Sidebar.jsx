import { adminMenu } from "@/data/adminMenu";

export default function Sidebar() {
  return (
    <aside className="min-h-screen w-64 bg-slate-950 p-6 text-white">
      <h3 className="mb-8 text-2xl font-black">Admin</h3>

      <div className="space-y-2">
        {adminMenu.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="block rounded-2xl px-4 py-3 text-sm font-bold text-slate-300 hover:bg-white/10 hover:text-white"
          >
            {item.label}
          </a>
        ))}
      </div>
    </aside>
  );
}
