import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import * as React from "react";
import Layout from "@/pages/layout";
import PublicLayout from "../pages/layout/PublicLayout";
import { HowItWorks } from "@/features/how-it-works";
import DonorFormPage from "@/features/blood-donor/DonorCreation";

const HomePage = lazy(() => import("@/pages/home"));
const DashboardPage = lazy(() => import("@/pages/dashboard"));
const RequestsPage = lazy(() => import("@/pages/blood-request"));
const NewRequestPage = lazy(() => import("@/pages/blood-request/request-from"));
const HistoryPage = lazy(() => import("@/pages/history"));
const NotificationsPage = lazy(() => import("@/pages/notifications"));
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("@/components/ui/auth-image-panel"));

const router = createBrowserRouter([
  {
    path: "/login",
    element: React.createElement(LoginPage),
  },
  {
    path: "register",
    element: React.createElement(RegisterPage),
  },
  {
    path: "/",
    element: React.createElement(PublicLayout),
    children: [
      {
        index: true,
        element: React.createElement(HomePage),
      },
      {
        path: "how-it-works",
        element: React.createElement(HowItWorks),
      },
      {
        path: "donor-creation",
        element: React.createElement(DonorFormPage),
      },
    ],
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
    path: "donor-creation",
    element: React.createElement(DonorFormPage),
  },
]);

export default router;
