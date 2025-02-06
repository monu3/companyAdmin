"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { dummyData } from "./dummyData"


const chartData = [
  { category: "totalPaid", Amount: dummyData.data.financial.totalPaid, fill: "var(--color-totalPaid)" },
  { category: "totalRevenue", Amount: dummyData.data.financial.totalRevenue, fill: "var(--color-totalRevenue)" },
  { category: "totalDue", Amount: dummyData.data.financial.totalDue, fill: "var(--color-totalDue)" },
  { category: "totalTask", Amount: dummyData.data.financial.totalTax, fill: "var(--color-totalTax)" },
]

const chartConfig = {
  value: {
    label: "Amount",
  },
  totalPaid: {
    label: "TotalPaid",
    color: "hsl(var(--chart-1))",
  },
  totalRevenue: {
    label: "TotalRevenue",
    color: "hsl(var(--chart-2))",
  },
  totalDue: {
    label: "Total Due",
    color: "hsl(var(--chart-3))",
  },
  totalTask: {
    label: "Total Tax",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

export function FinancialData() {
  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Bar Chart - Mixed</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="category"
              type="category"
              tickLine={false}
              tickMargin={6}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="Amount" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="Amount" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
