// "use client";

// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   LayoutDashboard,
//   HardDrive,
//   Shield,
//   Database,
//   Activity,
//   AlertTriangle,
//   BarChart3,
//   Settings,
//   Users,
//   Calendar,
//   FileText,
//   Zap,
// } from "lucide-react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// export function DashboardSidebar() {
//   const pathname = usePathname();

//   const menuItems = [
//     { icon: LayoutDashboard, label: "Overview", path: "/" },
//     { icon: Users, label: "Client Wise", path: "/client-wise" },
//     { icon: HardDrive, label: "Backup Jobs", badge: "12", path: "#" },
//     { icon: Shield, label: "Security", badge: "3", path: "#" },
//     { icon: Database, label: "Storage", badge: "85%", path: "/storage" },

//     { icon: Activity, label: "System Health", path: "#" },
//     { icon: AlertTriangle, label: "Alerts", badge: "5", path: "#" },
//     { icon: BarChart3, label: "Reports", path: "#" },
//     { icon: Users, label: "User Management", path: "#" },
//     { icon: Calendar, label: "Scheduling", path: "#" },
//     { icon: FileText, label: "Logs", path: "#" },
//     { icon: Zap, label: "Integrations", path: "#" },
//     { icon: Settings, label: "Settings", path: "#" },
//   ];

//   return (
//     <aside className="w-64 bg-sidebar border-r border-sidebar-border">
//       <div className="p-4">
//         {/* MONITORING SECTION */}
//         <div className="space-y-1">
//           <h2 className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider mb-3">
//             MONITORING
//           </h2>
//           {menuItems.slice(0, 6).map((item, index) => {
//             const isActive = pathname === item.path;
//             return (
//               <Link key={index} href={item.path}>
//                 <Button
//                   variant={isActive ? "default" : "ghost"}
//                   className={`w-full justify-start text-left ${
//                     isActive
//                       ? "bg-sidebar-primary text-sidebar-primary-foreground"
//                       : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
//                   }`}
//                   size="sm"
//                 >
//                   <item.icon className="w-4 h-4 mr-3" />
//                   <span className="flex-1">{item.label}</span>
//                   {item.badge && (
//                     <Badge
//                       variant={isActive ? "secondary" : "outline"}
//                       className="text-xs"
//                     >
//                       {item.badge}
//                     </Badge>
//                   )}
//                 </Button>
//               </Link>
//             );
//           })}
//         </div>

//         {/* MANAGEMENT SECTION */}
//         <div className="space-y-1 mt-6">
//           <h2 className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider mb-3">
//             MANAGEMENT
//           </h2>
//           {menuItems.slice(6).map((item, index) => (
//             <Link key={index + 6} href={item.path}>
//               <Button
//                 variant="ghost"
//                 className="w-full justify-start text-left text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
//                 size="sm"
//               >
//                 <item.icon className="w-4 h-4 mr-3" />
//                 <span className="flex-1">{item.label}</span>
//                 {item.badge && (
//                   <Badge variant="outline" className="text-xs">
//                     {item.badge}
//                   </Badge>
//                 )}
//               </Button>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </aside>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  HardDrive,
  Shield,
  Database,
  Activity,
  AlertTriangle,
  BarChart3,
  Settings,
  Users,
  Calendar,
  FileText,
  Zap,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/" },
    { icon: Users, label: "Client Wise", path: "/client-wise" },
    { icon: HardDrive, label: "Backup Jobs", badge: "12", path: "#" },
    { icon: Shield, label: "Security", badge: "3", path: "#" },
    { icon: Database, label: "Storage", badge: "85%", path: "/storage" },
    { icon: Activity, label: "System Health", path: "#" },
    { icon: AlertTriangle, label: "Alerts", badge: "5", path: "#" },
    { icon: BarChart3, label: "Reports", path: "#" },
    { icon: Users, label: "User Management", path: "#" },
    { icon: Calendar, label: "Scheduling", path: "#" },
    { icon: FileText, label: "Logs", path: "#" },
    { icon: Zap, label: "Integrations", path: "#" },
    { icon: Settings, label: "Settings", path: "#" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/");
  };

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col justify-between h-screen">
      <div className="p-4">
        {/* MONITORING SECTION */}
        <div className="space-y-1">
          <h2 className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider mb-3">
            MONITORING
          </h2>
          {menuItems.slice(0, 6).map((item, index) => {
            const isActive = pathname === item.path;
            return (
              <Link key={index} href={item.path}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start text-left ${
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                  size="sm"
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <Badge
                      variant={isActive ? "secondary" : "outline"}
                      className="text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              </Link>
            );
          })}
        </div>

        {/* MANAGEMENT SECTION */}
        <div className="space-y-1 mt-6">
          <h2 className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider mb-3">
            MANAGEMENT
          </h2>
          {menuItems.slice(6).map((item, index) => (
            <Link key={index + 6} href={item.path}>
              <Button
                variant="ghost"
                className="w-full justify-start text-left text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                size="sm"
              >
                <item.icon className="w-4 h-4 mr-3" />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <Badge variant="outline" className="text-xs">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            </Link>
          ))}
        </div>
      </div>

      {/* LOGOUT BUTTON */}
      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className="w-full justify-start text-left text-red-500 hover:bg-red-100 hover:text-red-600"
          size="sm"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-3" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
