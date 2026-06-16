import axiosInstance from "@/lib/axiosInstance";


export const getContacts = async (params = {}) => {
    const res = await axiosInstance.get("/contacts", {
        params: params
    });
    return res.data;
}

export const getContactById = async (id) => {
    const res = await axiosInstance.get(`/contacts/${id}`,);
    return res.data;
}

export const createContact = async (data) => {
    const res = await axiosInstance.post("/contacts", data);
    return res.data;
}

export const updateContact = async (id,data) => {
    const res = await axiosInstance.put(`/contacts/${id}`, data);
    return res.data;
}
export const deleteContact = async (id) => {
    const res = await axiosInstance.delete(`/contacts/${id}`);
    return res.data;
}