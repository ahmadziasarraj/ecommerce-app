import ThemeToggle from "@/components/shared/theme-toggle";
import Image from "next/image";

export default function Home() {
  return (
    <div className="p-2">
      <div className="w-full flex items-center justify-end">
        <ThemeToggle />
      </div>
      hellow world!
    </div>
  );
}
