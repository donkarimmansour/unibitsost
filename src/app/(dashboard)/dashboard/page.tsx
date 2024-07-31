import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { ProductCreateButton } from "@/components/product-create-button"
import { ProductItem } from "@/components/product-item"
import { DashboardShell } from "@/components/shell"

export const metadata = {
  title: "Dashboard",
}

const ProductList = async () => {
  const response = await fetch("https://fakestoreapi.com/products?limit=12")
  if (!response.ok) {
    throw new Error("Failed to fetch data")
  }
  const products = await response.json()
  return products
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const products = await ProductList()

  return (
    <DashboardShell>
      <DashboardHeader heading="Products" text="Create and manage products.">
        <ProductCreateButton />
      </DashboardHeader>
      <div>
        {products?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {products.map((product: any) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="product" />
            <EmptyPlaceholder.Title>No products created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don't have any products yet. Start creating content.
            </EmptyPlaceholder.Description>
            <ProductCreateButton variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}
