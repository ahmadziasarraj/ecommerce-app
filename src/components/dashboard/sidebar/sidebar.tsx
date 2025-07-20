import Logo from "@/components/shared/logo";
import { FC } from "react"
import UserInfo from "./user-info";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import AdminSidebarNav from "./admin-nav";
import { adminDashboardSidebarOptions } from "@/constants/data";

interface SidebarProps {
    isAdmin? : boolean
};

const Sidebar: FC<SidebarProps> = async ({isAdmin}) => {
    const user = await currentUser();
    const currUser = await db.user.findFirst({
        where: {
            email: user?.emailAddresses[0].emailAddress
        }
    })
    return (
        <div className="w-[300px] h-screen fixed top-0 left-0 bottom-0 p-4 border-r flex flex-col items-center">
            <Logo width="50px" height="50px" />
            <span className="my-0.5" />
            {currUser && <UserInfo user={currUser}/>}
            {isAdmin && <AdminSidebarNav menuLinks={adminDashboardSidebarOptions} />}
        </div>
    );
}

export default Sidebar;