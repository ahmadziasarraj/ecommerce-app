import SubCategoryForm from '@/components/dashboard/forms/sub-category-form';
import DataTable from '@/components/ui/data-table';
import { getCategories } from '@/queries/category';
import { getSubCategories } from '@/queries/sub-category';
import { Plus } from 'lucide-react';
import React from 'react'
import { columns } from './columns';

export default async function SubCategory() {
  const subCategories = await getSubCategories();
  if(!subCategories)  return null;

  const categories = await getCategories();
    
    return (
      <DataTable
        data={subCategories}
        filterValue="name"
        searchPlaceholder="Search subCategory Name..."
        actionButtonText = {
          <>
            <Plus size={15} />
            Create SubCategory
          </>
        }
        modalChildren={ <SubCategoryForm categories={categories} /> }
        columns={columns}
        hasHeader= {true}
        heading="Create SubCategory Form"
        newTabLink='/dashboard/admin/subCategories/new'
      />
    )
}
