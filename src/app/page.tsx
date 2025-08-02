import SignIn from "@/components/shared/sign-in";
import ThemeToggle from "@/components/shared/theme-toggle";

export default function Home() {
  return (
    <div className="p-2">
      <div className="w-full flex items-center gap-x-2 justify-end">
        <SignIn />
        <ThemeToggle />
      </div>
      hellow world!
    </div>
  );
}
