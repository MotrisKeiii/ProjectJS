import axiosInstance from "@/lib/axiosInstance";


export const getCategories = async (params = {}) => {
    const res = await axiosInstance.get("/categories", {
        params: params
    });
    return res.data;
}
export const getCategoryById = async (id) => {
    const res = await axiosInstance.get(`/categories/${id}`,);
    return res.data;
}
export const createCategory = async (data) => {
    const res = await axiosInstance.post("/categories", data);
    return res.data;
}
export const updateCategory = async (id,data) => {
    const res = await axiosInstance.put(`/categories/${id}`, data);
    return res.data;
}
export const deleteCategory = async (id) => {
    const res = await axiosInstance.delete(`/categories/${id}`);
    return res.data;
}