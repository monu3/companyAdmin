// app/routes.ts
import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  route("login", "features/loginAndLogoutAuth/pages/loginPage.tsx"),
  //layout("features/login/component/ProtectedRoute.tsx", [
  layout("features/home/pages/HomePage.tsx", [
    index("features/dashboard/pages/dashboardPage.tsx"),
    route("projects", "features/project/pages/ProjectPage.tsx"),
    route("tasks/list", "features/task/components/listTasks.tsx"),
    route("employee", "features/employee/pages/EmployeePage.tsx"),
    route("tasks", "features/task/pages/taskPage.tsx"),
    route("client", "features/client/pages/clientPage.tsx"),
    route("profile", "features/profile/page/profilePage.tsx"),
    route("/editProfile", "features/profile/components/EditProfilePage.tsx"),
    route("/projectReport", "features/projectReport/pages/taskHistoryPage.tsx"),
  ]),
  // ]),
  route("contact", "features/ContactUs/ContactUs.tsx"),
  route("*", "features/NotFound/NotFoundPage.tsx"),
] satisfies RouteConfig;
