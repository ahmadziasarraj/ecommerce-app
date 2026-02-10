import Logo from "@/components/shared/logo";
import { FC } from "react"
import UserInfo from "./user-info";
import { db } from "@/lib/db";
import AdminSidebarNav from "./admin-nav";
import { adminDashboardSidebarOptions, SellerDashboardSidebarOptions } from "@/constants/data";
import { auth } from "@/auth";
import { Store } from "@/generated/prisma";
import SellerSidebarNav from "./seller-nav";
import StoreSwitcher from "./store-switcher";

interface SidebarProps {
    isAdmin? : boolean,
    stores?: Store[]
};

const Sidebar: FC<SidebarProps> = async ({isAdmin, stores}) => {
    const session = await auth();

    return (
        <div className="w-[300px] h-screen fixed top-0 left-0 bottom-0 p-4 border-r flex flex-col items-center">
            <span className="my-0.5" />
            {session?.user && <UserInfo user={session?.user}/>}
            {stores && <StoreSwitcher stores={stores} />}
            {isAdmin ? <AdminSidebarNav menuLinks={adminDashboardSidebarOptions} /> : <SellerSidebarNav menuLinks={SellerDashboardSidebarOptions} />}
        </div>
    );
}
export default Sidebar;