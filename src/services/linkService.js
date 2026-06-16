import axiosInstance from "@/lib/axiosInstance";

export const getLinks = async (params = {}) => {
    const res = await axiosInstance.get("/links", {
        params: params
    });
    return res.data;
}

export const getLinkById = async (id) => {
    const res = await axiosInstance.get(`/links/${id}`,);
    return res.data;
}

export const createLink = async (data) => {
    const res = await axiosInstance.post("/links", data);
    return res.data;
}

export const updateLink = async (id,data) => {
    const res = await axiosInstance.put(`/links/${id}`, data);
    return res.data;
}

export const deleteLink = async (id) => {
    const res = await axiosInstance.delete(`/links/${id}`);
    return res.data;
}