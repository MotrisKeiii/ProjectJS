export default function Table({ columns, data }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md">
      <table className="w-full border-collapse text-left">
        <thead className="bg-slate-900 text-white">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-5 py-4 text-sm font-bold">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-b border-slate-100 hover:bg-slate-50">
              {columns.map((col) => (
                <td key={col.key} className="px-5 py-4 text-sm text-slate-700">
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
