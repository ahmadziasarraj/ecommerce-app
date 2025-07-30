import SignIn from "@/components/shared/sign-in";
import { SignInResend } from "@/components/shared/sign-in-resend";
import ThemeToggle from "@/components/shared/theme-toggle";
import Image from "next/image";

export default function Home() {
  return (
    <div className="p-2">
      <div className="w-full flex items-center gap-x-2 justify-end">
        <SignIn />
        <SignInResend />
        <ThemeToggle />
      </div>
      hellow world!
    </div>
  );
}
