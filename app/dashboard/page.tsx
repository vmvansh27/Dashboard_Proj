"use client";

import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertTriangle, XCircle, Clock, CheckCircle } from "lucide-react";
import { Pie, Doughnut, Line } from "react-chartjs-2";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

interface BackupJob {
  instanceUid: string;
  name: string;
  systemType: string;
  status: string;
  lastRun: string;
  lastDuration: number;
  backedUpSize: number;
  nextRun: string | null;
}

interface StorageRepo {
  name: string;
  used: number;
  total: number;
}

interface Alert {
  id: number;
  message: string;
  severity: "warning" | "critical";
}

export default function DashboardPage() {
  const [jobs, setJobs] = useState<BackupJob[]>([]);
  const [storage, setStorage] = useState<StorageRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState<Alert[]>([]);

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
        setStorage(json.storage || []);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 1800000); // refresh every 30 min
    return () => clearInterval(interval);
  }, []);

  // --- Alerts calculation inside useEffect to prevent infinite re-renders ---
  useEffect(() => {
    const totalJobs = jobs.length;
    const successJobs = jobs.filter((j) => j.status === "Success").length;
    const failedJobs = jobs.filter((j) => j.status === "Failed").length;

    const lowSpaceRepos = storage.filter(
      (repo) => repo.total > 0 && (repo.used / repo.total) * 100 > 85
    );

    const dynamicAlerts: Alert[] = [];
    if (failedJobs > 0) {
      dynamicAlerts.push({
        id: 1,
        message: `${failedJobs} backup job${
          failedJobs > 1 ? "s" : ""
        } failed in last 24h`,
        severity: "critical",
      });
    }
    if (lowSpaceRepos.length > 0) {
      const repoNames = lowSpaceRepos.map((r) => r.name).join(", ");
      dynamicAlerts.push({
        id: 2,
        message: `${lowSpaceRepos.length} repos below 15% free (${repoNames})`,
        severity: "warning",
      });
    }
    setAlerts(dynamicAlerts);
  }, [jobs, storage]);

  if (loading) return <p className="p-6">Loading...</p>;

  // --- Job stats ---
  const totalJobs = jobs.length;
  const successJobs = jobs.filter((j) => j.status === "Success").length;
  const warningJobs = jobs.filter((j) => j.status === "Warning").length;
  const failedJobs = jobs.filter((j) => j.status === "Failed").length;
  const runningJobs = jobs.filter((j) => j.status === "Running").length;
  const backupSuccessRate = totalJobs ? (successJobs / totalJobs) * 100 : 0;

  // --- Storage stats ---
  const totalStorageUsed = storage.reduce((sum, s) => sum + s.used, 0);
  const totalStorageCapacity = storage.reduce((sum, s) => sum + s.total, 0);
  const storageUsagePercent = totalStorageCapacity
    ? (totalStorageUsed / totalStorageCapacity) * 100
    : 0;

  // --- Charts ---
  const jobStatusData = {
    labels: ["Failed", "Warning", "Running", "Success"],
    datasets: [
      {
        data: [failedJobs, warningJobs, runningJobs, successJobs],
        backgroundColor: ["#ef4444", "#facc15", "#3b82f6", "#22c55e"],
        borderWidth: 0,
      },
    ],
  };

  const storageData = {
    labels: ["Used", "Free"],
    datasets: [
      {
        data: [totalStorageUsed, totalStorageCapacity - totalStorageUsed],
        backgroundColor: ["#3b82f6", "#e5e7eb"],
        borderWidth: 0,
      },
    ],
  };

  const trendData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Success",
        data: [80, 85, 82, 88, 90, 92, backupSuccessRate],
        borderColor: "#22c55e",
        tension: 0.3,
      },
      {
        label: "Failed",
        data: [5, 4, 6, 3, 2, 4, failedJobs],
        borderColor: "#ef4444",
        tension: 0.3,
      },
    ],
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex bg-background overflow-x-hidden">
        <DashboardSidebar className="flex-shrink-0 w-64" />
        <div className="flex-1 flex flex-col overflow-x-hidden">
          <DashboardHeader />
          <main className="flex-1 p-6 space-y-6 overflow-x-hidden">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Backup Success Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  {backupSuccessRate.toFixed(1)}% ({successJobs}/{totalJobs})
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Job Status Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <Pie
                    data={jobStatusData}
                    options={{ plugins: { legend: { position: "bottom" } } }}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Storage Utilization</CardTitle>
                </CardHeader>
                <CardContent>
                  <Doughnut
                    data={storageData}
                    options={{
                      plugins: { legend: { position: "bottom" } },
                      cutout: "70%",
                    }}
                  />
                  <p className="text-center mt-2">
                    {(totalStorageUsed / 1024 ** 3).toFixed(2)} GB of{" "}
                    {(totalStorageCapacity / 1024 ** 3).toFixed(2)} GB (
                    {storageUsagePercent.toFixed(1)}%)
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Running Jobs</CardTitle>
                </CardHeader>
                <CardContent>{runningJobs}</CardContent>
              </Card>
            </div>

            {/* Trend Chart */}
            <Card>
              <CardHeader>
                <CardTitle>7-Day Backup Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ height: "250px" }}>
                  <Line
                    data={trendData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false, // important to respect the div height
                      plugins: { legend: { position: "bottom" } },
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Active Alerts */}
            {alerts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Active Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {alerts.map((a) => (
                      <li key={a.id} className="flex items-center">
                        {a.severity === "critical" ? (
                          <XCircle className="text-red-500 w-4 h-4 mr-2" />
                        ) : (
                          <AlertTriangle className="text-yellow-500 w-4 h-4 mr-2" />
                        )}
                        {a.message}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
