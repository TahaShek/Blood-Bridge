import { useEffect, useMemo, useState } from "react";
import { Donor, DonorListResponse } from "@/types";
import { Badge } from "@/components/ui/badge";
import { createSortableColumn } from "@/components/ui/column";
import { DataTable } from "@/components/ui/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { donorList } from "@/services/donorApi";

export function DonorTable() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDonors = async (page: number, limit: number) => {
    try {
      setIsLoading(true);
      const res: DonorListResponse = await donorList({ page, limit });
      setDonors(res.donors);
      setTotalPages(res.pagination.totalPages);
      setCurrentPage(res.pagination.currentPage);
    } catch (err) {
      console.error("Failed to fetch donors:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const columns = useMemo<ColumnDef<Donor>[]>(
    () => [
      createSortableColumn("name", "Name"),
      {
        accessorKey: "bloodGroup",
        header: "Blood Group",
        cell: ({ row }) => (
          <Badge className="bg-red-50 text-red-600 border-red-200">
            {row.getValue("bloodGroup")}
          </Badge>
        ),
      },
      {
        accessorKey: "address.city",
        header: "City",
        cell: ({ row }) => row.original.address.city || "-",
      },
      {
        accessorKey: "createdAt",
        header: "Joined On",
        cell: ({ row }) => {
          const date = new Date(row.getValue("createdAt"));
          return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
        },
      },
    ],
    []
  );

  return (
    <DataTable
      data={donors}
      columns={columns}
      searchColumn="name"
      searchPlaceholder="Search donor name..."
      primaryColor="red"
      pageSize={pageSize}
      onPageSizeChange={setPageSize}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
      isLoading={isLoading}
    />
  );
}
