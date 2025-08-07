'use server';
import { auth } from "@/auth"
import { Category } from "@/generated/prisma"
import { prisma } from '@/prisma'


export const upsertCategory = async (category: Category) => {
    try {
        const session = await auth();
        // Check if the user is authenticated.
        if (!session) throw new Error('Your are not logged in. Please login and try to create a Category.');

        // Check for Permission.
        if (session.user.role !== 'ADMIN') throw new Error('You don not have permission to create category.');

        // Check if all fields are available.
        if (!category) throw new Error('Make sure to fill all fields and submit again.');

        // Check if category is exist with the same URL or Name.
        const isExistCategory = await prisma.category.findFirst({
            where: {
                AND: [
                    { OR: [{ name: category.name }, { url: category.url }] },
                    { NOT: { id: category.id } }
                ]
            }
        });

        if (isExistCategory) {
            if (isExistCategory.name === category.name) {
                throw new Error(`A Category with the name: ${category.name} is already exist in database. please try with some other unique name.`);
            } else {
                throw new Error(`A category with the same url: ${category.url} is already exist in database. please try some other unique url.`);
            }
        }

        // upsert Category into database.
        const categoryDetails = await prisma.category.upsert({
            where: {
                id: category.id
            },
            update: category,
            create: category,
        })

        return categoryDetails;

    } catch (error) {
        console.log(error);
        throw error;        
    }

}

export const getCategories = async () => {
    const categories = await prisma.category.findMany({
        orderBy: {
            updatedAt: 'desc'
        }
    });
    return categories;
}

export const getCategory = async (id:string) => {
    const category = await prisma.category.findFirst({
        where: {
            id: id
        }
    });
    return category;
}

export const deleteCategory = async (id:string) => {
    const response = await prisma.category.delete({
        where: {
            id: id
        }
    });

    return response;
}