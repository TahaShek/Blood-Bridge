import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import router from "./routes/index.ts";
import { AuthProvider } from "./providers/AuthProvider"; // Import the AuthProvider
import { BloodRequestProvider } from "./providers/BloodRequestProvider.tsx";
import { Toaster } from "@/components/ui/toaster";
import AppInitializer from "./providers/AppInitilizer.tsx";
import FCMSetup from "./components/FCMsetup/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FCMSetup />
    <AuthProvider>
      {" "}
      {/* <AppInitializer /> */}
      <BloodRequestProvider>
        <RouterProvider router={router} />
      </BloodRequestProvider>
      {/* Wrap the RouterProvider with AuthProvider */}
      <Toaster />
    </AuthProvider>
  </StrictMode>
);
