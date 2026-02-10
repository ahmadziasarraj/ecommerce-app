"use client"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { icons } from "@/constants/icons";
import { DashboardSidebarMenuGroupInterface } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebarNav({menuLinks} : {menuLinks:DashboardSidebarMenuGroupInterface[]}) {
    const pathName = usePathname(); 
    
  return (
    <a href="">df</a>
    // <nav className="relative grow">
    //     <Command className="bg-transparent overflow-visible">
    //         <CommandInput placeholder="search menu..." />
    //         <CommandList className="overflow-visible">
    //             <CommandEmpty>No Menu Found.</CommandEmpty>
    //             <CommandGroup className="overflow-visible relative">
    //                 {menuLinks.map((link) => {
    //                     let icon;
    //                     const searchIcon = icons.find((icon) => icon.value === link.icon);
    //                     searchIcon ? icon = <searchIcon.path /> : '';
    //                     return (
    //                         <CommandItem 
    //                             key={link.link} 
    //                             className={cn("w-full h-10 cursor-pointer my-0.5", {
    //                                 "bg-accent text-accent-foreground": link.link === pathName
    //                             })}
    //                         >
    //                             <Link href={link.link} className="flex items-center gap-2 hover:bg-transparent rounded-sm transition-all w-full">
    //                                 {icon} 
    //                                 <span>{link.label}</span>
    //                             </Link>

    //                         </CommandItem>
    //                     );
    //                 })}
    //             </CommandGroup>
    //         </CommandList>
    //     </Command>
    // </nav>
  )
}
