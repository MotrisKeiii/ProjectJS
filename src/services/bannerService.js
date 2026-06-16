import axiosInstance from "@/lib/axiosInstance";

export const getBanners = async (params = {}) => {
    const res = await axiosInstance.get("/banners", {
        params: params
    });
    return res.data;
}
export const getBannerById = async (id) => {
    const res = await axiosInstance.get(`/banners/${id}`,);
    return res.data;
}
export const createBanner = async (data) => {
    const res = await axiosInstance.post("/banners", data);
    return res.data;
}//xoa [0] trong bannerController.js    
// ham create:  res.status(201).json({ id: result[0].insertId, ...req.body });

export const updateBanner = async (id,data) => {
    const res = await axiosInstance.put(`/banners/${id}`, data);
    return res.data;
}

export const deleteBanner = async (id) => {
    const res = await axiosInstance.delete(`/banners/${id}`);
    return res.data;
}