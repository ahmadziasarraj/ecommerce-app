'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from "next-auth"
import { BadgeCheck, Bell, ChevronsUpDown, CreditCard, CreditCardIcon, LogOut, LogOutIcon, SettingsIcon, Sparkle, UserIcon } from "lucide-react"

export default function UserInfo({ user }: { user: User | null }) {
    const { isMobile } = useSidebar();

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={user?.image!} alt={user?.name!} />
                                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{user?.name}</span>
                                <span className="truncate text-xs">{user?.email}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={user?.image!} alt={user?.name!} />
                                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">{user?.name}</span>
                                    <span className="truncate text-xs">{user?.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Sparkle />
                                Upgrade to Pro
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <BadgeCheck />
                                Account
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <CreditCard />
                                Billing
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Bell />
                                Notifications
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <LogOut />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>

        // <SidebarMenu>
        //     <SidebarMenuItem>
        //         <DropdownMenu>
        //             <DropdownMenuTrigger asChild>
        //                 <Button className="justify-between px-0.5 h-12" variant="secondary">
        //                     <div className="flex items-center text-left gap-1">
        //                         <Avatar >
        //                             <AvatarImage
        //                                 src={user?.image!}
        //                                 alt={user?.name!}
        //                             />
        //                             <AvatarFallback className="text-primary"> {user?.name!.charAt(0)}</AvatarFallback>
        //                         </Avatar>
        //                         <div className="flex flex-col text-sm">
        //                             {user?.name}
        //                             <span className="text-muted-foreground text-xs">
        //                                 {user?.email}
        //                             </span>
        //                             {/* <span className="w-fit">
        //                                 <Badge variant={"secondary"} >
        //                                     {user?.role.toLocaleUpperCase()} Dashboard
        //                                 </Badge>
        //                             </span> */}
        //                         </div>
        //                     </div>
        //                     <ChevronsUpDown className="opacity-50" />
        //                 </Button>
        //             </DropdownMenuTrigger>
        //             <DropdownMenuContent align="end" side="right" sideOffset={10} className="min-w-52">
        //                 <DropdownMenuItem>
        //                     <UserIcon />
        //                     Profile
        //                 </DropdownMenuItem>
        //                 <DropdownMenuItem>
        //                     <CreditCardIcon />
        //                     Billing
        //                 </DropdownMenuItem>
        //                 <DropdownMenuItem>
        //                     <SettingsIcon />
        //                     Settings
        //                 </DropdownMenuItem>
        //                 <DropdownMenuSeparator />
        //                 <DropdownMenuItem>
        //                     <LogOutIcon />
        //                     Log out
        //                 </DropdownMenuItem>
        //             </DropdownMenuContent>
        //         </DropdownMenu>
        //     </SidebarMenuItem>
        // </SidebarMenu>

    )
}
