// "use client";

// import { useEffect, useState } from "react";
// import { DashboardHeader } from "@/components/dashboard-header";
// import { DashboardSidebar } from "@/components/dashboard-sidebar";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { AlertTriangle, XCircle, Clock, CheckCircle } from "lucide-react";

// interface BackupJob {
//   instanceUid: string;
//   clientName: string;
//   name: string;
//   systemType: string;
//   status: string;
//   lastRun: string;
//   lastDuration: number;
//   backedUpSize: number; // in bytes
//   nextRun: string | null;
// }

// export default function ClientWisePage() {
//   const [jobs, setJobs] = useState<BackupJob[]>([]);
//   const [loading, setLoading] = useState(true);

//   const getAlertIcon = (status: string) => {
//     switch (status) {
//       case "Failed":
//         return (
//           <XCircle className="w-4 h-4 text-destructive inline-block mr-1" />
//         );
//       case "Warning":
//         return (
//           <AlertTriangle className="w-4 h-4 text-yellow-500 inline-block mr-1" />
//         );
//       case "Success":
//         return (
//           <CheckCircle className="w-4 h-4 text-green-500 inline-block mr-1" />
//         );
//       case "Running":
//         return (
//           <Clock className="w-4 h-4 text-blue-500 inline-block mr-1 animate-spin" />
//         );
//       default:
//         return (
//           <Clock className="w-4 h-4 text-muted-foreground inline-block mr-1" />
//         );
//     }
//   };

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const res = await fetch("/api/veeam");
//         const json = await res.json();
//         setJobs(json.data || []);
//       } catch (err) {
//         console.error("Error fetching client-wise data:", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchData();
//     const interval = setInterval(fetchData, 1800000);
//     return () => clearInterval(interval);
//   }, []);

//   if (loading) return <p className="p-6">Loading...</p>;

//   // --- Group jobs by client ---
//   const clients: Record<string, BackupJob[]> = {};
//   jobs.forEach((job) => {
//     const client = job.clientName || "Unknown";
//     if (!clients[client]) clients[client] = [];
//     clients[client].push(job);
//   });

//   return (
//     <div className="min-h-screen flex bg-background overflow-x-hidden">
//       <DashboardSidebar className="flex-shrink-0 w-64" />
//       <div className="flex-1 flex flex-col overflow-x-hidden">
//         <DashboardHeader title="Client-Wise Backup Summary" />

//         <main className="flex-1 p-6 space-y-6 overflow-x-hidden">
//           {Object.entries(clients).map(([clientName, clientJobs]) => {
//             const totalJobs = clientJobs.length;
//             const successJobs = clientJobs.filter(
//               (j) => j.status === "Success"
//             ).length;
//             const warningJobs = clientJobs.filter(
//               (j) => j.status === "Warning"
//             ).length;
//             const failedJobs = clientJobs.filter(
//               (j) => j.status === "Failed"
//             ).length;
//             const runningJobs = clientJobs.filter(
//               (j) => j.status === "Running"
//             ).length;

//             return (
//               <Card key={clientName}>
//                 <CardHeader>
//                   <CardTitle>{clientName}</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p>Total Jobs: {totalJobs}</p>
//                   <p>
//                     ✅ Success: {successJobs} | ⚠️ Warnings: {warningJobs} | ❌
//                     Failures: {failedJobs} | 🕒 Running: {runningJobs}
//                   </p>
//                   {clientJobs.map((job) => (
//                     <div
//                       key={job.instanceUid}
//                       className="border-t border-gray-200 mt-2 pt-2"
//                     >
//                       <p className="flex items-center">
//                         {getAlertIcon(job.status)} {job.name} ({job.systemType})
//                         - Last Run: {new Date(job.lastRun).toLocaleString()} -
//                         Duration: {Math.floor(job.lastDuration / 60)}m
//                       </p>
//                     </div>
//                   ))}
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </main>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import { DashboardHeader } from "@/components/dashboard-header";
// import { DashboardSidebar } from "@/components/dashboard-sidebar";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { AlertTriangle, XCircle, Clock, CheckCircle } from "lucide-react";

// interface BackupJob {
//   instanceUid: string;
//   clientName: string;
//   name: string;
//   systemType: string;
//   status: string;
//   lastRun: string;
//   lastDuration: number;
//   backedUpSize: number; // in bytes
//   nextRun: string | null;
// }

// export default function ClientWisePage() {
//   const [jobs, setJobs] = useState<BackupJob[]>([]);
//   const [loading, setLoading] = useState(true);

