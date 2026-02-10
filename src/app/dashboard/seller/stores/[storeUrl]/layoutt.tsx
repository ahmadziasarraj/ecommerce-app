import { auth } from "@/auth";
import Header from "@/components/dashboard/header/header";
import Sidebar from "@/components/dashboard/sidebar/sidebar-deleted";
import { getUserStores } from "@/queries/store";
import { redirect } from "next/navigation";

export default async function StoreDashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();
    if(!session) redirect('/');

    const stores = await getUserStores();

    return (
        <div className="w-full h-full">
            {/* sidebar */}
            <Sidebar isAdmin={false} stores={stores} />
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
