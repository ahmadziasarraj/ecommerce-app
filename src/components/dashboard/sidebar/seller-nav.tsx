"use client"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "@/components/ui/sidebar";
import { DashboardSidebarMenuGroupInterface } from "@/lib/types";
import * as Icons from "@/components/dashboard/icons";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SellerSidebarNav({ menuLinks }: { menuLinks: DashboardSidebarMenuGroupInterface[] }) {
    const pathName = usePathname();
    const firstPrtUrl = pathName.split('/stores/')[1];
    const storeUrl = firstPrtUrl ? firstPrtUrl.split('/')[0] : "";

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {menuLinks.map((menuGroup, index) => {
                    const Icon = menuGroup.icon ? (Icons as any)[menuGroup.icon] : null;
                    if (menuGroup.items) {
                        return (
                            <Collapsible
                                key={index}
                                asChild
                                defaultOpen={menuGroup.isActive}
                                className="group/collapsible"
                            >
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton tooltip={menuGroup.label}>

                                            {Icon && <Icon />}
                                            <span>{menuGroup.label}</span>
                                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {menuGroup.items?.map((subItem) => {
                                                const Icon2 = subItem.icon ? (Icons as any)[subItem.icon] : null;
                                                return (
                                                    <SidebarMenuSubItem key={subItem.link}>
                                                        <SidebarMenuSubButton asChild>
                                                            <Link href={`/dashboard/seller/stores/${storeUrl}/${subItem.link}`} className="flex items-center gap-2 hover:bg-transparent rounded-sm transition-all w-full">
                                                                {Icon2 && <Icon2 />}
                                                                <span>{subItem.label}</span>
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                )
                                            })}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        )
                    } else {
                        return (
                            <SidebarMenuItem key={index}>
                                <SidebarMenuButton tooltip={menuGroup.label}>
                                    {Icon && <Icon />}
                                    <Link href={`/dashboard/seller/stores/${storeUrl}/${menuGroup.link}`} className="flex items-center gap-2 hover:bg-transparent rounded-sm transition-all w-full">
                                    <span>{menuGroup.label}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )
                    }

                }
                )
                }
            </SidebarMenu>
        </SidebarGroup>
    )
}
