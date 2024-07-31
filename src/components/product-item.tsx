import Link from "next/link"

import { formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { ProductOperations } from "@/components/product-operations"
 

export function ProductItem({ product }: any) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/product/${product.id}`}
          className="font-semibold hover:underline"
        >
          {product.title}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(product.createdAt?.toDateString() || new Date())}
          </p>
        </div>
      </div>
      <ProductOperations product={{ id: product.id, title: product.title }} />
    </div>
  )
}

ProductItem.Skeleton = () => {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}