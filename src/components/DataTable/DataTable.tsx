import { useState } from "react";

export interface Column<T> {   
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

function DataTable<T>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedRows, setSelectedRows] = useState<T[]>([]);

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (!data || data.length === 0)
    return <div className="p-4 text-center">No data available</div>;

  // Sorting
  const sortedData = [...data];
  if (sortColumn) {
    sortedData.sort((a, b) => {
      const valA = a[sortColumn as keyof T];
      const valB = b[sortColumn as keyof T];
      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }

  const toggleSort = (col: Column<T>) => {
    if (!col.sortable) return;
    if (sortColumn === col.dataIndex) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(col.dataIndex as string);
      setSortOrder("asc");
    }
  };

  const toggleRowSelection = (row: T) => {
    let updated: T[];
    if (selectedRows.includes(row)) {
      updated = selectedRows.filter((r) => r !== row);
    } else {
      updated = [...selectedRows, row];
    }
    setSelectedRows(updated);
    onRowSelect?.(updated);
  };

  return (
    <table className="min-w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          {selectable && <th className="p-2">Select</th>}
          {columns.map((col) => (
            <th
              key={col.key}
              onClick={() => toggleSort(col)}
              className={`p-2 border-b text-left cursor-pointer ${
                col.sortable ? "hover:bg-gray-200" : ""
              }`}
            >
              {col.title}
              {sortColumn === col.dataIndex &&
                (sortOrder === "asc" ? " 🔼" : " 🔽")}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, i) => (
          <tr key={i} className="hover:bg-gray-50">
            {selectable && (
              <td className="p-2 border-b">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row)}
                  onChange={() => toggleRowSelection(row)}
                />
              </td>
            )}
            {columns.map((col) => (
              <td key={col.key} className="p-2 border-b">
                {String(row[col.dataIndex])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;

