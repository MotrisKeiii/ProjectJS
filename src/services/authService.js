import axiosInstance from "@/lib/axiosInstance";

export const register = async (data) => {
  let res = await axiosInstance.post("/auth/register", data);
  return res.data;
};

export const login = async (data) => {
  let res = await axiosInstance.post("/auth/login", data);
  let { user, token } = res.data;
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  return res.data;
};
export const me = async () => {
  let res = await axiosInstance.get("/auth/me");
  return res.data;
};
export const profile = async (id) => {
  let res = await axiosInstance.get(`/auth/profile/${id}`);
  return res.data;
};
export const updateProfile = async (data) => {
  let res = await axiosInstance.put("/auth/profile/", data);
  return res.data;
};
export const changePassword = async (data) => {
  let res = await axiosInstance.put("/auth/change-password/", data);
  return res.data;
};
export const logout = () => {
  F;
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return { success: true, message: "Logout" };
};
