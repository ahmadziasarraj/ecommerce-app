"use client";

// Icons
import { MoonIcon, SunIcon } from "lucide-react";

// UI Components
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

// Theme shwicher - Next Theme
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="w-8 h-8 rounded-full">
          <SunIcon className="w-[1.4rem] h-[1.4rem] scale-100 rotate-0 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute w-[1.4rem] h-[1.4rem] scale-0 -rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle Theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
