// app/routes.ts
import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  layout("features/home/pages/HomePage.tsx", [
    index("features/dashboard/pages/dashboardPage.tsx"),
    route("projects", "features/project/pages/ProjectPage.tsx"),
    route("tasks/list", "features/task/components/listTasks.tsx"),
    route("employee", "features/employee/pages/employeePage.tsx"),
    route("tasks", "features/task/pages/taskPage.tsx"),
  ]),

] satisfies RouteConfig;
