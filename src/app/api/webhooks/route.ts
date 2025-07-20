import { User } from '@/generated/prisma';
import { db } from '@/lib/db';
import { createClerkClient } from '@clerk/nextjs/server';
import { verifyWebhook } from '@clerk/nextjs/webhooks'

export async function POST(req: Request) {
    try {
        const evt = await verifyWebhook(req);
        const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

        // Do something with payload
        // For this guide, log payload to console
        
        const eventType = evt.type
        
        if (eventType === 'user.created' || eventType === 'user.updated') {
            const data = evt.data;
            
            const user: Partial<User> = {
                name: `${data.first_name} ${data.last_name}`,
                email: data.email_addresses[0].email_address,
                id: data.id,
                picture: data.image_url
            };

            if(!user) return;

            const dbUser = await db.user.upsert({
                where : {
                    email: user.email
                },
                update: user,
                create: {
                    id: user.id!,
                    name: user.name!,
                    email: user.email!,
                    picture: user.picture!,
                    role: user.role || "USER"
                }
            });

            await clerkClient.users.updateUserMetadata(data.id, {
                privateMetadata : {
                    role: dbUser.role || "USER"
                }
            });
        }

        if (eventType === 'user.deleted') {
            const userId = evt.data.id;
            await db.user.delete({
                where: {
                    id: userId
                }
            });
            // await clerkClient.users.deleteUser(userId!);
        }

        return new Response('Webhook received', { status: 200 })
    } catch (err) {
        console.error('Error verifying webhook:', err)
        return new Response('Error verifying webhook', { status: 400 })
    }
}