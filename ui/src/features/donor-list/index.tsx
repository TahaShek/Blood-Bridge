import { useEffect, useMemo, useState } from "react";
import { Donor, DonorListResponse } from "@/types";
import { Badge } from "@/components/ui/badge";
import { createSortableColumn } from "@/components/ui/column";
import { DataTable } from "@/components/ui/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { donorList } from "@/services/donorApi";
import { useDebounce } from "@/hooks/useDebounce";

export function DonorTable() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [searchValues, setSearchValues] = useState({
    city: "",
    bloodGroup: "",
  });

  const debouncedCity = useDebounce(searchValues.city, 500);
  const debouncedBloodGroup = useDebounce(searchValues.bloodGroup, 500);

  const fetchDonors = async (
    page: number,
    limit: number,
    filters: { city?: string; bloodGroup?: string }
  ) => {
    try {
      setIsLoading(true);
      const res: DonorListResponse = await donorList({
        page,
        limit,
        city: filters.city,
        bloodGroup: filters.bloodGroup,
      });
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
    fetchDonors(currentPage, pageSize, {
      city: debouncedCity,
      bloodGroup: debouncedBloodGroup,
    });
  }, [currentPage, pageSize, debouncedCity, debouncedBloodGroup]);

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

  const handleSearchChange = (column: string, value: string) => {
    setSearchValues((prev) => ({ ...prev, [column]: value }));
    setCurrentPage(1);
  };

  return (
    <DataTable
      data={donors}
      columns={columns}
      searchOptions={[
        {
          column: "city",
          placeholder: "Search by city...",
          type: "text",
        },
        {
          column: "bloodGroup",
          placeholder: "Select blood group",
          type: "select",
          options: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
        },
      ]}
      searchValues={searchValues}
      onSearchChange={handleSearchChange}
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
