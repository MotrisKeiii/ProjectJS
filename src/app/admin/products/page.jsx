"use client";

import AdminTable from "@/components/admin/AdminTable";
import { deleteProduct, getProducts } from "@/services/productService";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Pagination from "@/components/common/Pagination";

const columns = [
  { key: "product_id", label: "ID", width: "w-24" },
  { key: "product_name", label: "Product Name" },
  { key: "price", label: "Price", width: "w-32" },
  { key: "status", label: "Status", width: "w-28" },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalpages] = useState(0);
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    trash: 0
  });


  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleDelete = async (product) => {
    const confirmDelete = window.confirm(
      `Bạn có chắc muốn xóa "${product.product_name}" không?`,
    );
    if (!confirmDelete) return;
    try {
      setLoading(true);
      setErrors({});
      setSuccess("");

      await deleteProduct(product.product_id);
      setSuccess("Xóa sản phẩm thành công!");
    } catch (error) {
      setErrors({
        message: "Xóa thất bại!",
      });
    } finally {
      setLoading(false);
    }
  };

  const router = useRouter();
  const handleEdit = (product) => {
    router.push(`/admin/products/${product.product_id}`);
  };
  // Goi api
  useEffect(() => {
    // ham fetchData
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getProducts(params);
        setProducts(data.data);
        setTotalpages(data.totalPage || 0)
      } catch (e) {
        setErrors({ message: e.data });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params]);
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Products</h1>
        <Link
          href="/admin/products/create"
          className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
        >
          Create product
        </Link>
      </div>
      {success ? <p> {success} </p> : ""}
      {errors ? <p> {errors.message} </p> : ""}
      <AdminTable columns={columns} data={products} onEdit={handleEdit} onDelete={handleDelete} />
      <Pagination totalPages={totalPages} params={params} onChangeParams={setParams} />
    </div>
  );
}
