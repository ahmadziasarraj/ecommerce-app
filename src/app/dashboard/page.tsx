import { db } from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
    const user = await currentUser();
    const currUser = await db.user.findFirst({
        where: {
            email: user?.emailAddresses[0].emailAddress
        }
    });
    if (currUser) {
        if(currUser.role == 'USER') redirect('/');
        if(currUser.role == 'ADMIN') redirect('/dashboard/admin');
        if(currUser.role == 'SELLER') redirect('/dashboard/seller');
    }
    redirect('/');
}
