import axiosInstance from "@/lib/axiosInstance";

export const getPages = async (params = {}) => {
    const res = await axiosInstance.get("/pages", {
        params: params
    });
    return res.data;
}

export const getPageById = async (id) => {
    const res = await axiosInstance.get(`/pages/${id}`,);
    return res.data;
}

export const createPage = async (data) => {
    const res = await axiosInstance.post("/pages", data);
    return res.data;
}
export const updatePage = async (id,data) => {
    const res = await axiosInstance.put(`/pages/${id}`, data);
    return res.data;
}

export const deletePage = async (id) => {
    const res = await axiosInstance.delete(`/pages/${id}`);
    return res.data;
}