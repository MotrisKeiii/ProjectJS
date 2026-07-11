import addressData from "vietnam-address-database";

export const getProvinces = () => {
  const table = addressData.find((item) => item.type === "table" && item.name === "provinces");
  return table ? table.data : [];
};

export const getWardsByProvince = (provinceCode) => {
  const table = addressData.find((item) => item.type === "table" && item.name === "wards");
  if (!table) return [];
  return table.data.filter((ward) => ward.province_code === provinceCode);
};
