import { auth } from "@/auth";
import Header from "@/components/dashboard/header/header";
import Sidebar from "@/components/dashboard/sidebar/sidebar";
import { redirect } from "next/navigation";

export default async function AdminashboardLayout({ children }: { children: React.ReactNode }) {

  // Block None-Admin users from access the admin dashboard.
  const session = await auth();
  if (!session || session.user?.role !== "ADMIN") redirect('/');

  return (
    <div className="w-full h-full">
      {/* sidebar */}
      <Sidebar isAdmin={true} />
      <div className="ml-[300px]">
        {/* header */}
        <Header />

        {/* body */}
        <div className="w-full mt-[75px] p-4">
          {children}
        </div>
      </div>
    </div>
  )
}
