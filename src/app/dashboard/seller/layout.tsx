import { auth } from "@/auth"
import { redirect } from "next/navigation";

export default async function SellerDashboardLayout({children}: {children : React.ReactNode}) {

  const session = await auth();
  if(!session || session.user.role !== 'SELLER') return redirect('/')

  return (
    <div>{children}</div>
  )
}
