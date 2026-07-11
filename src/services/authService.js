import axiosInstance from "@/lib/axiosInstance";

import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

import { auth } from "@/config/firebase";

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

const saveLoginData = ({ user, token }) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

export const register = async (data) => {
  const res = await axiosInstance.post("/auth/register", data);
  return res.data;
};

export const login = async (data) => {
  const res = await axiosInstance.post("/auth/login", data);

  saveLoginData(res.data);

  return res.data;
};

// Đăng nhập Google bằng Firebase
export const loginWithGoogle = async () => {
  // Mở popup đăng nhập Google
  const firebaseResult = await signInWithPopup(auth, googleProvider);

  // Lấy Firebase ID Token
  const idToken = await firebaseResult.user.getIdToken();

  // Gửi ID Token về backend để xác thực
  const res = await axiosInstance.post("/auth/google", {
    idToken,
  });

  // Backend trả user và token của hệ thống
  saveLoginData(res.data);

  return res.data;
};

export const me = async () => {
  const res = await axiosInstance.get("/auth/me");
  return res.data;
};

export const profile = async (id) => {
  const res = await axiosInstance.get(`/auth/profile/${id}`);

  return res.data;
};

export const updateProfile = async (data) => {
  const res = await axiosInstance.put("/auth/profile/", data);

  return res.data;
};

export const changePassword = async (data) => {
  const res = await axiosInstance.put("/auth/change-password/", data);

  return res.data;
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.warn("Firebase sign out failed:", error);
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  return {
    success: true,
    message: "Logout",
  };
};
