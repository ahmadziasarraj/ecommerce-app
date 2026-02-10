import { auth } from '@/auth'
import MainSidebar from '@/components/dashboard/sidebar/main-sidebar';
import Sidebar from '@/components/dashboard/sidebar/sidebar-deleted'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { redirect } from 'next/navigation';
import React from 'react'

export default async function DashboardLayout({children}: {children: React.ReactNode}) {
  const session = await auth();
  if (!session) redirect('/');

  return (
    <SidebarProvider>
      <MainSidebar isAdmin={false} />
      <main className='w-full p-2'>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
