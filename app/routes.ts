// app/routes.ts
import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  index("features/signIn/signIn.tsx"),
  layout("features/home/pages/HomePage.tsx", [
    route("dashboard", "features/dashboard/pages/dashboardPage.tsx"),
    route("projects", "features/project/pages/ProjectPage.tsx"),
    route("tasks/list", "features/task/components/listTasks.tsx"),
    route("employee", "features/employee/pages/employeePage.tsx"),
    route("tasks", "features/task/pages/taskPage.tsx"),
    route("client","features/client/pages/clientPage.tsx")
  ]),

] satisfies RouteConfig;
