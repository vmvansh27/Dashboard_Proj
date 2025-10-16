import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, AlertTriangle, CheckCircle, Eye, Lock, Zap } from "lucide-react"

export function SecurityMonitoring() {
  const securityEvents = [
    {
      type: "threat_detected",
      title: "Malware Detected",
      description: "Suspicious file quarantined on DESKTOP-001",
      severity: "high",
      time: "5 minutes ago",
      source: "SentinelOne",
    },
    {
      type: "access_granted",
      title: "Admin Access Granted",
      description: "User john.doe@company.com elevated privileges",
      severity: "medium",
      time: "15 minutes ago",
      source: "Active Directory",
    },
    {
      type: "backup_encrypted",
      title: "Backup Encryption Verified",
      description: "All backup files encrypted successfully",
      severity: "low",
      time: "1 hour ago",
      source: "Veeam",
    },
    {
      type: "policy_violation",
      title: "Policy Violation",
      description: "Unauthorized USB device detected",
      severity: "medium",
      time: "2 hours ago",
      source: "Endpoint Protection",
    },
  ]

  const getEventIcon = (type: string) => {
    switch (type) {
      case "threat_detected":
        return <AlertTriangle className="w-4 h-4 text-destructive" />
      case "access_granted":
        return <Lock className="w-4 h-4 text-warning" />
      case "backup_encrypted":
        return <CheckCircle className="w-4 h-4 text-success" />
      case "policy_violation":
        return <Eye className="w-4 h-4 text-warning" />
      default:
        return <Shield className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">High</Badge>
      case "medium":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Medium</Badge>
      case "low":
        return <Badge className="bg-success/10 text-success border-success/20">Low</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Security Monitoring</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">Live</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 rounded-lg bg-success/10 border border-success/20">
            <Shield className="w-6 h-6 text-success mx-auto mb-2" />
            <p className="text-lg font-bold text-success">847</p>
            <p className="text-xs text-muted-foreground">Protected Endpoints</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-warning/10 border border-warning/20">
            <AlertTriangle className="w-6 h-6 text-warning mx-auto mb-2" />
            <p className="text-lg font-bold text-warning">12</p>
            <p className="text-xs text-muted-foreground">Active Threats</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-primary/10 border border-primary/20">
            <Zap className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-lg font-bold text-primary">99.8%</p>
            <p className="text-xs text-muted-foreground">Detection Rate</p>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground mb-3">Recent Security Events</h3>
          {securityEvents.map((event, index) => (
            <div key={index} className="p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
              <div className="flex items-start space-x-3">
                {getEventIcon(event.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-foreground text-sm">{event.title}</p>
                    {getSeverityBadge(event.severity)}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{event.source}</span>
                    <span>{event.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
