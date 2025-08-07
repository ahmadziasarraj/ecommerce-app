"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useModal } from "@/providers/modal-provider";
import CustomModal from "../dashboard/shared/custome-modal";
import { Button } from "./button";
import { Input } from "./input";
import { FilePlus2, Search } from "lucide-react";
import Link from "next/link";



interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  filterValue: string,
  actionButtonText?: React.ReactNode,
  modalChildren?: React.ReactNode,
  searchPlaceholder: string,
  heading?: string,
  subHeading?: string,
  hasHeader?: boolean,
  newTabLink?: string
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  filterValue,
  actionButtonText,
  modalChildren,
  searchPlaceholder,
  heading,
  subHeading,
  hasHeader,
  newTabLink
}: DataTableProps<TData, TValue>) {

  const { setOpen } = useModal();


  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  })

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center py-4 gap-2">
          <Search />
          <Input
            placeholder={searchPlaceholder}
            value={(table.getColumn(filterValue)?.getFilterValue() as string) ?? ""}
            onChange={(event: { target: { value: any; }; }) => table.getColumn(filterValue)?.setFilterValue(event.target.value)}
            className="h-12"
          />
        </div>

        <div className="flex gap-x-2">
          {modalChildren && (
            <Button
              className="flex gap-2"
              onClick={() => {
                if (modalChildren) {
                  setOpen(
                    <CustomModal
                      heading={heading ?? ""}
                      subHeading={subHeading ?? ""}
                    >
                      {modalChildren}
                    </CustomModal>
                  )
                }
              }}
            >
              {actionButtonText}
            </Button>
          )}

          {newTabLink && (
            <Link href={newTabLink}>
              <Button variant="outline">
                <FilePlus2 className="me-1" />
                Create in New Page
              </Button>
            </Link>
          )}
        </div>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
    </>
  )
}