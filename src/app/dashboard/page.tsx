import { auth } from '../../auth';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
    const session = await auth();    
    const currUser = await db.user.findFirst({
        where: {
            email: session?.user?.email
        }
    });
    console.log(currUser);
    
    if (currUser) {
        if(currUser.role == 'USER') redirect('/');
        if(currUser.role == 'ADMIN') redirect('/dashboard/admin');
        if(currUser.role == 'SELLER') redirect('/dashboard/seller');
    }
    redirect('/');
}
