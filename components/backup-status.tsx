import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, Clock, AlertCircle, ChevronRight } from "lucide-react"

export function BackupStatus() {
  const backupJobs = [
    {
      name: "SQL Server Production",
      status: "success",
      progress: 100,
      lastRun: "2 hours ago",
      nextRun: "In 22 hours",
      size: "2.4 TB",
    },
    {
      name: "Exchange Server",
      status: "running",
      progress: 67,
      lastRun: "Running",
      nextRun: "In progress",
      size: "1.8 TB",
    },
    {
      name: "File Server Backup",
      status: "success",
      progress: 100,
      lastRun: "4 hours ago",
      nextRun: "In 20 hours",
      size: "890 GB",
    },
    {
      name: "VM Infrastructure",
      status: "warning",
      progress: 85,
      lastRun: "1 hour ago",
      nextRun: "In 23 hours",
      size: "3.2 TB",
    },
    {
      name: "SharePoint Online",
      status: "failed",
      progress: 0,
      lastRun: "6 hours ago",
      nextRun: "Retry in 2 hours",
      size: "450 GB",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-success" />
      case "running":
        return <Clock className="w-4 h-4 text-primary animate-spin" />
      case "warning":
        return <AlertCircle className="w-4 h-4 text-warning" />
      case "failed":
        return <XCircle className="w-4 h-4 text-destructive" />
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-success/10 text-success border-success/20">Success</Badge>
      case "running":
        return <Badge className="bg-primary/10 text-primary border-primary/20">Running</Badge>
      case "warning":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Warning</Badge>
      case "failed":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Failed</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Backup Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {backupJobs.map((job, index) => (
            <div key={index} className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(job.status)}
                  <div>
                    <p className="font-medium text-foreground">{job.name}</p>
                    <p className="text-sm text-muted-foreground">{job.size}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(job.status)}
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>

              {job.status === "running" && (
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-foreground">{job.progress}%</span>
                  </div>
                  <Progress value={job.progress} className="h-2" />
                </div>
              )}

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Last run: {job.lastRun}</span>
                <span className="text-muted-foreground">Next: {job.nextRun}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
