import ProductForm from '@/components/dashboard/forms/product-form';
import { getCategories } from '@/queries/category';
import { getSubCategories } from '@/queries/sub-category';
import React from 'react'

export default async function AddNewProduct({ params }: { params: Promise<{ storeUrl: string }> }) {
    const { storeUrl } = await params;
    const categories = await getCategories();
    const subCategories = await getSubCategories();
    return (
        <div>
            <ProductForm storeUrl={storeUrl} categories={categories} subCategories={subCategories} />
        </div>
    )
}
