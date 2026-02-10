import { Category, SubCategory } from "@/generated/prisma";
import { getSubCategories } from "@/queries/sub-category";
import { Prisma } from "@prisma/client"
import { ComponentType } from "react";

export interface DashboardSidebarMenuInterface {
    label: string,
    icon:  string,
    link: string
}

export interface DashboardSidebarMenuGroupInterface {
    label: string,
    icon?:  string,
    link?: string,
    isActive: boolean,
    items?: DashboardSidebarMenuInterface[]
}


// subCategory with Category type
export type SubCategoryWithCategoryType = SubCategory & {
    category: Pick<Category, "name">;
}


// Product with Variant Type
export type ProductWithVariantType = {
    productId: string,
    variantId: string,
    name: string,
    description: string,
    brand: string,
    categoryId: string,
    subCategoryId: string,
    variantName: string,
    variantDescription: string,
    isSale: boolean,
    sku: string,
    kewords: string[],
    colors: { color: string }[],
    images: { url: string}[],
    sizes: { 
        size: string,
        quantity: number,
        price: number,
        discount: number,
     }[],
     createdAt: Date,
     updatedAt: Date
}