//   const getAlertIcon = (status: string) => {
//     switch (status) {
//       case "Failed":
//         return (
//           <XCircle className="w-4 h-4 text-destructive inline-block mr-1" />
//         );
//       case "Warning":
//         return (
//           <AlertTriangle className="w-4 h-4 text-yellow-500 inline-block mr-1" />
//         );
//       case "Success":
//         return (
//           <CheckCircle className="w-4 h-4 text-green-500 inline-block mr-1" />
//         );
//       case "Running":
//         return (
//           <Clock className="w-4 h-4 text-blue-500 inline-block mr-1 animate-spin" />
//         );
//       default:
//         return (
//           <Clock className="w-4 h-4 text-muted-foreground inline-block mr-1" />
//         );
//     }
//   };

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const res = await fetch("/api/veeam");
//         const json = await res.json();
//         setJobs(json.data || []);
//       } catch (err) {
//         console.error("Error fetching client-wise data:", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchData();
//     const interval = setInterval(fetchData, 1800000); // refresh every 30 min
//     return () => clearInterval(interval);
//   }, []);

//   if (loading) return <p className="p-6">Loading...</p>;

//   // --- Group jobs by client ---
//   const clients: Record<string, BackupJob[]> = {};
//   jobs.forEach((job) => {
//     const client = job.clientName || "Unknown";
//     if (!clients[client]) clients[client] = [];
//     clients[client].push(job);
//   });

//   return (
//     <div className="min-h-screen flex bg-background overflow-x-hidden">
//       <DashboardSidebar className="flex-shrink-0 w-64" />
//       <div className="flex-1 flex flex-col overflow-x-hidden">
//         <DashboardHeader title="Client-Wise Backup Summary" />
//         <main className="flex-1 p-6 space-y-6 overflow-x-hidden">
//           {Object.entries(clients).map(([clientName, clientJobs]) => {
//             const statusPriority: Record<string, number> = {
//               Failed: 1,
//               Warning: 2,
//               Running: 3,
//               Success: 4,
//             };
//             const sortedJobs = [...clientJobs].sort(
//               (a, b) =>
//                 (statusPriority[a.status] || 99) -
//                 (statusPriority[b.status] || 99)
//             );

//             // --- Compute client summaries ---
//             const totalJobs = sortedJobs.length;
//             const successJobs = sortedJobs.filter(
//               (j) => j.status === "Success"
//             ).length;
//             const warningJobs = sortedJobs.filter(
//               (j) => j.status === "Warning"
//             ).length;
//             const failedJobs = sortedJobs.filter(
//               (j) => j.status === "Failed"
//             ).length;
//             const runningJobs = sortedJobs.filter(
//               (j) => j.status === "Running"
//             ).length;

//             return (
//               <Card key={clientName}>
//                 <CardHeader>
//                   <CardTitle>{clientName}</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
//                     <Card>
//                       <CardHeader>
//                         <CardTitle>Total Jobs</CardTitle>
//                       </CardHeader>
//                       <CardContent>{totalJobs}</CardContent>
//                     </Card>
//                     <Card>
//                       <CardHeader>
//                         <CardTitle>Success</CardTitle>
//                       </CardHeader>
//                       <CardContent>{successJobs}</CardContent>
//                     </Card>
//                     <Card>
//                       <CardHeader>
//                         <CardTitle>Warning</CardTitle>
//                       </CardHeader>
//                       <CardContent>{warningJobs}</CardContent>
//                     </Card>
//                     <Card>
//                       <CardHeader>
//                         <CardTitle>Failed</CardTitle>
//                       </CardHeader>
//                       <CardContent>{failedJobs}</CardContent>
//                     </Card>
//                   </div>

//                   {/* Individual Jobs */}
//                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                     {sortedJobs.map((job) => (
//                       <Card
//                         key={job.instanceUid}
//                         className={`${
//                           job.status === "Failed"
//                             ? "border-destructive/50"
//                             : job.status === "Warning"
//                             ? "border-yellow-400/50"
//                             : job.status === "Running"
//                             ? "border-blue-400/50"
//                             : "border-green-400/50"
//                         }`}
//                       >
//                         <CardHeader className="flex items-center gap-2 truncate">
//                           {getAlertIcon(job.status)}
//                           <span className="truncate">{job.name}</span>
//                         </CardHeader>
//                         <CardContent>
//                           <p className="flex items-center">
//                             {getAlertIcon(job.status)} Status: {job.status}
//                           </p>
//                           <p>System: {job.systemType}</p>
//                           <p>
//                             Last Run: {new Date(job.lastRun).toLocaleString()}
//                           </p>
//                           <p>Duration: {Math.floor(job.lastDuration / 60)}m</p>
//                           <p>
//                             Size: {(job.backedUpSize / 1024 ** 3).toFixed(2)} GB
//                           </p>
//                           <p>
//                             Next Run:{" "}
//                             {job.nextRun
//                               ? new Date(job.nextRun).toLocaleString()
//                               : "N/A"}
//                           </p>
//                         </CardContent>
//                       </Card>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </main>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertTriangle, XCircle, Clock, CheckCircle } from "lucide-react";

