import { log } from "console"
import { notFound } from "next/navigation"

import { type ChartConfig } from "@/components/ui/chart"
import {
  Analytics,
  AnalyticsArea,
  AnalyticsLine,
  AnalyticsScatter,
} from "@/components/analytics"

export const metadata = {
  title: "statistics",
  description: "statistics page.",
}

async function geStatisticsForUser() {
  const response = await fetch(`https://fakestoreapi.com/carts?limit=12`)
  if (!response.ok) {
    console.log("Failed to fetch data")
    return null
  }
  const statistics = await response.json()

  return statistics.map((product: any) => ({
    date: product.date,
    quantity: product.products
      .map((p: any) => p.quantity)
      .reduce((total: number, quantity: any) => {
        return total + quantity
      }),
    product: product.products
      .map((p: any) => p.productId)
      .reduce((total: number, product: any) => {
        return total + product
      }),
  }))
}

export default async function StatisticsPage() {
  const statistics = await geStatisticsForUser()

  if (!statistics) {
    notFound()
  }

  const chartData = statistics
  // const chartData = [
  //   { date: "2020-03-02", product: 1, quantity: 4 },
  //   { date: "2020-03-02", product: 2, quantity: 1 },
  //   { date: "2020-03-02", product: 3, quantity: 6 },
  //   { date: "2020-01-02", product: 2, quantity: 4 },
  //   { date: "2020-01-02", product: 1, quantity: 10 },
  //   { date: "2020-01-02", product: 5, quantity: 2 },
  //   { date: "2020-03-01", product: 1, quantity: 2 },
  //   { date: "2020-03-01", product: 9, quantity: 1 },
  //   { date: "2020-01-01", product: 1, quantity: 4 },
  //   { date: "2020-03-01", product: 7, quantity: 1 },
  //   { date: "2020-03-01", product: 8, quantity: 1 },
  //   { date: "2020-03-01", product: 10, quantity: 2 },
  //   { date: "2020-03-01", product: 12, quantity: 3 },
  //   { date: "2020-03-01", product: 18, quantity: 1 },
  // ]

  const chartConfig = {
    product: {
      label: "Product",
      color: "hsl(var(--chart-5))",
    },
    quantity: {
      label: "Quantity",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig

  return (
    <div>
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-6">
          <div className="flex justify-center border-2 border-gray-300">
            <Analytics chartData={chartData} chartConfig={chartConfig} />
          </div>
          <div className="flex justify-center border-2 border-gray-300">
            <AnalyticsLine chartData={chartData} chartConfig={chartConfig} />
          </div>
          <div className="flex justify-center border-2 border-gray-300">
            <AnalyticsArea chartData={chartData} chartConfig={chartConfig} />
          </div>
          <div className="flex justify-center border-2 border-gray-300">
            <AnalyticsScatter chartData={chartData} chartConfig={chartConfig} />
          </div>
        </div>
      </div>
    </div>
  )
}
