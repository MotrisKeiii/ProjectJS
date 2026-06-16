import axiosInstance from "@/lib/axiosInstance";

export const getOrders = async (params = {}) => {
    const res = await axiosInstance.get("/orders", {
        params: params
    });
    return res.data;
}
export const getOrderById = async (id) => {
    const res = await axiosInstance.get(`/orders/${id}`,);
    return res.data;
}

export const createOrder = async (data) => {
    const res = await axiosInstance.post("/orders", data);
    return res.data
}
export const updateOrderStatus = async (id, status) => {
    const res = await axiosInstance.put(`/orders/${id}`,{ status });
    return res.data;
}
export const deleteOrder = async (id) => {
    const res = await axiosInstance.delete(`/orders/${id}`);
    return res.data;
}