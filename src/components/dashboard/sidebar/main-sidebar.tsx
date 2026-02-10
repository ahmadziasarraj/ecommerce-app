import { auth } from "@/auth"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar"
import { ChevronDown, Plus } from "lucide-react"
import { FC } from "react"
import UserInfo from "./user-info"
import StoreSwitcher from "./store-switcher"
import { Store } from "@/generated/prisma"
import { getUserStores } from "@/queries/store"
import AdminSidebarNav from "./admin-nav"
import { adminDashboardSidebarOptions, SellerDashboardSidebarOptions } from "@/constants/data"
import SellerSidebarNav from "./seller-nav"


interface MainSidebarProps {
  isAdmin?: boolean,
  stores?: Store[]
}

const MainSidebar: FC<MainSidebarProps> = async ({ isAdmin, stores }) => {
  const session = await auth();

  if (!isAdmin) {
    stores = await getUserStores();
  }

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        {stores && <StoreSwitcher stores={stores} />}
      </SidebarHeader>

      <SidebarContent className="my-3">
        {isAdmin ? <AdminSidebarNav menuLinks={adminDashboardSidebarOptions} /> : <SellerSidebarNav menuLinks={SellerDashboardSidebarOptions} />}
      </SidebarContent>

      <SidebarFooter>
        {session?.user && <UserInfo user={session?.user} />}
      </SidebarFooter>
    </Sidebar>
  )
}

export default MainSidebar;