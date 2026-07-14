import axiosInstance from "@/lib/axiosInstance";

export const getPosts = async (params = {}) => {
  const res = await axiosInstance.get("/posts", { params });
  return res.data;
};

export const getPostById = async (id) => {
  const res = await axiosInstance.get(`/posts/${id}`);
  return res.data;
};

export const createPost = async (data) => {
  const res = await axiosInstance.post("/posts", data);
  return res.data;
};

export const updatePost = async (id, data) => {
  const res = await axiosInstance.put(`/posts/${id}`, data);
  return res.data;
};

export const deletePost = async (id) => {
  const res = await axiosInstance.delete(`/posts/${id}`);
  return res.data;
};
