import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

export const Table = ({ data, columns }) => {
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  return (
    <div className="flex items-center flex-col mt-4">
      <table className="border w-ful mb-4">
        <thead className="bg-[#464646] text-slate-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border my-1 mx-2">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="text-center p-4">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="text-center p-4 border-y">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {/* <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((footer) => (
                <th key={footer.id}>
                  {flexRender(
                    footer.column.columnDef.footer,
                    footer.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot> */}
      </table>
      <div>
        <button
          className="mx-1 w-32 rounded-2xl py-1 px-1 bg-indigo-500 text-white hover:bg-indigo-600 cursor-pointer"
          onClick={() => table.setPageIndex(0)}
        >
          First Page
        </button>
        <button
          className="mx-1 w-32 rounded-2xl py-1 px-1 bg-indigo-500 text-white hover:bg-indigo-600 cursor-pointer"
          onClick={() => table.previousPage()}
        >
          Previous Page
        </button>
        <button
          className="mx-1 w-32 rounded-2xl py-1 px-1 bg-indigo-500 text-white hover:bg-indigo-600 cursor-pointer"
          onClick={() => table.nextPage()}
        >
          Next Page
        </button>
        <button
          className="mx-1 w-32 rounded-2xl py-1 px-1 bg-indigo-500 text-white hover:bg-indigo-600 cursor-pointer"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          Last Page
        </button>
      </div>
    </div>
  );
};
