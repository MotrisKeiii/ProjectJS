import Table from "@/components/common/Table";

export default function AdminTable({ columns, data }) {
  const extendedColumns = [
    ...columns,
    {
      key: "actions",
      label: "Action",
    },
  ];

  const tableData = data.map((item) => ({
    ...item,
    actions: (
      <div className="flex gap-2">
        <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Sửa
        </button>

        <button className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600">
          Xóa
        </button>
      </div>
    ),
  }));

  return <Table columns={extendedColumns} data={tableData} />;
}
