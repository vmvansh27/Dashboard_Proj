import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { HardDrive, Database, Cloud, Archive, TrendingUp } from "lucide-react"

export function StorageMetrics() {
  const storageData = [
    {
      name: "Primary Storage",
      used: 2.4,
      total: 5.0,
      percentage: 48,
      icon: HardDrive,
      color: "text-primary",
    },
    {
      name: "Backup Repository",
      used: 8.7,
      total: 12.0,
      percentage: 73,
      icon: Database,
      color: "text-warning",
    },
    {
      name: "Cloud Storage",
      used: 15.2,
      total: 25.0,
      percentage: 61,
      icon: Cloud,
      color: "text-success",
    },
    {
      name: "Archive Storage",
      used: 45.8,
      total: 100.0,
      percentage: 46,
      icon: Archive,
      color: "text-muted-foreground",
    },
  ]

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "bg-destructive"
    if (percentage >= 60) return "bg-warning"
    return "bg-success"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Storage Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {storageData.map((storage, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <storage.icon className={`w-5 h-5 ${storage.color}`} />
                  <div>
                    <p className="font-medium text-foreground">{storage.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {storage.used} TB of {storage.total} TB used
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-foreground">{storage.percentage}%</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +2.3% this week
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Progress value={storage.percentage} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0 TB</span>
                  <span>{storage.total} TB</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Total Storage Capacity</p>
              <p className="text-sm text-muted-foreground">Across all repositories</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-foreground">142 TB</p>
              <p className="text-sm text-muted-foreground">72.1 TB available</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
