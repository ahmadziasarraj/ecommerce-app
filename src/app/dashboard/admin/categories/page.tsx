import CategoryForm from "@/components/dashboard/forms/category-form";
import DataTable from "@/components/ui/data-table";
import { getCategories } from "@/queries/category";
import { Plus } from "lucide-react";
import { columns } from "./columns";

export default async function AdminCategoriesPage() {
  const categories = await getCategories();
  
  return (
    <DataTable
      data={categories}
      filterValue="name"
      searchPlaceholder="Search Category Name..."
      actionButtonText = {
        <>
          <Plus size={15} />
          Create Category
        </>
      }
      modalChildren={ <CategoryForm /> }
      columns={columns}
      hasHeader= {true}
      heading="Create Category Form"
      newTabLink="/dashboard/admin/categories/new"
    />
  )
}
