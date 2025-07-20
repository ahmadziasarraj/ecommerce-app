import Header from "@/components/dashboard/header/header";
import Sidebar from "@/components/dashboard/sidebar/sidebar";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";

export default async function AdminashboardLayout({ children }: { children: React.ReactNode }) {

  // Block None-Admin users from access the admin dashboard.
  const user = await currentUser();
  const currUser = await db.user.findFirst({
    where: {
      email: user?.emailAddresses[0].emailAddress
    }
  });
  if (!currUser || currUser.role !== "ADMIN") redirect('/');

  return (
    <div className="w-full h-full">
      {/* sidebar */}
      <Sidebar isAdmin={true} />
      <div className="w-full ml-[300px]">
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
