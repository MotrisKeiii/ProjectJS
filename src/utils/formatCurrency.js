// Định dạng tiền tệ Việt Nam
export const formatCurrency = (amount) => {
    return amount.toLocaleString("vi-VN") + " ₫";
};