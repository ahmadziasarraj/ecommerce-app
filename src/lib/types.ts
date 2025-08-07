import { Category, SubCategory } from "@/generated/prisma";
import { getSubCategories } from "@/queries/sub-category";
import { Prisma } from "@prisma/client"

export interface DashboardSidebarMenuInterface {
    label: string,
    icon: string,
    link: string
}


// subCategory with Category type
export type SubCategoryWithCategoryType = SubCategory & {
    category: Pick<Category, "name">;
}
