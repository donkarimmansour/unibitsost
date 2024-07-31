"use client"

import Link from "next/link"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Scatter,
  ScatterChart,
  XAxis,
} from "recharts"

import { Skeleton } from "@/components/ui/skeleton"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart"

export function Analytics({ chartConfig, chartData }: any) {
  return (
    <ChartContainer config={chartConfig} className="h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          // tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="product" fill="var(--color-product)" radius={4} />
        <Bar dataKey="quantity" fill="var(--color-quantity)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}

export const AnalyticsLine = ({ chartConfig, chartData }: any) => {
  return (
    <ChartContainer config={chartConfig} className="h-[200px] w-full">
      <LineChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          // tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line dataKey="product" fill="var(--color-product)" radius={4} />
        <Line dataKey="quantity" fill="var(--color-quantity)" radius={4} />
      </LineChart>
    </ChartContainer>
  )
}

export const AnalyticsArea = ({ chartConfig, chartData }: any) => {
  return (
    <ChartContainer config={chartConfig} className="h-[200px] w-full">
      <AreaChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          // tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Area dataKey="product" fill="var(--color-product)" radius={4} />
        <Area dataKey="quantity" fill="var(--color-quantity)" radius={4} />
      </AreaChart>
    </ChartContainer>
  )
}

export const AnalyticsScatter = ({ chartConfig, chartData }: any) => {
  return (
    <ChartContainer config={chartConfig} className="h-[200px] w-full">
      <ScatterChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          // tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Scatter dataKey="product" fill="var(--color-product)" radius={4} />
        <Scatter dataKey="quantity" fill="var(--color-quantity)" radius={4} />
      </ScatterChart>
    </ChartContainer>
  )
}

Analytics.Skeleton = () => {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
