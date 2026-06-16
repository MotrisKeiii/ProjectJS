import AdminTable from "@/components/admin/AdminTable";
import { products } from "@/data/products";

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "price", label: "Price" },
];

export default function AdminProductsPage() {
  return (
    <div>
      <h1>Admin Products</h1>
      <AdminTable columns={columns} data={products} />
    </div>
  );
}