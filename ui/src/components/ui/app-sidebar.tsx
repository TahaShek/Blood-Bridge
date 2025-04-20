// import type { ReactNode } from "react";
// import { Droplet, Home, FileText, Bell, History, Settings, LogOut } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarProvider,
//   SidebarTrigger,
// } from "@/components/ui/sidebar";
// import { Link } from "react-router-dom";
// import { cn } from "@/lib/utils";

// type SidebarLinkProps = {
//   href: string;
//   icon: ReactNode;
//   label: string;
//   isActive?: boolean;
// };

// const SidebarLink = ({ href, icon, label, isActive }: SidebarLinkProps) => (
//   <SidebarMenuItem>
//     <SidebarMenuButton
//       asChild
//       isActive={isActive}
//       className={cn(
//         "text-gray-500 hover:text-gray-900 transition-colors",
//         isActive && "bg-red-50 text-red-700 font-medium"
//       )}
//     >
//       <Link to={href}>
//         {icon}
//         <span>{label}</span>
//       </Link>
//     </SidebarMenuButton>
//   </SidebarMenuItem>
// );

// export function AppSidebar() {
//   const routes = [
//     { href: "/dashboard", icon: <Home className="h-5 w-5 mr-3" />, label: "Dashboard" },
//     { href: "/dashboard/requests", icon: <FileText className="h-5 w-5 mr-3" />, label: "Blood Requests" },
//     { href: "/dashboard/notifications", icon: <Bell className="h-5 w-5 mr-3" />, label: "Notifications" },
//     { href: "/dashboard/history", icon: <History className="h-5 w-5 mr-3" />, label: "History" },
//     { href: "/dashboard/settings", icon: <Settings className="h-5 w-5 mr-3" />, label: "Settings" },
//   ];

//   return (
//     <Sidebar>
//       {/* Sidebar Header */}
//       <SidebarHeader>
//         <div className="flex items-center">
//           <Droplet className="h-6 w-6 text-red-700 mr-2" />
//           <div>
//             <div className="text-red-700 font-bold text-base">Blood Bridge</div>
//             <div className="text-slate-500 text-xs">Donation Portal</div>
//           </div>
//         </div>
//       </SidebarHeader>

//       {/* Sidebar Navigation */}
//       <SidebarContent>
//         <SidebarMenu>
//           {routes.map((route) => (
//             <SidebarLink
//               key={route.href}
//               href={route.href}
//               icon={route.icon}
//               label={route.label}
//               // isActive={pathname === route.href} // Uncomment when you have router setup
//             />
//           ))}
//         </SidebarMenu>
//       </SidebarContent>

//       {/* Sidebar Footer */}
//       <SidebarFooter>
//         <SidebarMenu>
//           <SidebarLink
//             href="/logout"
//             icon={<LogOut className="h-5 w-5 mr-3" />}
//             label="Logout"
//           />
//         </SidebarMenu>
//       </SidebarFooter>
//     </Sidebar>
//   );
// }

// // Layout component remains exactly the same
// export function AppSidebarLayout({ children }: { children: ReactNode }) {
//   return (
//     <SidebarProvider>
//       <div className="flex min-h-screen w-full">
//         <AppSidebar />
//         <div className="flex-1 flex flex-col overflow-hidden">
//           <div className="flex items-center h-16 px-4 border-b bg-white">
//             <SidebarTrigger />
//           </div>
//           <main className="flex-1 overflow-auto p-4 md:p-6 bg-slate-50">
//             {children}
//           </main>
//         </div>
//       </div>
//     </SidebarProvider>
//   );
// }

import type { ReactNode } from "react";
import {
  Droplet,
  Home,
  FileText,
  Bell,
  History,
  Settings,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type SidebarLinkProps = {
  href: string;
  icon: ReactNode;
  label: string;
  isActive?: boolean;
};

const SidebarLink = ({ href, icon, label, isActive }: SidebarLinkProps) => (
  <SidebarMenuItem>
    <SidebarMenuButton
      asChild
      isActive={isActive}
      className={cn(
        "text-gray-500 hover:text-gray-900 transition-colors",
        isActive && "bg-red-50 text-red-700 font-medium"
      )}
    >
      <Link to={href}>
        {icon}
        <span>{label}</span>
      </Link>
    </SidebarMenuButton>
  </SidebarMenuItem>
);

export function AppSidebar() {
  const routes = [
    {
      href: "/dashboard",
      icon: <Home className="h-5 w-5 mr-3" />,
      label: "Dashboard",
    },
    {
      href: "/requests",
      icon: <FileText className="h-5 w-5 mr-3" />,
      label: "Blood Requests",
    },
    {
      href: "/notifications",
      icon: <Bell className="h-5 w-5 mr-3" />,
      label: "Notifications",
    },
    {
      href: "/history",
      icon: <History className="h-5 w-5 mr-3" />,
      label: "History",
    },
    {
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5 mr-3" />,
      label: "Settings",
    },
  ];

  return (
    <Sidebar>
      {/* Sidebar Header */}
      <SidebarHeader>
        <div className="flex items-center">
          <Droplet className="h-6 w-6 text-red-700 mr-2" />
          <div>
            <div className="text-red-700 font-bold text-base">Blood Bridge</div>
          </div>
        </div>
      </SidebarHeader>

      {/* Sidebar Navigation */}
      <SidebarContent>
        <SidebarMenu>
          {routes.map((route) => (
            <SidebarLink
              key={route.href}
              href={route.href}
              icon={route.icon}
              label={route.label}
              // isActive={pathname === route.href} // Uncomment when you have router setup
            />
          ))}
        </SidebarMenu>
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarLink
            href="/logout"
            icon={<LogOut className="h-5 w-5 mr-3" />}
            label="Logout"
          />
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

// Layout component remains exactly the same
export function AppSidebarLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center h-16 px-4 border-b bg-white">
            <SidebarTrigger />
          </div>
          <main className="flex-1 overflow-auto p-4 md:p-6 bg-slate-50">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
