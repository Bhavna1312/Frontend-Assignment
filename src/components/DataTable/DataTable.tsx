import { useState } from "react";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  selectable?: boolean;
  loading?: boolean;
}

function DataTable<T>({ data, columns, selectable = false, loading = false }: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const toggleRow = (index: number) => {
    const newSet = new Set(selectedRows);
    if (newSet.has(index)) newSet.delete(index);
    else newSet.add(index);
    setSelectedRows(newSet);
  };

  const sortData = () => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  };

  const sortedData = sortData();

  return (
    <div className="overflow-x-auto">
      {loading ? (
        <div className="p-4 text-center text-gray-500">Loading...</div>
      ) : data.length === 0 ? (
        <div className="p-4 text-center text-gray-500">No data available</div>
      ) : (
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              {selectable && <th className="p-2 border">Select</th>}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="p-2 border text-left cursor-pointer select-none"
                  onClick={() => {
                    if (col.sortable) {
                      setSortKey(col.dataIndex);
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                    }
                  }}
                >
                  {col.title}
                  {sortKey === col.dataIndex && (sortOrder === "asc" ? " 🔼" : " 🔽")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                {selectable && (
                  <td className="p-2 border text-center">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(idx)}
                      onChange={() => toggleRow(idx)}
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key} className="p-2 border">
                    {String(row[col.dataIndex])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DataTable;
