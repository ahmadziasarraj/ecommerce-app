"use client";

import { Store } from '@/generated/prisma'
import { FC, useState } from 'react'
import { ChevronsUpDown, Plus } from "lucide-react"
import { useParams, useRouter } from 'next/navigation';
import { SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface StoreSwitcherProps {
    stores: Store[]
}

const StoreSwitcher: FC<StoreSwitcherProps> = ({ stores }) => {

    const router = useRouter();
    const params = useParams();
    const activeStore = stores.find((store) => store.url === `/${params.storeUrl}`);
    const [currStore, setCurrStore] = useState<Store | null>(activeStore ?? null);

    if (!activeStore) return '';
    const { isMobile } = useSidebar();
    
    return (
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton
                                size="lg"
                                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            >
                                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage src={currStore?.logo!} alt={currStore?.name!} />
                                        <AvatarFallback className="rounded-lg">ST</AvatarFallback>
                                    </Avatar>
                                    {/* <currStore.logo className="size-4" /> */}
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">{currStore?.name}</span>
                                    <span className="truncate text-xs">{currStore?.email}</span>
                                    
                                </div>
                                <ChevronsUpDown className="ml-auto" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                            align="start"
                            side={isMobile ? "bottom" : "right"}
                            sideOffset={4}
                        >
                            <DropdownMenuLabel className="text-muted-foreground text-xs">
                                Stores
                            </DropdownMenuLabel>
                            {stores.map((store, index) => (
                                <DropdownMenuItem
                                    key={store.name}
                                    onClick={() => {
                                        setCurrStore(store)
                                        router.push(`/dashboard/seller/stores/${store.url}`)
                                    }}
                                    className="gap-2 p-2"
                                >
                                    <div className="flex size-6 items-center justify-center rounded-md border">
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarImage src={store?.logo!} alt={store?.name!} />
                                            <AvatarFallback className="rounded-lg">{store?.name}</AvatarFallback>
                                        </Avatar>
                                        {/* <store.logo className="size-3.5 shrink-0" /> */}
                                    </div>
                                    {store.name}
                                </DropdownMenuItem>
                            ))}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2 p-2">
                                <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                                    <Plus className="size-4" />
                                </div>
                                <div className="text-muted-foreground font-medium">Add store</div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>



            {/* <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton asChild>
                                <Button
                                    variant="secondary"
                                    className="justify-between capitalize"
                                >{activeStore === undefined ? 'Select Store' : activeStore.name} <ChevronsUpDown className="opacity-50" /></Button>
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                            {stores.map((store) => (
                                <DropdownMenuCheckboxItem
                                    key={store.name}
                                    checked={store.name == value}
                                    onCheckedChange={(currentValue) => {
                                        setValue(currentValue === false ? "" : store.name)
                                       
                                        router.push(`/dashboard/seller/stores/${store.url}`)
                                    }}
                                >
                                    {store.name}
                                </DropdownMenuCheckboxItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu> */}
        </SidebarHeader>

    )
}

export default StoreSwitcher;
