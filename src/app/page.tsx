import ThemeToggle from "@/components/shared/theme-toggle";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="p-2">
      <div className="w-full flex items-center gap-x-2 justify-end">
        <UserButton />
        <ThemeToggle />
      </div>
      hellow world!
    </div>
  );
}
