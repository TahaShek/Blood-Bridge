import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import router from "./routes/index.ts";
import { AuthProvider } from "./providers/AuthProvider"; // Import the AuthProvider

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      {" "}
      {/* Wrap the RouterProvider with AuthProvider */}
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
