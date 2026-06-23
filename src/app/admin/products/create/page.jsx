'use client';
import { useState } from 'react';
import { validateProduct } from '@/utils/validators';
import { createProduct } from "@/services/productService";

export default function CreateForm(props) {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    product_name: '',
    alias: '',
    cat_id: '',
    brand_id: '',
    detail: '',
    price: '',
    sale_price: '',
    image: '',
    launch_date: '',
    tag: '',
    summary: '',
    status: '1',
    trash: 0,
    view: 50,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = value;
    // checkbox → 0 | 1
    if (type === 'checkbox') {
      newValue = checked ? 1 : 0;
    }
    // number → convert sang number
    else if (type === 'number') {
      newValue = value === '' ? '' : Number(value);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const validateErrors = validateProduct(formData);
  setErrors(validateErrors);

  if (!isEmpty(validateErrors)) return;

  // Gọi API bằng axios ở đây
  let res = await createProduct(formData);
  console.log(res);
  // createProduct
};

  return (
    <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Thêm sản phẩm</h2>
        <p className="mt-1 text-sm text-slate-500">
          Nhập thông tin chi tiết cho sản phẩm mới
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Tên sản phẩm
            </label>
            {errors.product_name && <p style={{ color: "red" }}>{errors.product_name }</p>}
            <input
              type="text"
              name="product_name"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              value={formData.product_name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Alias
            </label>
            {errors.alias && <p style={{ color: "red" }}>{errors.alias }</p>}
            <input
              type="text"
              name="alias"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              value={formData.alias}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Danh mục
            </label>
            <div>
              <select
                name="cat_id"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                value={formData.cat_id}
                onChange={handleChange}
              >
                <option value="1">Điện thoại</option>
                <option value="2">Laptop</option>
                <option value="3">Máy tính bảng</option>
                <option value="4">Phụ kiện</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Thương hiệu
            </label>
            <div>
              <select
                name="brand_id"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                value={formData.brand_id}
                onChange={handleChange}
              >
                <option value="1">Apple</option>
                <option value="2">Samsung</option>
                <option value="3">Xiaomi</option>
                <option value="4">Oppo</option>
                <option value="5">Vivo</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Giá
            </label>
            {errors.price && <p style={{ color: "red" }}>{errors.price }</p>}
            <input
              type="number"
              name="price"
              step="1"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Giá khuyến mãi
            </label>
            {errors.sale_price && <p style={{ color: "red" }}>{errors.sale_price }</p>}
            <input
              type="number"
              name="sale_price"
              step="1"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              value={formData.sale_price}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Hình ảnh
            </label>
            <input
              type="text"
              name="image"
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-blue-700 hover:file:bg-blue-100"
              value={formData.image}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Ngày ra mắt
            </label>
            {errors.launch_date && <p style={{ color: "red" }}>{errors.launch_date }</p>}
            <input
              type="datetime-local"
              name="launch_date"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              value={formData.launch_date}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Trash
            </label>
            <select
              name="trash"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              value={formData.trash}
              onChange={handleChange}
            >
              <option value="0">Không</option>
              <option value="1">Có</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Trạng thái
            </label>
            <select
              name="status"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="1">Hiển thị</option>
              <option value="0">Ẩn</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Tag
            </label>
            {errors.tag && <p style={{ color: "red" }}>{errors.tag }</p>}
            <input
              type="text"
              name="tag"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              value={formData.tag}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Lượt xem
            </label>
            <input
              type="number"
              name="view"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              value={formData.view}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Tóm tắt
          </label>
          {errors.summary && <p style={{ color: "red" }}>{errors.summary }</p>}
          <textarea
            name="summary"
            rows="3"
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            value={formData.summary}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Chi tiết
          </label>
          {errors.detail && <p style={{ color: "red" }}>{errors.detail }</p>}
          <textarea
            name="detail"
            rows="5"
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            value={formData.detail}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-6">
          <button
            type="reset"
            className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Làm lại
          </button>

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-200"
          >
            Lưu sản phẩm
          </button>
        </div>
      </form>
    </div>
  );
}
