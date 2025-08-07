'use server';
import { auth } from "@/auth"
import { SubCategory as SubCategoryType } from "@/generated/prisma";
import { prisma } from "@/prisma";


export const upsertSubCategory = async (subCategory: SubCategoryType) => {
    try {
        const session = await auth();
        // Check if the user is authenticated.
        if (!session) throw new Error('Your are not logged in. Please login and try to create a subCategory.');

        // Check for Permission.
        if (session.user.role !== 'ADMIN') throw new Error('You don not have permission to create subCategory.');

        // Check if all fields are available.
        if (!subCategory) throw new Error('Make sure to fill all fields and submit again.');
        
        // Check if subCategory is exist with the same URL or Name.
        const isExistSubCategory = await prisma.subCategory.findFirst({
            where: {
                AND: [
                    { OR: [{ name: subCategory.name }, { url: subCategory.url }] },
                    { NOT: { id: subCategory.id } }
                ]
            }
        });

        if (isExistSubCategory) {
            if (isExistSubCategory.name === subCategory.name) {
                throw new Error(`A subCategory with the name: ${subCategory.name} is already exist in database. please try with some other unique name.`);
            } else {
                throw new Error(`A subCategory with the same url: ${subCategory.url} is already exist in database. please try some other unique url.`);
            }
        }

        // upsert subCategory into database.
        const subCategoryDetails = await prisma.subCategory.upsert({
            where: {
                id: subCategory.id
            },
            update: subCategory,
            create: subCategory,
        })

        return subCategoryDetails;

    } catch (error) {
        throw error;        
    }
}

export const getSubCategories = async () => {
    const subCategories = await prisma.subCategory.findMany({
        
        include: {
            category:{
                select: {
                    name: true
                }
            }
        },
        orderBy: {
            updatedAt: 'desc'
        }
    });
    return subCategories;
}

export const getsubCategory = async (id:string) => {
    const subCategory = await prisma.subCategory.findFirst({
        where: {
            id: id
        }
    });
    return subCategory;
}

export const deletesubCategory = async (id:string) => {
    const response = await prisma.subCategory.delete({
        where: {
            id: id
        }
    });

    return response;
}