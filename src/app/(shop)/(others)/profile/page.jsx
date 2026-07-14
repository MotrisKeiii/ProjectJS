"use client";
import { useEffect, useRef, useState } from "react";
import { uploadSingleFile } from "@/services/uploadService";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  Camera,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  Save,
  User,
} from "lucide-react";

import { useAuth } from "@/context/AuthProvider";
import { me, updateProfile, changePassword } from "@/services/authService";

const initialProfile = {
  username: "",
  fullname: "",
  email: "",
  phone: "",
  address: "",
  birthday: "",
  gender: "",
  avatar: "",
  created_at: "",
};

const initialPassword = {
  oldPass: "",
  newPass: "",
  confirmPass: "",
};

function formatDateForInput(value) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toISOString().split("T")[0];
}

function formatDisplayDate(value) {
  if (!value) return "Chưa có thông tin";

  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

export default function ProfilePage() {
  
  const router = useRouter();
  const { user, setUser, authLoading } = useAuth();

  const [profile, setProfile] = useState(initialProfile);
  const [passwordForm, setPasswordForm] = useState(initialPassword);

  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const [profileMessage, setProfileMessage] = useState("");
  const [profileError, setProfileError] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [avatarError, setAvatarError] = useState("");

  const galleryInputRef = useRef(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (!user) return;

    const loadProfile = async () => {
      try {
        setLoading(true);
        setProfileError("");

        const data = await me();

        setProfile({
          username: data.username || "",
          fullname: data.fullname || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
          birthday: formatDateForInput(data.birthday),
          gender: data.gender || "",
          avatar: data.avatar || "",
          created_at: data.created_at || "",
        });
      } catch (error) {
        if (error.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
          router.replace("/login");
          return;
        }

        setProfileError(error.message || "Không thể tải thông tin cá nhân");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user, router, setUser]);

  const handleProfileChange = (event) => {
    const { name, value } = event.target;

    setProfile((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;

    setPasswordForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setAvatarError("Vui lòng chọn đúng định dạng ảnh");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setAvatarError("Ảnh không được lớn hơn 5MB");
      return;
    }

    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview);
    }

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
    setAvatarError("");
    event.target.value = "";
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();

    try {
      setSavingProfile(true);
      setProfileMessage("");
      setProfileError("");

      if (!profile.fullname.trim()) {
        throw new Error("Vui lòng nhập họ và tên");
      }

      let avatar = profile.avatar;

      if (avatarFile) {
        const uploadResult = await uploadSingleFile(avatarFile);
        avatar = uploadResult.file;
      }

      await updateProfile({
        fullname: profile.fullname,
        phone: profile.phone,
        address: profile.address,
        birthday: profile.birthday || null,
        gender: profile.gender || null,
        avatar,
      });

      const freshUser = await me();

      setProfile((current) => ({
        ...current,
        username: freshUser.username || "",
        fullname: freshUser.fullname || "",
        email: freshUser.email || "",
        phone: freshUser.phone || "",
        address: freshUser.address || "",
        birthday: formatDateForInput(freshUser.birthday),
        gender: freshUser.gender || "",
        avatar: freshUser.avatar || "",
        created_at: freshUser.created_at || "",
      }));

      const userForStorage = {
        ...user,
        user_id: freshUser.user_id,
        username: freshUser.username,
        fullname: freshUser.fullname,
        email: freshUser.email,
        avatar: freshUser.avatar,
        user_type: freshUser.user_type,
      };

      setUser(userForStorage);

      localStorage.setItem("user", JSON.stringify(userForStorage));
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }

      setAvatarFile(null);
      setAvatarPreview("");
      setProfileMessage("Cập nhật thông tin thành công");
    } catch (error) {
      setProfileError(error.message || "Cập nhật thông tin thất bại");
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();

    try {
      setSavingPassword(true);
      setPasswordMessage("");
      setPasswordError("");

      if (
        !passwordForm.oldPass ||
        !passwordForm.newPass ||
        !passwordForm.confirmPass
      ) {
        throw new Error("Vui lòng nhập đầy đủ thông tin mật khẩu");
      }

      if (passwordForm.newPass.length < 6) {
        throw new Error("Mật khẩu mới phải có ít nhất 6 ký tự");
      }

      if (passwordForm.newPass !== passwordForm.confirmPass) {
        throw new Error("Xác nhận mật khẩu mới không khớp");
      }

      await changePassword({
        oldPass: passwordForm.oldPass,
        newPass: passwordForm.newPass,
      });

      setPasswordForm(initialPassword);
      setPasswordMessage("Đổi mật khẩu thành công");
    } catch (error) {
      setPasswordError(error.message || "Đổi mật khẩu thất bại");
    } finally {
      setSavingPassword(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="mx-auto min-h-[500px] max-w-6xl px-5 py-12">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          Đang tải thông tin cá nhân...
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
          Tài khoản
        </p>

        <h1 className="mt-2 text-3xl font-black text-slate-900">
          Hồ sơ cá nhân
        </h1>

        <p className="mt-2 text-slate-500">
          Quản lý thông tin cá nhân và mật khẩu của bạn.
        </p>
      </div>

      <div className="grid gap-7 lg:grid-cols-[320px_1fr]">
        <aside className="h-fit rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              {avatarPreview || profile.avatar ? (
                <img
                  src={avatarPreview || profile.avatar}
                  alt={profile.fullname}
                  className="h-28 w-28 rounded-full border-4 border-blue-50 object-cover"
                />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-blue-50 bg-slate-100">
                  <User className="h-12 w-12 text-slate-400" />
                </div>
              )}

              <button
                type="button"
                onClick={() => galleryInputRef.current?.click()}
                className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-blue-600 text-white"
                aria-label="Chọn ảnh đại diện"
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>

            <input
              ref={galleryInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleAvatarChange}
            />

            {avatarError && (
              <p className="mt-2 text-sm font-semibold text-red-500">
                {avatarError}
              </p>
            )}

            <h2 className="mt-4 text-xl font-black text-slate-900">
              {profile.fullname || "Người dùng"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">@{profile.username}</p>
          </div>

          <div className="mt-6 space-y-4 border-t border-slate-100 pt-6">
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 text-blue-600" />

              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase text-slate-400">
                  Email
                </p>

                <p className="truncate text-sm font-semibold text-slate-700">
                  {profile.email}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CalendarDays className="mt-0.5 h-5 w-5 text-blue-600" />

              <div>
                <p className="text-xs font-semibold uppercase text-slate-400">
                  Ngày tham gia
                </p>

                <p className="text-sm font-semibold text-slate-700">
                  {formatDisplayDate(profile.created_at)}
                </p>
              </div>
            </div>
          </div>
        </aside>

        <div className="space-y-7">
          <form
            onSubmit={handleProfileSubmit}
            className="rounded-3xl bg-white p-6 shadow-sm sm:p-8"
          >
            <div className="mb-6">
              <h2 className="text-xl font-black text-slate-900">
                Thông tin cá nhân
              </h2>
            </div>

            {profileMessage ? (
              <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                {profileMessage}
              </div>
            ) : null}

            {profileError ? (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                {profileError}
              </div>
            ) : null}

            <div className="grid gap-5 md:grid-cols-2">
              <ProfileInput
                label="Họ và tên"
                name="fullname"
                value={profile.fullname}
                onChange={handleProfileChange}
                icon={User}
                required
              />

              

              <ProfileInput
                label="Số điện thoại"
                name="phone"
                type="tel"
                value={profile.phone}
                onChange={handleProfileChange}
                icon={Phone}
                placeholder="Nhập số điện thoại"
              />

              <ProfileInput
                label="Ngày sinh"
                name="birthday"
                type="date"
                value={profile.birthday}
                onChange={handleProfileChange}
                icon={CalendarDays}
              />

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Giới tính
                </label>

                <select
                  name="gender"
                  value={profile.gender}
                  onChange={handleProfileChange}
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  <option value="">Chưa chọn</option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Địa chỉ
                </label>

                <div className="relative">
                  <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />

                  <textarea
                    name="address"
                    value={profile.address}
                    onChange={handleProfileChange}
                    rows={3}
                    placeholder="Nhập địa chỉ"
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>
            </div>

            <div className="mt-7 flex justify-end">
              <button
                type="submit"
                disabled={savingProfile}
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save className="h-5 w-5" />

                {savingProfile ? "Đang lưu..." : "Lưu thay đổi"}
              </button>
            </div>
          </form>

          <form
            onSubmit={handlePasswordSubmit}
            className="rounded-3xl bg-white p-6 shadow-sm sm:p-8"
          >
            <div className="mb-6">
              <h2 className="flex items-center gap-2 text-xl font-black text-slate-900">
                <LockKeyhole className="h-5 w-5 text-blue-600" />
                Đổi mật khẩu
              </h2>
            </div>

            {passwordMessage ? (
              <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                {passwordMessage}
              </div>
            ) : null}

            {passwordError ? (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                {passwordError}
              </div>
            ) : null}

            <div className="grid gap-5 md:grid-cols-3">
              <ProfileInput
                label="Mật khẩu hiện tại"
                name="oldPass"
                type="password"
                value={passwordForm.oldPass}
                onChange={handlePasswordChange}
                icon={LockKeyhole}
              />

              <ProfileInput
                label="Mật khẩu mới"
                name="newPass"
                type="password"
                value={passwordForm.newPass}
                onChange={handlePasswordChange}
                icon={LockKeyhole}
              />

              <ProfileInput
                label="Xác nhận mật khẩu"
                name="confirmPass"
                type="password"
                value={passwordForm.confirmPass}
                onChange={handlePasswordChange}
                icon={LockKeyhole}
              />
            </div>

            <div className="mt-7 flex justify-end">
              <button
                type="submit"
                disabled={savingPassword}
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-slate-900 px-6 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <LockKeyhole className="h-5 w-5" />

                {savingPassword ? "Đang cập nhật..." : "Đổi mật khẩu"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function ProfileInput({ label, icon: Icon, disabled = false, ...inputProps }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </label>

      <div className="relative">
        {Icon ? (
          <Icon className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
        ) : null}

        <input
          {...inputProps}
          disabled={disabled}
          className={`h-12 w-full rounded-xl border px-4 text-sm outline-none transition ${
            Icon ? "pl-12" : ""
          } ${
            disabled
              ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-500"
              : "border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          }`}
        />
      </div>
    </div>
  );
}
