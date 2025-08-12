"use server";

import { auth } from "@/auth"
import { prisma } from '@/prisma'
import { redirect } from "next/navigation";
import { Store } from '@/generated/prisma'


export const upsertStore = async (store: Partial<Store>) => {
     try {
            const session = await auth();
            // Check if the user is authenticated.
            if (!session) throw new Error('Your are not logged in. Please login and try to create a store.');
    
            // Check for Permission.
            if (session.user.role !== 'SELLER') throw new Error('You don not have permission to create store.');
    
            // Check if all fields are available.
            if (!store) throw new Error('Make sure to fill all fields and submit again.');
            
            // Check if store is exist with the same URL or Name.
            const isExiststore = await prisma.store.findFirst({
                where: {
                    AND: [
                        { OR: [{ name: store.name }, { url: store.url }, {email: store.email}] },
                        { NOT: { id: store.id } }
                    ]
                }
            });
    
            if (isExiststore) {
                if (isExiststore.name === store.name) {
                    throw new Error(`A store with the name: ${store.name} is already exist in database. please try with some other unique name.`);
                } else if (isExiststore.email === store.email) {
                    throw new Error(`A store with the email: ${store.email} is already exist in database. please try with some other unique email.`);
                } else {
                    throw new Error(`A store with the same url: ${store.url} is already exist in database. please try some other unique url.`);
                }
            }
    
            // upsert store into database.
            const storeDetails = await prisma.store.upsert({
                where: {
                    id: store.id
                },
                update: store,
                create: {
                    ...store,
                    user: {
                        connect: { id: session.user.id },
                      },
                },
            })
    
            return storeDetails;
    
        } catch (error) {
            throw error;        
        }
}

export const getUserStores = async () => {

    const session = await auth();
    if (!session) {
        redirect('/');
        return;
    }

    const stores = await prisma.store.findMany({
        where: {
            userId: session.user.id
        },
        orderBy: {
            updatedAt: 'desc'
        }
    });

    return stores;
}

export const getStore = async (storeUrl:string) => {
    const store = await prisma.store.findUnique({
        where: {
            url: storeUrl
        }
    });
    return store;
}