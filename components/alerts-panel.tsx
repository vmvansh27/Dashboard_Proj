import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, XCircle, Clock, CheckCircle, X, Eye } from "lucide-react"

export function AlertsPanel() {
  const alerts = [
    {
      id: 1,
      type: "critical",
      title: "Backup Job Failed",
      message: "SQL Server backup failed due to insufficient storage space",
      time: "5 minutes ago",
      source: "Backup System",
    },
    {
      id: 2,
      type: "warning",
      title: "High Storage Usage",
      message: "Backup repository is 85% full",
      time: "15 minutes ago",
      source: "Storage Monitor",
    },
    {
      id: 3,
      type: "info",
      title: "Security Scan Complete",
      message: "Weekly security scan completed successfully",
      time: "1 hour ago",
      source: "SentinelOne",
    },
    {
      id: 4,
      type: "warning",
      title: "License Expiring",
      message: "Veeam license expires in 30 days",
      time: "2 hours ago",
      source: "License Manager",
    },
    {
      id: 5,
      type: "critical",
      title: "Malware Detected",
      message: "Suspicious activity detected on endpoint DESKTOP-001",
      time: "3 hours ago",
      source: "Endpoint Protection",
    },
  ]

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <XCircle className="w-4 h-4 text-destructive" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-warning" />
      case "info":
        return <CheckCircle className="w-4 h-4 text-primary" />
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getAlertBadge = (type: string) => {
    switch (type) {
      case "critical":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Critical</Badge>
      case "warning":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Warning</Badge>
      case "info":
        return <Badge className="bg-primary/10 text-primary border-primary/20">Info</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Active Alerts</CardTitle>
          <Badge variant="outline" className="text-xs">
            {alerts.length} Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className="p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getAlertIcon(alert.type)}
                  {getAlertBadge(alert.type)}
                </div>
                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Eye className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              <div className="space-y-1">
                <p className="font-medium text-foreground text-sm">{alert.title}</p>
                <p className="text-sm text-muted-foreground">{alert.message}</p>
                <div className="flex justify-between text-xs text-muted-foreground pt-1">
                  <span>{alert.source}</span>
                  <span>{alert.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="outline" className="w-full text-sm bg-transparent">
            View All Alerts
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
