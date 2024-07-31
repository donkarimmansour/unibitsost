import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { ProductFormUpdate } from "@/components/product-form-update"

async function geProductForUser(productId: string) {
  const response = await fetch(`https://fakestoreapi.com/products/${productId}`)
  if (!response.ok) {
    throw new Error("Failed to fetch data")
  }
  const product = await response.json()
  return product
}

interface ProductFormPageProps {
  params: { productId: string }
}

export default async function ProductIdPage({ params }: ProductFormPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const product = await geProductForUser(params.productId)

  if (!product) {
    notFound()
  }

  return <ProductFormUpdate product={product} />
}
