import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import * as React from "react";
import Layout from "@/pages/layout";
import HomePage from "@/pages/home";
import DashboardPage from "@/pages/dashboard";
import RequestsPage from "@/pages/blood-request";
import NewRequestPage from "@/pages/blood-request/request-from";
import HistoryPage from "@/pages/history";
import NotificationsPage from "@/pages/notifications";

const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("@/components/ui/auth-image-panel"));

const router = createBrowserRouter([
  {
    path: "/",
    element: React.createElement(LoginPage),
    index: true,
  },
  {
    path: "register",
    element: React.createElement(RegisterPage),
  },
  {
    path: "",
    element: React.createElement(Layout),
    children: [
      {
        path: "dashboard",
        element: React.createElement(DashboardPage),
      },

      {
        path: "requests",
        children: [
          {
            path: "",
            element: React.createElement(RequestsPage),
          },
          {
            path: "new",
            element: React.createElement(NewRequestPage),
          },
        ],
      },

      {
        path: "notifications",
        element: React.createElement(NotificationsPage),
      },
      {
        path: "history",
        element: React.createElement(HistoryPage),
      },
    ],
  },

  {
    path: "home",
    element: React.createElement(HomePage),
  },
]);

export default router;