interface BackupJob {
  instanceUid: string;
  clientName: string;
  name: string;
  systemType: string;
  status: string;
  lastRun: string;
  lastDuration: number;
  backedUpSize: number; // in bytes
  nextRun: string | null;
}

export default function ClientWisePage() {
  const [jobs, setJobs] = useState<BackupJob[]>([]);
  const [loading, setLoading] = useState(true);

  const getAlertIcon = (status: string) => {
    switch (status) {
      case "Failed":
        return (
          <XCircle className="w-4 h-4 text-destructive inline-block mr-1" />
        );
      case "Warning":
        return (
          <AlertTriangle className="w-4 h-4 text-yellow-500 inline-block mr-1" />
        );
      case "Success":
        return (
          <CheckCircle className="w-4 h-4 text-green-500 inline-block mr-1" />
        );
      case "Running":
        return (
          <Clock className="w-4 h-4 text-blue-500 inline-block mr-1 animate-spin" />
        );
      default:
        return (
          <Clock className="w-4 h-4 text-muted-foreground inline-block mr-1" />
        );
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/veeam");
        const json = await res.json();
        setJobs(json.data || []);
      } catch (err) {
        console.error("Error fetching client-wise data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 1800000); // refresh every 30 min
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  // --- Group jobs by client ---
  const clients: Record<string, BackupJob[]> = {};
  jobs.forEach((job) => {
    const client = job.clientName || "Unknown";
    if (!clients[client]) clients[client] = [];
    clients[client].push(job);
  });

  // --- Sort clients alphabetically, Unknown last ---
  const clientEntries = Object.entries(clients).sort(([nameA], [nameB]) => {
    if (nameA === "Unknown") return 1;
    if (nameB === "Unknown") return -1;
    return nameA.localeCompare(nameB);
  });

  return (
    <div className="min-h-screen flex bg-background overflow-x-hidden">
      <DashboardSidebar className="flex-shrink-0 w-64" />
      <div className="flex-1 flex flex-col overflow-x-hidden">
        <DashboardHeader title="Client-Wise Backup Summary" />
        <main className="flex-1 p-6 space-y-6 overflow-x-hidden">
          {clientEntries.map(([clientName, clientJobs]) => {
            // --- Compute client summaries ---
            const totalJobs = clientJobs.length;
            const successJobs = clientJobs.filter(
              (j) => j.status === "Success"
            ).length;
            const warningJobs = clientJobs.filter(
              (j) => j.status === "Warning"
            ).length;
            const failedJobs = clientJobs.filter(
              (j) => j.status === "Failed"
            ).length;
            const runningJobs = clientJobs.filter(
              (j) => j.status === "Running"
            ).length;

            // --- Sort jobs by status: Failed → Warning → Running → Success ---
            const sortedJobs = [...clientJobs].sort((a, b) => {
              const priority: Record<string, number> = {
                Failed: 1,
                Warning: 2,
                Running: 3,
                Success: 4,
              };
              return (priority[a.status] || 99) - (priority[b.status] || 99);
            });

            return (
              <Card key={clientName}>
                <CardHeader>
                  {/* <CardTitle>{clientName}</CardTitle> */}
                  <CardTitle>Backup Status Client Wise</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Total Jobs</CardTitle>
                      </CardHeader>
                      <CardContent>{totalJobs}</CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Failed</CardTitle>
                      </CardHeader>
                      <CardContent>{failedJobs}</CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Warning</CardTitle>
                      </CardHeader>
                      <CardContent>{warningJobs}</CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Running</CardTitle>
                      </CardHeader>
                      <CardContent>{runningJobs}</CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Success</CardTitle>
                      </CardHeader>
                      <CardContent>{successJobs}</CardContent>
                    </Card>
                  </div>

                  {/* Individual Jobs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {sortedJobs.map((job) => (
                      <Card
                        key={job.instanceUid}
                        className={`${
                          job.status === "Failed"
                            ? "border-destructive/50"
                            : job.status === "Warning"
                            ? "border-yellow-400/50"
                            : job.status === "Running"
                            ? "border-blue-400/50"
                            : "border-green-400/50"
                        }`}
                      >
                        <CardHeader className="flex items-center gap-2 truncate">
                          {getAlertIcon(job.status)}
                          <span className="truncate">{job.name}</span>
                        </CardHeader>
                        <CardContent>
                          <p className="flex items-center">
                            {getAlertIcon(job.status)} Status: {job.status}
                          </p>
                          <p>System: {job.systemType}</p>
                          <p>
                            Last Run: {new Date(job.lastRun).toLocaleString()}
                          </p>
                          <p>Duration: {Math.floor(job.lastDuration / 60)}m</p>
                          <p>
                            Size: {(job.backedUpSize / 1024 ** 3).toFixed(2)} GB
                          </p>
                          <p>
                            Next Run:{" "}
                            {job.nextRun
                              ? new Date(job.nextRun).toLocaleString()
                              : "N/A"}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </main>
      </div>
    </div>
  );
}
