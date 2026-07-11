"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Gift,
  Globe2,
  Heart,
  LockKeyhole,
  LogIn,
  ShieldCheck,
  User,
} from "lucide-react";
import { isEmpty, validateLogin } from "@/utils/validators";
import { login, loginWithGoogle } from "@/services/authService";
import { AuthContext } from "@/context/AuthProvider";

const AUTH_BACKGROUND_IMAGE = "";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const { setUser } = useContext(AuthContext);

  const finishLogin = (res) => {
    setUser(res.user);
    setSuccess("Đăng nhập thành công");
    router.push(res.user.user_type === "admin" ? "/admin" : "/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateLogin({ username, pass });
    setErrors(validationErrors);
    if (!isEmpty(validationErrors)) return;

    try {
      setLoading(true);
      finishLogin(await login({ username, pass, remember }));
    } catch (error) {
      setErrors({ message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setErrors({});
      finishLogin(await loginWithGoogle());
    } catch (error) {
      let message = error.message;
      if (error.code === "auth/popup-closed-by-user") message = "Bạn đã đóng cửa sổ đăng nhập Google";
      if (error.code === "auth/popup-blocked") message = "Trình duyệt đã chặn cửa sổ đăng nhập Google";
      setErrors({ message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-[calc(100vh-156px)] overflow-hidden bg-gradient-to-br from-blue-50 via-white to-slate-100 px-4 py-8 sm:px-6 lg:py-12">
      <div className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-blue-100/70 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-indigo-100/70 blur-3xl" />

      <section className="relative mx-auto grid w-full max-w-6xl overflow-hidden rounded-[28px] border border-white/80 bg-white shadow-[0_24px_80px_rgba(30,64,175,0.16)] lg:grid-cols-[1.02fr_1fr]">
        <aside
          className="relative hidden min-h-[650px] overflow-hidden bg-gradient-to-br from-blue-50 via-sky-100 to-blue-200 p-12 lg:flex lg:flex-col lg:justify-center"
          style={AUTH_BACKGROUND_IMAGE ? { backgroundImage: `linear-gradient(rgba(239,246,255,.3),rgba(219,234,254,.3)),url(${AUTH_BACKGROUND_IMAGE})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
        >
          <div className="relative z-10 max-w-sm rounded-3xl bg-white/72 p-8 backdrop-blur-sm">
            <div className="mb-8 flex items-center gap-3 text-blue-950">
              <img src="/icon.png" alt="Motris Shop" className="h-14 w-14 rounded-full object-cover" />
              <span className="text-xl font-black uppercase tracking-[0.15em]">Motris Shop</span>
            </div>
            <h2 className="text-4xl font-black leading-tight text-blue-950">Welcome Back</h2>
            <p className="mt-4 text-sm leading-6 text-slate-600">Tiếp tục khám phá những sản phẩm hoa tuyệt đẹp và tận hưởng quyền lợi dành riêng cho thành viên.</p>
            <div className="mt-9 space-y-5">
              {[
                [Heart, "Ưu đãi thành viên", "Nhận khuyến mãi và ưu đãi đặc biệt"],
                [ShieldCheck, "An toàn & bảo mật", "Thông tin của bạn luôn được bảo vệ"],
                [Gift, "Nhanh chóng & tiện lợi", "Thanh toán và theo dõi đơn hàng dễ dàng"],
              ].map(([Icon, title, text]) => (
                <div key={title} className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600"><Icon className="h-5 w-5" /></span>
                  <span><b className="block text-sm text-blue-950">{title}</b><span className="text-xs text-slate-500">{text}</span></span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <div className="flex items-center px-6 py-10 sm:px-12 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <div className="text-center">
              <h1 className="text-3xl font-black text-blue-950">Welcome Back</h1>
              <p className="mt-2 text-sm text-slate-500">Đăng nhập để tiếp tục hành trình mua sắm của bạn.</p>
              <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-blue-600" />
            </div>

            {errors.message && <p className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{errors.message}</p>}
            {success && <p className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-600">{success}</p>}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="username" className="mb-2 block text-sm font-bold text-slate-700">Tên đăng nhập</label>
                {errors.username && <p className="mb-2 text-xs text-red-500">{errors.username}</p>}
                <div className="relative"><User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" /><input id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nhập tên đăng nhập" autoComplete="username" className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100" /></div>
              </div>
              <div>
                <label htmlFor="pass" className="mb-2 block text-sm font-bold text-slate-700">Mật khẩu</label>
                {errors.pass && <p className="mb-2 text-xs text-red-500">{errors.pass}</p>}
                <div className="relative"><LockKeyhole className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" /><input id="pass" name="pass" type={showPassword ? "text" : "password"} value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Nhập mật khẩu" autoComplete="current-password" className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-12 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100" /><button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600">{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button></div>
              </div>
              <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600"><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-4 w-4 rounded border-slate-300 accent-blue-600" />Ghi nhớ đăng nhập</label>
              <button type="submit" disabled={loading} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 font-bold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"><LogIn className="h-5 w-5" />{loading ? "Đang xử lý..." : "Đăng nhập"}</button>
            </form>

            <div className="my-7 flex items-center gap-4"><span className="h-px flex-1 bg-slate-200" /><span className="text-xs text-slate-400">hoặc đăng nhập với</span><span className="h-px flex-1 bg-slate-200" /></div>
            <button type="button" onClick={handleGoogleLogin} disabled={loading} className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white font-bold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 disabled:opacity-60"><Globe2 className="h-5 w-5 text-blue-600" />Google</button>
            <p className="mt-7 text-center text-sm text-slate-500">Chưa có tài khoản? <Link href="/register" className="font-bold text-blue-600 hover:text-blue-700">Đăng ký</Link></p>
          </div>
        </div>
      </section>
    </main>
  );
}
