import Table from "@/components/common/Table";

export default function AdminTable({ columns, data, onEdit, onDelete }) {
  const extendedColumns = [
    {
      key: "stt",
      label: "STT",
      width: "w-20",
    },
    ...columns,
    {
      key: "actions",
      label: "Action",
      width: "w-44",
    },
  ];

  const tableData = data.map((item, index) => ({
    id: item.id || item.product_id,
    stt: index+1, 
    ...item,
    actions: (
      <div className="flex gap-2">
        <button onClick={() => { onEdit && onEdit(item)}} className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Sửa
        </button>

        <button onClick={() => { onDelete && onDelete(item )}} className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600">
          Xóa
        </button>
      </div>
    ),
  }));

  return <Table columns={extendedColumns} data={tableData} />;
}
