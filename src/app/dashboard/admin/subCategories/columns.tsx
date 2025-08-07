"use client"
import { ColumnDef } from "@tanstack/react-table"
import { BadgeCheck, BadgeMinus} from "lucide-react";
import Image from "next/image"
import SubCategoryForm from "@/components/dashboard/forms/sub-category-form";
import CustomModal from "@/components/dashboard/shared/custome-modal";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useModal } from "@/providers/modal-provider";
import { getCategories, getCategory } from "@/queries/category";
import { deletesubCategory, getsubCategory } from "@/queries/sub-category";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { Category, SubCategory } from "@/generated/prisma";
import { SubCategoryWithCategoryType } from "@/lib/types";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<SubCategoryWithCategoryType>[] = [
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
    accessorKey: "category",
    header: () => <div className="text-left">Category</div>,
    cell: ({ row }) => (<div ><span className="border border-emerald-500 rounded-lg py-1 px-2 font-semibold"> {row.original.category.name}</span></div>)
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
      return (<div>{row.original.isFeatured ? (<BadgeCheck className="text-green-500"/>) : (<BadgeMinus className="text-red-500" />)}</div>)
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
];

interface CellActionsProps {
  rowData: SubCategoryWithCategoryType
}

const CellActions: React.FC<CellActionsProps> = ({ rowData }) => {

  // Hooks
  const { setOpen, setClose } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(()=> {
    const fetchCategories = async () => {
      const cats = await getCategories();
      setCategories(cats);
    };
    fetchCategories();
  }, []);


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
                <CustomModal heading="Update SubCategory Form">
                  {/* Store details component */}
                  <SubCategoryForm categories={categories} data={{ ...rowData }} />
                </CustomModal>,
                async () => {
                  return {
                    rowData: await getsubCategory(rowData?.id),
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
              <Trash size={15} /> Delete subCategory
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
            SubCategory and related data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex items-center">
          <AlertDialogCancel className="mb-2">Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading}
            className="bg-destructive hover:bg-destructive mb-2 text-white"
            onClick={async () => {
              setIsLoading(true);
              await deletesubCategory(rowData.id);
              
              toast("Deleted subCategory", {
                description: "The subCategory has been deleted."
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


