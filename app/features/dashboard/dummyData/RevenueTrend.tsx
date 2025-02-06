// "use client"

// import { TrendingUp } from "lucide-react"
// import { CartesianGrid, Dot, Line, LineChart } from "recharts"

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   type ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart"
// import { dummyData } from "./dummyData"
// const chartData = dummyData.data.financial.revenueTrend.map((entry) => ({
//   date: entry._id,  // Using _id as date
//   revenue: entry.dailyRevenue,
//   fill: "var(--color-chrome)",  // You can customize colors for each line or point
// }))

// const chartConfig = {
//   revenue: {
//     label: "Revenue",
//     color: "hsl(var(--chart-2))",
//   },
// } satisfies ChartConfig


// export function RevenueTrend() {
//   return (
//     <Card className="w-[500px]">
//       <CardHeader>
//         <CardTitle>Line Chart - Dots Colors</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer config={chartConfig}>
//           <LineChart
//             accessibilityLayer
//             data={chartData}
//             margin={{
//               top: 24,
//               left: 24,
//               right: 24,
//             }}
//           >
//             <CartesianGrid vertical={false} />
//             <ChartTooltip
//               cursor={false}
//               content={
//                 <ChartTooltipContent
//                   indicator="line"
//                   nameKey="Revenue"
//                   hideLabel
//                 />
//               }
//             />
//             <Line
//               dataKey="revenue"
//               type="natural"
//               stroke="var(--color-revenue)"
//               strokeWidth={2}
//               dot={({ payload, ...props }) => {
//                 return (
//                   <Dot
//                     key={payload.browser}
//                     r={5}
//                     cx={props.cx}
//                     cy={props.cy}
//                     fill={payload.fill}
//                     stroke={payload.fill}
//                   />
//                 )
//               }}
//             />
//           </LineChart>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   )
// }

"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
const chartData = dummyData.data.financial.revenueTrend.map((entry) => ({
  date: entry._id,  // Using _id as date
  revenue: entry.dailyRevenue,
  fill: "var(--color-chrome)",  // You can customize colors for each line or point
}))

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig


export function RevenueTrend() {
  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Revenue Trend</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              //tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="revenue"
              type="natural"
              stroke="var(--color-revenue)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-revenue)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
