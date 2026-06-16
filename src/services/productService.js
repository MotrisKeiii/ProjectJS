import axiosInstance from "@/lib/axiosInstance";


export const getProducts = async (params = {}) => {
    const res = await axiosInstance.get("/products", {
        params: params
    });
    return res.data;
}
export const getProductById = async (id) => {
    const res = await axiosInstance.get(`/products/${id}`);
    return res.data;
}
export const createProduct = async (data) => {
    const res = await axiosInstance.post("/products", data);
    return res.data;
}
export const updateProduct = async (data, id) => {
    const res = await axiosInstance.put(`/products/${id}`, data);
    return res.data;
}
export const deleteProduct = async (id) => {
    const res = await axiosInstance.delete(`/products/${id}`);
    return res.data;
}
export const getNewProducts = async (params = {}) => {
    const res = await axiosInstance.get("/products/new", {
        params: params
    });
    return res.data;
}
export const getBestSellerProducts = async (params = {}) => {
    const res = await axiosInstance.get("/products/bestseller", {
        params: params
    });
    return res.data;
}
export const getRelatedProducts = async (id, params = {}) => {
    const res = await axiosInstance.get(`/products/related/${id}`, {
        params: params
    });
    return res.data;
}