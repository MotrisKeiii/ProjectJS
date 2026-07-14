"use client";

import BrandSelect from "@/components/common/BrandSelect";
import CategorySelect from "@/components/common/CategorySelect";
import UploadSingleFile from "@/components/admin/Upload";
import { uploadMultipleFiles } from "@/services/uploadService";
import { isEmpty, validateProduct } from "@/utils/validators";
import Link from "next/link";
import { useState } from "react";

const emptyProduct = {
  product_name: "",
  alias: "",
  cat_id: 1,
  brand_id: 1,
  detail: "",
  price: 200,
  sale_price: "",
  image: "",
  product_images: [],
  launch_date: "",
  tag: "",
  summary: "",
  status: 1,
  trash: 0,
  view: 50,
};

const inputClass = "w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

const parseProductImages = (images) => {
  if (Array.isArray(images)) return images;
  if (!images) return [];
  try {
    const parsed = JSON.parse(images);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return images.split(",").map((image) => image.trim()).filter(Boolean);
  }
};

const getImageUrl = (image) =>
  image?.startsWith("http") ? image : `${process.env.NEXT_PUBLIC_IMG_URL || ""}${image}`;

const toProductPayload = (data) => ({
  product_name: data.product_name,
  alias: data.alias,
  cat_id: data.cat_id,
  brand_id: data.brand_id,
  detail: data.detail,
  price: data.price,
  sale_price: data.sale_price,
  image: data.image,
  product_images: JSON.stringify(data.product_images),
  launch_date: data.launch_date,
  tag: data.tag,
  summary: data.summary,
  status: data.status,
  trash: data.trash,
  view: data.view,
});

function FieldError({ children }) {
  return children ? <p className="mb-1 text-sm text-red-500">{children}</p> : null;
}

