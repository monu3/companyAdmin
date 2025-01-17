// app/routes.ts
import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  layout("features/home/pages/HomePage.tsx",[
    index("features/dashboard/pages/dashboardPage.tsx"),
    route("projects", "features/project/pages/ProjectPage.tsx"),
    route("employee","features/employee/pages/employeePage.tsx")
  ]),
  // Home route (root/index route it will be SSR)

  // index("routes/home.tsx"), // Home route (root/index route it will be SSR)
  // route("test", "routes/test.tsx"), // Test  route it will be CSR
] satisfies RouteConfig;
