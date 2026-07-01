"use client"
import { getProductById, updateProduct } from "@/services/productService"
import { isEmpty, validateProduct } from "@/utils/validators";
import { useEffect, useState } from "react";
import CategorySelect from "@/components/common/CategorySelect";
import BrandSelect from "@/components/common/BrandSelect";
import { useParams } from "next/navigation";

const EditForm = (props) => {
    const {id} = useParams();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");

    const [formData, setFormData] = useState({
        product_name: "",
        alias: "",
        cat_id: 1,
        brand_id: 1,
        detail: "",
        price: 200,
        sale_price: "",
        image: "",
        launch_date: "",
        tag: "",
        summary: "",
        status: 1,
        trash: 0,
        view: 50
    });
    // goi api
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const data = await getProductById(id);
                console.log (data)
                setFormData({
                  product_name: data.product_name,
                  alias: data.alias,
                  cat_id: data.cat_id,
                  brand_id: data.brand_id,
                  detail: data.detail,
                  price: data.price,
                  sale_price: data.sale_price,
                  image: data.image,
                  launch_date: data.launch_date,
                  tag: data.tag,
                  summary: data.summary,
                  status: data.status,
                  trash: data.trash,
                  view: data.view,
                });
            } catch (e) {
                setErrors({ message: e.message });
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let newValue = value;
        // checkbox → 0 | 1
        if (type === "checkbox") {
            newValue = checked ? 1 : 0;
        }
        // number → convert sang number
        else if (type === "number") {
            newValue = value === "" ? "" : Number(value);
        }

        // select category / brand
        else if (name === "cat_id" || name === "brand_id") {
            newValue = Number(value);
        }
        setFormData(prev => ({
            ...prev,
            [name]: newValue
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //validation
        const validateErrors = validateProduct(formData);
        setErrors(validateErrors);
        if (!isEmpty(validateErrors)) return;
        // gọi API bằng axios
        try {
            setLoading(true);
            console.log(formData)

            let res = await updateProduct(formData, id);
            console.log(res);
            setSuccess("Cap nhat san pham thanh cong");
        } catch (e) {
            setErrors({ message: e.data.error })
        }
        finally {
            setLoading(false);
        }

    };

    return (
        <>
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow space-y-4">
                <h2 className="text-3xl font-semibold text-gray-800 text-center">Cập Nhật Sản Phẩm Id={id}</h2>
                {success && <p style={{ color: "green" }}>{success}</p>}
                {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}

                {/* Product Name */}
                <div>
                    <label className="block text-sm font-medium mb-1">Tên sản phẩm</label>
                    {errors.product_name && <p style={{ color: "red" }}>{errors.product_name}</p>}
                    <input
                        type="text"
                        name="product_name"
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.product_name || ""}
                        onChange={handleChange}
                    />
                </div>

                {/* Alias */}
                <div>
                    <label className="block text-sm font-medium mb-1">Alias</label>
                    {errors.alias && <p style={{ color: "red" }}>{errors.alias}</p>}

                    <input
                        type="text"
                        name="alias"
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.alias || ""}
                        onChange={handleChange}
                    />
                </div>

                {/* Category vaf Brand */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Category ID</label>
                        {errors.cat_id && <p style={{ color: "red" }}>{errors.cat_id}</p>}

                        <CategorySelect name="cat_id" value={formData.cat_id ?? ""} onChange={handleChange} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Brand ID</label>
                        {errors.brand_id && <p style={{ color: "red" }}>{errors.brand_id}</p>}

                        <BrandSelect name="brand_id" value={formData.brand_id ?? ""} onChange={handleChange} />
                    </div>
                </div>

                {/* Summary */}
                <div>
                    <label className="block text-sm font-medium mb-1">Summary</label>
                    {errors.summary && <p style={{ color: "red" }}>{errors.summary}</p>}
                    <textarea
                        name="summary"
                        rows="2"
                        className="w-full border rounded-lg px-3 py-2"
                        value={formData.summary || ""}
                        onChange={handleChange}
                    />
                </div>

                {/* Detail */}
                <div>
                    <label className="block text-sm font-medium mb-1">Mô tả chi tiết</label>
                    {errors.detail && <p style={{ color: "red" }}>{errors.detail}</p>}
                    <textarea
                        name="detail"
                        rows="3"
                        className="w-full border rounded-lg px-3 py-2"
                        value={formData.detail || ""}
                        onChange={handleChange}
                    />
                    {/* Galaxy S24 Ultra với bút S-Pen, camera 200MP và hiệu năng mạnh mẽ. */}
                </div>

                {/* Price */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div>
                        <label className="block text-sm font-medium mb-1">Giá</label>
                        {errors.price && <p style={{ color: "red" }}>{errors.price}</p>}
                        <input
                            type="number"
                            name="price"
                            className="w-full border rounded-lg px-3 py-2"
                            value={formData.price ?? ""}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Giá khuyến mãi</label>
                        {errors.sale_price && <p style={{ color: "red" }}>{errors.sale_price}</p>}
                        <input
                            type="number"
                            name="sale_price"
                            step="1"
                            className="w-full border rounded-lg px-3 py-2"
                            value={formData.sale_price ?? ""}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Image */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Hình ảnh
                    </label>

                    <input
                        type="text"
                        name="image"
                        className="w-full border rounded-lg px-3 py-2"
                        value={formData.image || ""}
                        onChange={handleChange}
                    />

                </div>
                {/* <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Hình ảnh
                    </label>

                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="mt-1 block w-full text-sm text-gray-700
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100"
                    />

                    <p className="text-sm text-gray-500 mt-1">
                        Ảnh hiện tại: s24-ultra.jpg
                    </p>
                </div> */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* TRASH */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Trash</label>
                        <select
                            name="trash"
                            className="w-full border rounded-lg px-3 py-2"
                            value={formData.trash ?? 0}
                            onChange={handleChange}
                        >
                            <option value="0">Chưa xoá</option>
                            <option value="1">Đã xoá</option>
                        </select>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Status</label>
                        <select
                            name="status"
                            className="w-full border rounded-lg px-3 py-2"
                            value={formData.status ?? 1}
                            onChange={handleChange}
                        >
                            <option value="1">Hiển thị</option>
                            <option value="0">Ẩn</option>
                        </select>
                    </div>
                </div>

                {/* Launch Date */}
                <div>
                    <label className="block text-sm font-medium mb-1">Launch Date</label>
                    {errors.launch_date && <p style={{ color: "red" }}>{errors.launch_date}</p>}
                    <input
                        type="datetime-local"
                        name="launch_date"
                        className="w-full border rounded-lg px-3 py-2"
                        value={formData.launch_date || ""}
                        onChange={handleChange}
                    />
                </div>
                {/* Tag */}
                <div>
                    <label className="block text-sm font-medium mb-1">Tag</label>
                    {errors.tag && <p style={{ color: "red" }}>{errors.tag}</p>}
                    <input
                        type="text"
                        name="tag"
                        className="w-full border rounded-lg px-3 py-2"
                        value={formData.tag || ""}
                        onChange={handleChange}
                    />
                </div>
                {/* View */}
                <div>
                    <label className="block text-sm font-medium mb-1">View</label>
                    {errors.view && <p style={{ color: "red" }}>{errors.view}</p>}
                    <input
                        type="number"
                        name="view"
                        className="w-full border rounded-lg px-3 py-2"
                        value={formData.view ?? ""}
                        onChange={handleChange}
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    disabled={loading}
                >

                    {loading ? "Đang xử lý..." : "Cập nhật sản phẩm"}

                </button>

            </form>
        </>
    );
};

export default EditForm;
