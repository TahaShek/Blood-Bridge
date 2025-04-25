// src/components/ui/data-table.tsx
"use client"

import { useState } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search } from "lucide-react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchOptions?: {
    column: string
    placeholder?: string
  }[]
  primaryColor?: string
  pageSize?: number
  onPageSizeChange?: (size: number) => void
  currentPage?: number
  totalPages?: number
  onPageChange?: (page: number) => void
  isLoading?: boolean
  onSearch?: (column: string, value: string) => void
  onFilterChange?: (filters: Record<string, string>) => void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchOptions = [],
  primaryColor = "blue",
  pageSize,
  totalPages,
  onPageChange,
  onPageSizeChange,
  currentPage,
  onSearch,
  onFilterChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})
  const [searchValues, setSearchValues] = useState<Record<string, string>>(
    searchOptions.reduce((acc, option) => ({ ...acc, [option.column]: '' }), {})
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  })

  const handleSearchChange = (column: string, value: string) => {
    setSearchValues(prev => ({ ...prev, [column]: value }))
    if (onSearch) {
      onSearch(column, value)
    } else {
      table.getColumn(column)?.setFilterValue(value)
    }
  }

  return (
    <div className="space-y-4">
      {/* Search Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {searchOptions.map((option) => (
          <div key={option.column} className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder={option.placeholder || `Search by ${option.column}...`}
              value={searchValues[option.column] || ''}
              onChange={(e) => handleSearchChange(option.column, e.target.value)}
              className={`pl-10 h-10 rounded-lg bg-white border-slate-200 shadow-sm focus:border-${primaryColor}-500 focus:ring-4 focus:ring-${primaryColor}-500/10 transition-all duration-200`}
            />
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className={`bg-${primaryColor}-50`}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className={`text-${primaryColor}-700 font-medium h-11`}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={`hover:bg-${primaryColor}-50/50 border-b border-slate-100`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
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

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-slate-500">
          <div>{table.getFilteredRowModel().rows.length} result(s).</div>
          {typeof currentPage === "number" && typeof totalPages === "number" && (
            <div>
              Page {currentPage} of {totalPages}
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {onPageSizeChange && pageSize && (
            <Select
              value={String(pageSize)}
              onValueChange={(val) => onPageSizeChange(Number(val))}
            >
              <SelectTrigger className={`h-9 w-[70px] border-slate-200 focus:ring-${primaryColor}-500/20`}>
                <SelectValue placeholder={pageSize} />
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 20, 30, 50].map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {onPageChange && typeof currentPage === "number" && typeof totalPages === "number" && (
            <div className="flex items-center space-x-1">
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage <= 1}
                onClick={() => onPageChange(1)}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage <= 1}
                onClick={() => onPageChange(currentPage - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage >= totalPages}
                onClick={() => onPageChange(currentPage + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage >= totalPages}
                onClick={() => onPageChange(totalPages)}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}