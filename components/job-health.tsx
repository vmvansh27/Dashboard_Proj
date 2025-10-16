import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Clock, CheckCircle, XCircle, AlertTriangle, MoreHorizontal } from "lucide-react"

export function JobHealth() {
  const jobStats = {
    total: 24,
    successful: 18,
    failed: 2,
    warning: 3,
    running: 1,
  }

  const recentJobs = [
    {
      name: "Daily VM Backup",
      status: "success",
      duration: "2h 15m",
      dataProcessed: "1.2 TB",
      time: "03:00 AM",
    },
    {
      name: "Exchange Incremental",
      status: "success",
      duration: "45m",
      dataProcessed: "340 GB",
      time: "04:30 AM",
    },
    {
      name: "File Server Sync",
      status: "warning",
      duration: "1h 32m",
      dataProcessed: "890 GB",
      time: "05:15 AM",
    },
    {
      name: "SQL Transaction Log",
      status: "failed",
      duration: "12m",
      dataProcessed: "0 GB",
      time: "06:00 AM",
    },
    {
      name: "Cloud Replication",
      status: "running",
      duration: "1h 8m",
      dataProcessed: "2.1 TB",
      time: "Running",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-success" />
      case "failed":
        return <XCircle className="w-4 h-4 text-destructive" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-warning" />
      case "running":
        return <Activity className="w-4 h-4 text-primary animate-pulse" />
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-success/10 text-success border-success/20">Success</Badge>
      case "failed":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Failed</Badge>
      case "warning":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Warning</Badge>
      case "running":
        return <Badge className="bg-primary/10 text-primary border-primary/20">Running</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Job Health</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 gap-3 mb-6">
          <div className="text-center p-3 rounded-lg bg-muted/50 border border-border">
            <p className="text-lg font-bold text-foreground">{jobStats.total}</p>
            <p className="text-xs text-muted-foreground">Total Jobs</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-success/10 border border-success/20">
            <p className="text-lg font-bold text-success">{jobStats.successful}</p>
            <p className="text-xs text-muted-foreground">Success</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-warning/10 border border-warning/20">
            <p className="text-lg font-bold text-warning">{jobStats.warning}</p>
            <p className="text-xs text-muted-foreground">Warning</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-destructive/10 border border-destructive/20">
            <p className="text-lg font-bold text-destructive">{jobStats.failed}</p>
            <p className="text-xs text-muted-foreground">Failed</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-primary/10 border border-primary/20">
            <p className="text-lg font-bold text-primary">{jobStats.running}</p>
            <p className="text-xs text-muted-foreground">Running</p>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground mb-3">Recent Job Activity</h3>
          {recentJobs.map((job, index) => (
            <div key={index} className="p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(job.status)}
                  <div>
                    <p className="font-medium text-foreground text-sm">{job.name}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                      <span>Duration: {job.duration}</span>
                      <span>Data: {job.dataProcessed}</span>
                      <span>Time: {job.time}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(job.status)}
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
