import SubCategoryForm from '@/components/dashboard/forms/sub-category-form'
import { getCategories } from '@/queries/category'
import React from 'react'

export default async function AddNewSubCategory() {
  const categories = await getCategories();
  return (
    <SubCategoryForm categories={categories} />
  )
}