export default function ProductForm({ initialData = emptyProduct, onSubmit, title, submitLabel }) {
  const [formData, setFormData] = useState({
    ...emptyProduct,
    ...initialData,
    product_images: parseProductImages(initialData.product_images),
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [relatedFiles, setRelatedFiles] = useState([]);
  const [uploadingRelated, setUploadingRelated] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    let nextValue = type === "checkbox" ? (checked ? 1 : 0) : value;
    if (["cat_id", "brand_id", "price", "sale_price", "status", "trash", "view"].includes(name)) {
      nextValue = value === "" ? "" : Number(value);
    }
    setFormData((current) => ({ ...current, [name]: nextValue }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateProduct(formData);
    setErrors(validationErrors);
    if (!isEmpty(validationErrors)) return;

    try {
      setLoading(true);
      await onSubmit(toProductPayload(formData));
    } catch (error) {
      setErrors({ message: error?.data?.error || error?.message || "Có lỗi xảy ra" });
    } finally {
      setLoading(false);
    }
  };

  const handleRelatedUpload = async () => {
    if (!relatedFiles.length) {
      setErrors((current) => ({ ...current, product_images: "Vui lòng chọn ít nhất một ảnh" }));
      return;
    }

    try {
      setUploadingRelated(true);
      const response = await uploadMultipleFiles(relatedFiles);
      const names = (response.files || []).map((url) => url.split("/").pop());
      setFormData((current) => ({
        ...current,
        product_images: [...current.product_images, ...names],
      }));
      setRelatedFiles([]);
      setErrors((current) => ({ ...current, product_images: "" }));
    } catch (error) {
      setErrors((current) => ({
        ...current,
        product_images: error?.message || "Upload nhiều ảnh thất bại",
      }));
    } finally {
      setUploadingRelated(false);
    }
  };

  const removeRelatedImage = (indexToRemove) => {
    setFormData((current) => ({
      ...current,
      product_images: current.product_images.filter((_, index) => index !== indexToRemove),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-4 rounded-xl bg-white p-6 shadow">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
        <Link href="/admin/products" className="text-sm font-semibold text-blue-600 hover:text-blue-700">Quay lại</Link>
      </div>
      {errors.message && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{errors.message}</p>}

      <div>
        <label className="mb-1 block text-sm font-medium">Tên sản phẩm</label>
        <FieldError>{errors.product_name}</FieldError>
        <input name="product_name" value={formData.product_name || ""} onChange={handleChange} className={inputClass} />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Alias</label>
        <FieldError>{errors.alias}</FieldError>
        <input name="alias" value={formData.alias || ""} onChange={handleChange} className={inputClass} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Danh mục</label>
          <FieldError>{errors.cat_id}</FieldError>
          <CategorySelect name="cat_id" value={formData.cat_id ?? ""} onChange={handleChange} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Thương hiệu</label>
          <FieldError>{errors.brand_id}</FieldError>
          <BrandSelect name="brand_id" value={formData.brand_id ?? ""} onChange={handleChange} />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Mô tả ngắn</label>
        <FieldError>{errors.summary}</FieldError>
        <textarea name="summary" rows={2} value={formData.summary || ""} onChange={handleChange} className={inputClass} />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Mô tả chi tiết</label>
        <FieldError>{errors.detail}</FieldError>
        <textarea name="detail" rows={4} value={formData.detail || ""} onChange={handleChange} className={inputClass} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Giá</label>
          <FieldError>{errors.price}</FieldError>
          <input type="number" name="price" value={formData.price ?? ""} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Giá khuyến mãi</label>
          <FieldError>{errors.sale_price}</FieldError>
          <input type="number" name="sale_price" value={formData.sale_price ?? ""} onChange={handleChange} className={inputClass} />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Hình ảnh</label>
        <FieldError>{errors.image}</FieldError>
        <input name="image" value={formData.image || ""} onChange={handleChange} className={`${inputClass} mb-3`} />
        <UploadSingleFile onUploadSuccess={(image) => setFormData((current) => ({ ...current, image }))} />
      </div>

      <div className="rounded-xl border border-slate-200 p-4">
        <label className="mb-1 block text-sm font-medium">Hình ảnh liên quan</label>
        <p className="mb-3 text-xs text-slate-500">Có thể chọn tối đa 5 ảnh trong mỗi lần upload.</p>
        <FieldError>{errors.product_images}</FieldError>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(event) => setRelatedFiles(Array.from(event.target.files || []).slice(0, 5))}
          className="block w-full text-sm text-slate-600"
        />
        <button
          type="button"
          onClick={handleRelatedUpload}
          disabled={uploadingRelated || !relatedFiles.length}
          className="mt-3 rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-900 disabled:opacity-50"
        >
          {uploadingRelated ? "Đang upload..." : `Upload ${relatedFiles.length || "nhiều"} ảnh`}
        </button>

        {formData.product_images.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {formData.product_images.map((image, index) => (
              <div key={`${image}-${index}`} className="relative overflow-hidden rounded-lg border bg-slate-50">
                <img src={getImageUrl(image)} alt={`Ảnh liên quan ${index + 1}`} className="h-28 w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeRelatedImage(index)}
                  className="absolute right-1 top-1 rounded bg-red-600 px-2 py-1 text-xs font-semibold text-white hover:bg-red-700"
                >
                  Xoá
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Trash</label>
          <select name="trash" value={formData.trash ?? 0} onChange={handleChange} className={inputClass}>
            <option value={0}>Chưa xoá</option><option value={1}>Đã xoá</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Trạng thái</label>
          <select name="status" value={formData.status ?? 1} onChange={handleChange} className={inputClass}>
            <option value={1}>Hiển thị</option><option value={0}>Ẩn</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Ngày ra mắt</label>
        <FieldError>{errors.launch_date}</FieldError>
        <input type="datetime-local" name="launch_date" value={formData.launch_date || ""} onChange={handleChange} className={inputClass} />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Tag</label>
        <FieldError>{errors.tag}</FieldError>
        <input name="tag" value={formData.tag || ""} onChange={handleChange} className={inputClass} />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Lượt xem</label>
        <FieldError>{errors.view}</FieldError>
        <input type="number" name="view" value={formData.view ?? ""} onChange={handleChange} className={inputClass} />
      </div>

      <button type="submit" disabled={loading} className="w-full rounded-lg bg-blue-600 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:opacity-50">
        {loading ? "Đang xử lý..." : submitLabel}
      </button>
    </form>
  );
}
