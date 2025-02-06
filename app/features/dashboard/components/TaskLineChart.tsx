import { useMemo } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { useTaskContext } from "~/features/task/context/TaskContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const months = [
  "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"
];

const TaskLineChart = () => {
  const { tasks } = useTaskContext(); // Get tasks from context

  // Process tasks to count per month
  const chartData = useMemo(() => {
    const taskCounts: { [key: string]: number } = {};

    tasks.forEach((task) => {
      const taskMonth = new Date(task.dueDate).getMonth();
      const monthName = months[taskMonth];

      taskCounts[monthName] = (taskCounts[monthName] || 0) + 1;
    });

    return months.map((month) => ({
      month,
      taskCount: taskCounts[month] || 0, // Default to 0 if no tasks in that month
    }));
  }, [tasks]);

  const chartConfig = {
    taskCount: {
      label: "Tasks",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="w-1/2">
      <CardHeader>
        <CardTitle>Tasks by Month</CardTitle>
        <CardDescription>Overview of tasks from January - December</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            width={600}
            height={300}
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)} // Shorten month names
            />
            <YAxis tickCount={10} 
  domain={[0, "dataMax + 10"]} 
  ticks={[0, 20, 40, 60, 80, 100]} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Line
              dataKey="taskCount"
              type="monotone"
              stroke="var(--color-taskCount)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default TaskLineChart;

