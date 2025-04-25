import { AppSidebarLayout } from "@/components/ui/app-sidebar";
// import { AuthProvider } from "@/providers/AuthProvider";
import { Outlet } from "react-router-dom";
import AuthGuard from "./AuthGuard";

function Layout() {
  return (
    <>
      {/* <AuthProvider> */}
      <AuthGuard>
        <AppSidebarLayout>
          <Outlet />
        </AppSidebarLayout>
      </AuthGuard>
      {/* </AuthProvider> */}
    </>
  );
}

export default Layout;
