import axiosInstance from "@/lib/axiosInstance";

export const getTopics = async (params = {}) => {
  const res = await axiosInstance.get("/topics", { params });
  return res.data;
};
