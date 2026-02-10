"use server";
import { Product } from "@/generated/prisma"
import { checkForAuth, generateUniqueSlug } from "@/lib/utils";
import { prisma } from '@/prisma'


export const upsertProduct = async (product: Partial<Product>) => {
    try {
        await checkForAuth(["SELLER"]);

        // Check for all fields has been filled. 
        if(!product) throw new Error('Make sure all feilds filled and try again.');
        
        

        const slug = await generateUniqueSlug(product.name ?? '', 'slug', prisma.product);        
        
        const productDetails = await prisma.product.upsert({
            where: {
                id: product.id,
            },
            update: product,
            create: {
                ...product,
                slug: slug
            }
        });
        
        return productDetails;

    } catch (error) {
        throw error;
    }



    return;

}