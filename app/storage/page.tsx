"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function StoragePage() {
  const [storageData, setStorageData] = useState<any>(null);

  useEffect(() => {
    const fetchStorage = async () => {
      try {
        const res = await fetch("/api/veeam/storage");
        const data = await res.json();
        console.log("Storage API response:", data);
        setStorageData(data);
      } catch (err) {
        console.error("Error fetching storage data:", err);
      }
    };
    fetchStorage();
  }, []);

  if (!storageData || storageData.error) {
    return <div className="p-6 text-gray-500">No storage data available</div>;
  }

  const repositories = storageData.data || storageData.repositories || [];

  const totalUsed = repositories.reduce(
    (sum: number, repo: any) => sum + (repo.usedSpaceGB || 0),
    0
  );
  const totalSize = repositories.reduce(
    (sum: number, repo: any) => sum + (repo.totalSpaceGB || 0),
    0
  );
  const usagePercent =
    totalSize > 0 ? Math.round((totalUsed / totalSize) * 100) : 0;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Storage Overview</h1>

      <Card>
        <CardHeader>
          <CardTitle>Total Storage Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 mb-2">
            {totalUsed} GB used of {totalSize} GB ({usagePercent}%)
          </p>
          <Progress value={usagePercent} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Repositories</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {repositories.map((repo: any) => (
              <li key={repo.id}>
                <div className="flex justify-between text-sm">
                  <span>{repo.name}</span>
                  <span>
                    {repo.usedSpaceGB} / {repo.totalSpaceGB} GB
                  </span>
                </div>
                <Progress
                  value={Math.round(
                    (repo.usedSpaceGB / repo.totalSpaceGB) * 100
                  )}
                />
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
