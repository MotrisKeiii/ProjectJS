"use client";

import { useContext } from "react";
import Link from "next/link";
import { AuthContext } from "@/context/AuthProvider";
import { logout } from "@/services/authService";
import { LogOut, User } from "lucide-react";

export default function Userinfo() {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  if (!user) {
    return (
      <Link
        href="/login"
        className="inline-flex h-10 items-center rounded-xl border border-slate-200 px-3 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
      >
        Đăng nhập
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/profile"
        className="inline-flex h-11 items-center gap-2 rounded-xl px-1.5 text-sm font-medium text-slate-800 transition hover:bg-slate-50"
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.fullname || user.username}
            className="h-10 w-10 rounded-full border border-slate-200 object-cover"
          />
        ) : (
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-900">
            <User className="h-5 w-5" strokeWidth={1.9} />
          </span>
        )}

        <span className="hidden xl:block">
          <span className="block max-w-28 truncate font-bold">
            {user.fullname || user.username}
          </span>

          <span className="block text-xs text-slate-400">Tài khoản</span>
        </span>
      </Link>
      <button
        type="button"
        onClick={handleLogout}
        className="inline-flex h-10 items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 text-sm font-semibold text-red-500 transition hover:border-red-300 hover:bg-red-100 dark:border-red-400/40 dark:bg-red-950/40 dark:text-red-300 dark:hover:bg-red-900/50"
      >
        <LogOut className="h-4 w-4" />
        <span>Logout</span>
      </button>
    </div>
  );
}
