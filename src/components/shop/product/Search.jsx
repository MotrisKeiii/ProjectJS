"use client";

import { getBrands } from "@/services/brandService";
import { Search as SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const defaultFilters = {
  name: "",
  category: "",
  brand: "",
  price_min: "",
  price_max: "",
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
  "h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

const selectClass =
  "h-10 w-full cursor-pointer rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

const labelClass = "mb-2 block text-xs font-bold text-slate-800";

export function HeaderProductSearch() {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = keyword.trim();
    router.push(name ? `/products?name=${encodeURIComponent(name)}` : "/products");
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="search"
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        placeholder="Tìm kiếm sản phẩm..."
        aria-label="Tìm kiếm sản phẩm"
        className="h-14 w-full rounded-full border border-slate-200 bg-white py-3 pl-6 pr-16 text-base text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      />
      <button
        type="submit"
        aria-label="Tìm kiếm"
        className="absolute inset-y-0 right-1.5 my-auto flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white shadow-md shadow-blue-200 transition hover:bg-blue-700"
      >
        <SearchIcon className="h-5 w-5" />
      </button>
    </form>
  );
}

export default function Search({ categories, setParams, onClose }) {
  const [brands, setBrands] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [priceRange, setPriceRange] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(true);

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
      price_min: min,
      price_max: max,
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
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.07)]"
    >
      <div className="mb-5 flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-xl font-bold leading-6 text-slate-950">Bộ lọc</h2>
          <p className="mt-2 text-xs font-medium text-slate-400">Tìm sản phẩm phù hợp</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={clearFilters}
            className="shrink-0 text-xs font-bold text-blue-600 hover:text-blue-700"
          >
            Xóa lọc
          </button>
          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              aria-label="Đóng bộ lọc"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-2xl leading-none text-slate-600 transition hover:bg-slate-100"
            >
              ×
            </button>
          ) : null}
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
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

        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="submit"
            className="h-10 rounded-lg bg-blue-600 px-4 text-xs font-bold text-white shadow-sm transition hover:bg-blue-700"
          >
            Áp dụng
          </button>

          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="h-10 rounded-lg border border-slate-800 bg-white px-4 text-xs font-bold text-slate-800 shadow-sm transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700"
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
          <div className="space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-3">
            <div>
              <label className={labelClass}>Thương hiệu</label>
              <select
                name="brand"
                className={selectClass}
                value={filters.brand}
                onChange={handleChange}
              >
                <option value="">Tất cả thương hiệu</option>

                {brands.map((brand) => (
                  <option key={brand.brand_id} value={brand.brand_name}>
                    {brand.brand_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Khoảng giá</label>
              <div className="grid grid-cols-[minmax(0,1fr)_64px_64px] items-center gap-3">
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
              <input
                type="number"
                min="0"
                name="price_min"
                placeholder="Min"
                className={inputClass}
                value={filters.price_min}
                onChange={(e) => {
                  setPriceRange("");
                  handleChange(e);
                }}
              />

              <input
                type="number"
                min="0"
                name="price_max"
                placeholder="Max"
                className={inputClass}
                value={filters.price_max}
                onChange={(e) => {
                  setPriceRange("");
                  handleChange(e);
                }}
              />
              </div>
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
