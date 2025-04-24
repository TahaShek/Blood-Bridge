// "use client"

// import { useState } from "react"
// import {
//   type ColumnDef,
//   type ColumnFiltersState,
//   type SortingState,
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table"
// import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search } from "lucide-react"

// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// interface DataTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[]
//   data: TData[]
//   searchColumn?: string
//   searchPlaceholder?: string
//   primaryColor?: string
// }

// export function DataTable<TData, TValue>({
//   columns,
//   data,
//   searchColumn,
//   searchPlaceholder = "Search...",
//   primaryColor = "blue",
// }: DataTableProps<TData, TValue>) {
//   const [sorting, setSorting] = useState<SortingState>([])
//   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
//   const [rowSelection, setRowSelection] = useState({})

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     onSortingChange: setSorting,
//     getSortedRowModel: getSortedRowModel(),
//     onColumnFiltersChange: setColumnFilters,
//     getFilteredRowModel: getFilteredRowModel(),
//     onRowSelectionChange: setRowSelection,
//     state: {
//       sorting,
//       columnFilters,
//       rowSelection,
//     },
//   })

//   return (
//     <div className="space-y-4">
//       {searchColumn && (
//         <div className="flex items-center">
//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
//             <Input
//               placeholder={searchPlaceholder}
//               value={(table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""}
//               onChange={(event) => table.getColumn(searchColumn)?.setFilterValue(event.target.value)}
//               className={`pl-10 h-10 rounded-lg bg-white border-slate-200 shadow-sm focus:border-${primaryColor}-500 focus:ring-4 focus:ring-${primaryColor}-500/10 transition-all duration-200`}
//             />
//           </div>
//         </div>
//       )}
//       <div className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
//         <Table>
//           <TableHeader className={`bg-${primaryColor}-50`}>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id} className="hover:bg-transparent">
//                 {headerGroup.headers.map((header) => {
//                   return (
//                     <TableHead key={header.id} className={`text-${primaryColor}-700 font-medium h-11`}>
//                       {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
//                     </TableHead>
//                   )
//                 })}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow
//                   key={row.id}
//                   data-state={row.getIsSelected() && "selected"}
//                   className={`hover:bg-${primaryColor}-50/50 border-b border-slate-100`}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id} className="py-3">
//                       {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={columns.length} className="h-24 text-center">
//                   No results.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-2 text-sm text-slate-500">
//           <div>
//             {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
//             selected.
//           </div>
//           <div>
//             Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
//           </div>
//         </div>
//         <div className="flex items-center space-x-2">
//           <Select
//             value={table.getState().pagination.pageSize.toString()}
//             onValueChange={(value) => {
//               table.setPageSize(Number(value))
//             }}
//           >
//             <SelectTrigger className={`h-9 w-[70px] border-slate-200 focus:ring-${primaryColor}-500/20`}>
//               <SelectValue placeholder={table.getState().pagination.pageSize} />
//             </SelectTrigger>
//             <SelectContent>
//               {[5, 10, 20, 30, 40, 50].map((pageSize) => (
//                 <SelectItem key={pageSize} value={pageSize.toString()}>
//                   {pageSize}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//           <div className="flex items-center space-x-1">
//             <Button
//               variant="outline"
//               size="icon"
//               className={`h-9 w-9 border-slate-200 ${!table.getCanPreviousPage() ? "opacity-50" : ""}`}
//               onClick={() => table.firstPage()}
//               disabled={!table.getCanPreviousPage()}
//             >
//               <ChevronsLeft className="h-4 w-4" />
//               <span className="sr-only">Go to first page</span>
//             </Button>
//             <Button
//               variant="outline"
//               size="icon"
//               className={`h-9 w-9 border-slate-200 ${!table.getCanPreviousPage() ? "opacity-50" : ""}`}
//               onClick={() => table.previousPage()}
//               disabled={!table.getCanPreviousPage()}
//             >
//               <ChevronLeft className="h-4 w-4" />
//               <span className="sr-only">Go to previous page</span>
//             </Button>
//             <Button
//               variant="outline"
//               size="icon"
//               className={`h-9 w-9 border-slate-200 ${!table.getCanNextPage() ? "opacity-50" : ""}`}
//               onClick={() => table.nextPage()}
//               disabled={!table.getCanNextPage()}
//             >
//               <ChevronRight className="h-4 w-4" />
//               <span className="sr-only">Go to next page</span>
//             </Button>
//             <Button
//               variant="outline"
//               size="icon"
//               className={`h-9 w-9 border-slate-200 ${!table.getCanNextPage() ? "opacity-50" : ""}`}
//               onClick={() => table.lastPage()}
//               disabled={!table.getCanNextPage()}
//             >
//               <ChevronsRight className="h-4 w-4" />
//               <span className="sr-only">Go to last page</span>
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


"use client"

import * as React from "react"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type SortingState,
  getSortedRowModel,
} from "@tanstack/react-table"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table"
import { Button } from "./button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'
import { motion } from "framer-motion"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pageSize?: number
  pageSizeOptions?: number[]
  showPageSize?: boolean
  className?: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageSize = 10,
  pageSizeOptions = [5, 10, 20, 50],
  showPageSize = true,
  className,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    initialState: {
      pagination: {
        pageSize,
      },
    },
  })

  return (
    <div className={className}>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="hover:bg-gray-50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </motion.tr>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex items-center space-x-2">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-medium">
              {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(
                (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                table.getFilteredRowModel().rows.length,
              )}
            </span>{" "}
            of <span className="font-medium">{table.getFilteredRowModel().rows.length}</span> entries
          </p>
        </div>

        <div className="flex items-center space-x-6">
          {showPageSize && (
            <div className="flex items-center space-x-2">
              <p className="text-sm text-gray-500">Rows per page</p>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value))
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={table.getState().pagination.pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {pageSizeOptions.map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="h-8 w-8 p-0 border-gray-200"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </Button>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">Page</span>
              <span className="text-sm font-medium">
                {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </span>
            </div>
            <Button
              variant="outline"
              className="h-8 w-8 p-0 border-gray-200"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
