import { redirect } from "next/navigation" 
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { ProductFormCreate } from "@/components/product-form-create"

 
export default async function ProductPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login") 
  }


  return (
        <ProductFormCreate/>
  )
}