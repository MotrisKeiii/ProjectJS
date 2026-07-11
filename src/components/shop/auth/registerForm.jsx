"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Gift, Globe2, LockKeyhole, Mail, ShieldCheck, Tag, User, UserPlus } from "lucide-react";
import { isEmpty, validateRegister } from "@/utils/validators";
import { loginWithGoogle, register } from "@/services/authService";
import { AuthContext } from "@/context/AuthProvider";

// đổi ảnh nền của form đăng ký
const AUTH_BACKGROUND_IMAGE = "";

export default function RegisterForm() {
  const [form, setForm] = useState({ username: "", fullname: "", email: "", pass: "", confirm_password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const { setUser } = useContext(AuthContext);

  const updateField = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateRegister(form);
    setErrors(validationErrors);
    if (!isEmpty(validationErrors)) return;
    try {
      setLoading(true);
      await register({ username: form.username, fullname: form.fullname, email: form.email, pass: form.pass });
      setSuccess("Đăng ký thành công");
      router.push("/login");
    } catch (error) {
      setErrors({ message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      setLoading(true);
      setErrors({});
      const res = await loginWithGoogle();
      setUser(res.user);
      router.push(res.user.user_type === "admin" ? "/admin" : "/");
    } catch (error) {
      setErrors({ message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: "username", label: "Tên đăng nhập", placeholder: "Chọn tên đăng nhập", icon: User, type: "text", autoComplete: "username" },
    { name: "fullname", label: "Họ và tên", placeholder: "Nhập họ và tên", icon: User, type: "text", autoComplete: "name" },
    { name: "email", label: "Email", placeholder: "Nhập địa chỉ email", icon: Mail, type: "email", autoComplete: "email" },
  ];

  return (
    <main className="relative min-h-[calc(100vh-156px)] overflow-hidden bg-gradient-to-br from-blue-50 via-white to-slate-100 px-4 py-8 sm:px-6 lg:py-12">
      <div className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-blue-100/70 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-indigo-100/70 blur-3xl" />
      <section className="relative mx-auto grid w-full max-w-6xl overflow-hidden rounded-[28px] border border-white/80 bg-white shadow-[0_24px_80px_rgba(30,64,175,0.16)] lg:grid-cols-[1fr_1.05fr]">
        <aside className="relative hidden min-h-[720px] overflow-hidden bg-gradient-to-br from-blue-50 via-sky-100 to-blue-200 p-12 lg:flex lg:flex-col lg:justify-center" style={AUTH_BACKGROUND_IMAGE ? { backgroundImage: `linear-gradient(rgba(239,246,255,.3),rgba(219,234,254,.3)),url(${AUTH_BACKGROUND_IMAGE})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}>
          <div className="relative z-10 max-w-sm rounded-3xl bg-white/72 p-8 backdrop-blur-sm">
            <div className="mb-8 flex items-center gap-3 text-blue-950"><img src="/icon.png" alt="Motris Shop" className="h-14 w-14 rounded-full object-cover" /><span className="text-xl font-black uppercase tracking-[0.15em]">Motris Shop</span></div>
            <h2 className="text-4xl font-black leading-tight text-blue-950">Welcome to<br />Motris Shop</h2>
            <p className="mt-4 text-sm leading-6 text-slate-600">Tạo tài khoản để khám phá bộ sưu tập hoa và tận hưởng trải nghiệm mua sắm trọn vẹn.</p>
            <div className="mt-9 space-y-5">
              {[[Tag, "Ưu đãi độc quyền", "Khuyến mãi dành riêng cho thành viên"], [ShieldCheck, "Bảo mật & riêng tư", "Thông tin của bạn luôn được an toàn"], [Gift, "Nhanh chóng & dễ dàng", "Thanh toán và theo dõi đơn hàng tiện lợi"]].map(([Icon, title, text]) => <div key={title} className="flex items-center gap-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600"><Icon className="h-5 w-5" /></span><span><b className="block text-sm text-blue-950">{title}</b><span className="text-xs text-slate-500">{text}</span></span></div>)}
            </div>
          </div>
        </aside>

        <div className="flex items-center px-6 py-9 sm:px-12 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <div className="text-center"><h1 className="text-3xl font-black text-blue-950">Create Account</h1><p className="mt-2 text-sm text-slate-500">Tham gia cùng chúng tôi và để mọi khoảnh khắc nở hoa.</p><div className="mx-auto mt-5 h-1 w-16 rounded-full bg-blue-600" /></div>
            {errors.message && <p className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{errors.message}</p>}
            {success && <p className="mt-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-600">{success}</p>}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {fields.map(({ name, label, placeholder, icon: Icon, type, autoComplete }) => <div key={name}><label htmlFor={name} className="mb-1.5 block text-xs font-bold text-slate-700">{label}</label>{errors[name] && <p className="mb-1 text-xs text-red-500">{errors[name]}</p>}<div className="relative"><Icon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" /><input id={name} name={name} type={type} value={form[name]} onChange={updateField} placeholder={placeholder} autoComplete={autoComplete} className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100" /></div></div>)}
              <div><label htmlFor="register-pass" className="mb-1.5 block text-xs font-bold text-slate-700">Mật khẩu</label>{errors.pass && <p className="mb-1 text-xs text-red-500">{errors.pass}</p>}<div className="relative"><LockKeyhole className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" /><input id="register-pass" name="pass" type={showPassword ? "text" : "password"} value={form.pass} onChange={updateField} placeholder="Tạo mật khẩu" autoComplete="new-password" className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-12 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100" /><button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600">{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button></div></div>
              <div><label htmlFor="confirm-password" className="mb-1.5 block text-xs font-bold text-slate-700">Xác nhận mật khẩu</label>{errors.confirm_password && <p className="mb-1 text-xs text-red-500">{errors.confirm_password}</p>}<div className="relative"><LockKeyhole className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" /><input id="confirm-password" name="confirm_password" type={showConfirmPassword ? "text" : "password"} value={form.confirm_password} onChange={updateField} placeholder="Nhập lại mật khẩu" autoComplete="new-password" className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-12 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100" /><button type="button" onClick={() => setShowConfirmPassword((value) => !value)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600">{showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button></div></div>
              <button type="submit" disabled={loading} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 font-bold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 disabled:opacity-60"><UserPlus className="h-5 w-5" />{loading ? "Đang xử lý..." : "Đăng ký"}</button>
            </form>
            <div className="my-5 flex items-center gap-4"><span className="h-px flex-1 bg-slate-200" /><span className="text-xs text-slate-400">hoặc đăng ký với</span><span className="h-px flex-1 bg-slate-200" /></div>
            <button type="button" onClick={handleGoogleRegister} disabled={loading} className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white font-bold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 disabled:opacity-60"><Globe2 className="h-5 w-5 text-blue-600" />Google</button>
            <p className="mt-5 text-center text-sm text-slate-500">Đã có tài khoản? <Link href="/login" className="font-bold text-blue-600 hover:text-blue-700">Đăng nhập</Link></p>
          </div>
        </div>
      </section>
    </main>
  );
}
