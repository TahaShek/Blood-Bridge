import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "./badge";
import { Button } from "./button";
import { ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react";

export function createSortableColumn<T, K extends keyof T>(
  accessorKey: K,
  header: string
): ColumnDef<T, any> {
  return {
    accessorKey: accessorKey as string,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {header}
          {column.getIsSorted() === "asc" ? (
            <ChevronUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ChevronDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100" />
          )}
        </Button>
      );
    },
  };
}

// Helper function to create a badge column
export function createBadgeColumn<T, K extends keyof T>(
  accessorKey: K,
  header: string,
  colorMap: Record<string, string>
): ColumnDef<T, any> {
  return {
    accessorKey: accessorKey as string,
    header,
    cell: ({ row }) => {
      const value = row.getValue(accessorKey as string) as string;
      const colorClass = colorMap[value] || "bg-gray-100 text-gray-800";

      return <Badge className={colorClass}>{value}</Badge>;
    },
  };
}
