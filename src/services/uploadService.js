import axiosInstance from "@/lib/axiosInstance";
export const uploadSingleFile = async (file) => {
  const formData = new FormData();
  formData.append("image", file);
  const res = await axiosInstance.post("/upload/single", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const uploadMultipleFiles = async (files) => {
  const formData = new FormData();
  Array.from(files).forEach((file) => formData.append("images", file));

  const res = await axiosInstance.post("/upload/multiple", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
