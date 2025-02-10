"use client"

import { TrendingUp } from "lucide-react"
import { RadialBar, RadialBarChart } from "recharts"

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
import { useTaskContext } from "~/features/task/context/TaskContext"
import { useState, useEffect } from "react"
const chartConfig = {
  status: {
    label: "Status",
  },
  todo: {
    label: "Todo",
    color: "hsl(var(--chart-1))",
  },
  progress: {
    label: "InProgress",
    color: "hsl(var(--chart-2))",
  },
  testing: {
    label: "Testing",
    color: "hsl(var(--chart-3))",
  },
  bug: {
    label: "Bug",
    color: "hsl(var(--chart-4))",
  },
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function TaskRadialChart() {
  const {tasks} = useTaskContext();

  const [countTodo, setCountTodo] = useState(0);
    const [countInProgress, setCountInProgress] = useState(0);
    const [countTesting, setCountTesting] = useState(0);
    const [countBug, setCountBug] = useState(0);
    const [countCompleted, setCountCompleted] = useState(0);
  
    // Count different project statuses
    useEffect(() => {
      let todo = 0, progress = 0, testing = 0, bug = 0, completed = 0;
  
      tasks.forEach((task) => {
        if (task.status === "TO_DO") todo++;
        if (task.status === "IN_PROGRESS") progress++;
        if (task.status === "TESTING") testing++;
        if (task.status === "BUG") bug++;
        if (task.status === "COMPLETED") completed++;
      });
  
      setCountTodo(todo);
      setCountInProgress(progress);
      setCountTesting(testing);
      setCountBug(bug);
      setCountCompleted(completed);
    }, [tasks]); // Runs whenever `data` changes

  const chartData = [
    { status: "todo", count: countTodo, fill: "var(--color-todo)" },
    { status: "progress", count: countInProgress, fill: "var(--color-progress)" },
    { status: "testing", count: countTesting, fill: "var(--color-testing)" },
    { status: "bug", count: countBug, fill: "var(--color-bug)" },
    { status: "completed", count: countCompleted, fill: "var(--color-completed)" },
  ]
  return (
    <Card className="flex flex-col items-center lg:w-1/2">
      <CardHeader className="items-center pb-0">
        <CardTitle>Radial Chart</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart data={chartData} innerRadius={30} outerRadius={110}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="status" />}
            />
            <RadialBar dataKey="count" background />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
