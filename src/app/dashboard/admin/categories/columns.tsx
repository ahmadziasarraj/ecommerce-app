"use client"

import CategoryForm from "@/components/dashboard/forms/category-form";
import CustomModal from "@/components/dashboard/shared/custome-modal";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Category } from "@/generated/prisma";
import { useModal } from "@/providers/modal-provider";
import { deleteCategory, getCategory } from "@/queries/category";
import { ColumnDef } from "@tanstack/react-table"
import { BadgeCheck, BadgeMinus, Edit, MoreHorizontal, Trash } from "lucide-react";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "image",
    header: () => <div className="text-left">Image</div>,
    cell: ({ row }) => {
      return (
        <div className="relative h-10 rounded-lg overflow-hidden">
          <Image
            src={row.original.image}
            alt={row.original.name}
            width={192}
            height={192}
            className="w-10 h-10 relative object-cover rounded-full shadow"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: () => <div className="text-left">Name</div>,
    cell: ({ row }) => (<div className=" font-bold capitalize">{row.original.name}</div>)
  },
  {
    accessorKey: "url",
    header: () => <div className="text-left">URL</div>,
    cell: ({ row }) => (<div>{row.original.url}</div>)
  },
  {
    accessorKey: "isFeatured",
    header: () => <div className="text-left">Is Featured</div>,
    cell: ({ row }) => {
      return (<div>{row.original.isFeatured ? (<BadgeCheck className="text-green-500" />) : (<BadgeMinus className="text-red-500" />)}</div>)
    }
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-left">Actions</div>,
    cell: ({ row }) => {
      const rowData = row.original;
      return <CellActions rowData={rowData} />
    }
  },
]


interface CellActionsProps {
  rowData: Category
}

const CellActions: React.FC<CellActionsProps> = ({ rowData }) => {

  // Hooks
  const { setOpen, setClose } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  if (!rowData || !rowData.id) return null;
  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            className="flex gap-2"
            onClick={() => {
              setOpen(
                // Custom modal component
                <CustomModal heading="Update Category Form">
                  {/* Store details component */}
                  <CategoryForm data={{ ...rowData }} />
                </CustomModal>,
                async () => {
                  return {
                    rowData: await getCategory(rowData?.id),
                  };
                }
              );
            }}
          >
            <Edit size={15} />
            Edit Details
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <AlertDialogTrigger asChild>
            <DropdownMenuItem className="flex gap-2" onClick={() => {}}>
              <Trash size={15} /> Delete category
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialogContent className="max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-left">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            This action cannot be undo. This will permanently delete the
            category and related data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex items-center">
          <AlertDialogCancel className="mb-2">Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading}
            className="bg-destructive hover:bg-destructive mb-2 text-white"
            onClick={async () => {
              setIsLoading(true);
              await deleteCategory(rowData.id);
              
              toast("Deleted category", {
                description: "The category has been deleted."
              });
              
              setIsLoading(false);
              router.refresh();
              setClose();
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}