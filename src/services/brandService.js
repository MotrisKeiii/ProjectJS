import axiosInstance from "@/lib/axiosInstance";


export const getBrands = async (params = {}) => {
    const res = await axiosInstance.get("/brands", {
        params: params
    });
    return res.data;
}
export const getBrandById = async (id) => {
    const res = await axiosInstance.get(`/brands/${id}`,);
    return res.data;
}
export const createBrand = async (data) => {
    const res = await axiosInstance.post("/brands", data);
    return res.data;
};//xoa [0] trong brandController.js    
// ham create:  res.status(201).json({ id: result[0].insertId, ...req.body });


export const updateBrand = async (id,data) => {
    const res = await axiosInstance.put(`/brands/${id}`, data);
    return res.data;
}

export const deleteBrand = async (id) => {
    const res = await axiosInstance.delete(`/brands/${id}`);
    return res.data;
}