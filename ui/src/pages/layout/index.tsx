import { AppSidebarLayout } from "@/components/ui/app-sidebar";
import { AuthProvider } from "@/providers/AuthProvider";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      {/* <AuthProvider> */}
      <AppSidebarLayout>
        <Outlet />
      </AppSidebarLayout>
      {/* </AuthProvider> */}
    </>
  );
}

export default Layout;
