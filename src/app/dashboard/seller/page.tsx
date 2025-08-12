import { auth } from "@/auth"
import { getUserStores } from "@/queries/store";
import { redirect } from "next/navigation";


export default async function SellerDashboard() {
  const session = await auth();
  
  const stores = await getUserStores();
  
  // Redirect the user if don't has any Store to the Store create page
  if(stores && stores.length === 0) redirect('/dashboard/seller/stores/new');

  return redirect(`/dashboard/seller/stores/${stores![0].url}`);
}
