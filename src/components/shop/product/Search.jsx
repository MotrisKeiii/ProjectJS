"use client";

import { getBrands } from "@/services/brandService";
import { useEffect, useState } from "react";

const defaultFilters = {
  name: "",
  category: "",
  brand_id: "",
  min_price: "",
  max_price: "",
  tag: "",
  sort: "",
};

const priceRanges = [
  { label: "Tất cả giá", value: "" },
  { label: "Dưới 100", value: "0|100" },
  { label: "100 - 300", value: "100|300" },
  { label: "300 - 500", value: "300|500" },
  { label: "Trên 500", value: "500|" },
];

const tagOptions = [
  { label: "Tất cả tag", value: "" },
  { label: "New", value: "new" },
  { label: "Hot", value: "hot" },
  { label: "Natural", value: "natural" },
];

const sortOptions = [
  { label: "Mặc định", value: "" },
  { label: "Giá tăng dần", value: "price_asc" },
  { label: "Giá giảm dần", value: "price_desc" },
  { label: "Mới nhất", value: "latest" },
];

const getList = (data) => {
  if (Array.isArray(data)) return data;
  return data?.value || data?.data || [];
};

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

const selectClass =
  "w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

const labelClass = "mb-2 block text-sm font-medium text-slate-600";

export default function Search({ categories, setParams }) {
  const [brands, setBrands] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [priceRange, setPriceRange] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const categoryList = getList(categories);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await getBrands({ trash: 0, status: 1 });
        setBrands(getList(res));
      } catch {
        setBrands([]);
      }
    };

    fetchBrands();
  }, []);

  const updateFilter = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChange = (e) => {
    updateFilter(e.target.name, e.target.value);
  };

  const handlePriceRange = (e) => {
    const value = e.target.value;
    const [min = "", max = ""] = value.split("|");

    setPriceRange(value);

    setFilters((prev) => ({
      ...prev,
      min_price: min,
      max_price: max,
    }));
  };

  const applyFilters = (e) => {
    e.preventDefault();

    const params = {
      page: 1,
      limit: 12,
      trash: 0,
      status: 1,
    };

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== "") {
        params[key] = value;
      }
    });

    setParams(params);
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
    setPriceRange("");

    setParams({
      page: 1,
      limit: 12,
      trash: 0,
      status: 1,
    });
  };

  return (
    <form
      onSubmit={applyFilters}
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Bộ lọc</h2>
          <p className="mt-1 text-xs text-slate-400">Tìm sản phẩm phù hợp</p>
        </div>

        <button
          type="button"
          onClick={clearFilters}
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          Xóa lọc
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className={labelClass}>Tìm kiếm</label>
          <input
            type="search"
            name="name"
            placeholder="Tên sản phẩm..."
            className={inputClass}
            value={filters.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className={labelClass}>Sắp xếp</label>
          <select
            name="sort"
            className={selectClass}
            value={filters.sort}
            onChange={handleChange}
          >
            {sortOptions.map((item) => (
              <option key={item.label} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Áp dụng
          </button>

          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
          >
            {showAdvanced ? "Thu gọn" : "Nâng cao"}
          </button>
        </div>

        <div className="border-t border-slate-100 pt-4">
          <label className={labelClass}>Danh mục</label>
          <select
            name="category"
            className={selectClass}
            value={filters.category}
            onChange={handleChange}
          >
            <option value="">Tất cả danh mục</option>

            {categoryList.map((category) => (
              <option key={category.cat_id} value={category.cat_name}>
                {category.cat_name}
              </option>
            ))}
          </select>
        </div>

        {showAdvanced && (
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div>
              <label className={labelClass}>Thương hiệu</label>
              <select
                name="brand_id"
                className={selectClass}
                value={filters.brand_id}
                onChange={handleChange}
              >
                <option value="">Tất cả thương hiệu</option>

                {brands.map((brand) => (
                  <option key={brand.brand_id} value={brand.brand_id}>
                    {brand.brand_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Khoảng giá</label>
              <select
                className={selectClass}
                value={priceRange}
                onChange={handlePriceRange}
              >
                {priceRanges.map((item) => (
                  <option key={item.label} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
              <input
                type="number"
                min="0"
                name="min_price"
                placeholder="Min"
                className={inputClass}
                value={filters.min_price}
                onChange={(e) => {
                  setPriceRange("");
                  handleChange(e);
                }}
              />

              <span className="text-sm text-slate-400">-</span>

              <input
                type="number"
                min="0"
                name="max_price"
                placeholder="Max"
                className={inputClass}
                value={filters.max_price}
                onChange={(e) => {
                  setPriceRange("");
                  handleChange(e);
                }}
              />
            </div>

            <div>
              <label className={labelClass}>Tag</label>
              <select
                name="tag"
                className={selectClass}
                value={filters.tag}
                onChange={handleChange}
              >
                {tagOptions.map((item) => (
                  <option key={item.label} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
