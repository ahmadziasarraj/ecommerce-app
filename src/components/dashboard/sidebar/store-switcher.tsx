"use client";

import { Store } from '@/generated/prisma'
import { FC, useState } from 'react'
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useParams, useRouter } from 'next/navigation';

interface StoreSwitcherProps {
    stores: Store[]
}

const StoreSwitcher: FC<StoreSwitcherProps> = ({ stores }) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    const router = useRouter();
    const params = useParams();
    const activeStore = stores.find((store) => store.url ===  `/${params.storeUrl}`);
    
    return (
        <div className='my-3'>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[230px] justify-between capitalize"
                    >{activeStore === undefined ? 'Select Store' : activeStore.name} <ChevronsUpDown className="opacity-50" /></Button>
                </PopoverTrigger>
                <PopoverContent className="w-[230px] p-0">
                    <Command>
                        <CommandList>
                            <CommandEmpty>No store found.</CommandEmpty>
                            <CommandGroup>
                                {stores.map((store) => (
                                    <CommandItem
                                        key={store.name}
                                        value={store.name}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue)
                                            setOpen(false)
                                            router.push(`/dashboard/seller/stores/${store.url}`)
                                        }}
                                        className='cursor-pointer capitalize'
                                    >
                                        {store.name}
                                        <Check
                                            className={cn(
                                                "ml-auto",
                                                activeStore?.name === store.name ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default StoreSwitcher;
