import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, HardDrive, Shield, Database, TrendingUp, TrendingDown } from "lucide-react"

export function SystemOverview() {
  const metrics = [
    {
      title: "Backup Success Rate",
      value: "98.5%",
      change: "+2.1%",
      trend: "up",
      icon: HardDrive,
      color: "text-success",
    },
    {
      title: "Security Score",
      value: "94/100",
      change: "+5",
      trend: "up",
      icon: Shield,
      color: "text-success",
    },
    {
      title: "Storage Utilization",
      value: "73.2%",
      change: "+8.3%",
      trend: "up",
      icon: Database,
      color: "text-warning",
    },
    {
      title: "System Health",
      value: "99.1%",
      change: "-0.2%",
      trend: "down",
      icon: Activity,
      color: "text-success",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">System Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className="p-4 rounded-lg bg-muted/50 border border-border">
              <div className="flex items-center justify-between mb-2">
                <metric.icon className={`w-5 h-5 ${metric.color}`} />
                <Badge variant={metric.trend === "up" ? "default" : "secondary"} className="text-xs">
                  {metric.trend === "up" ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  )}
                  {metric.change}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                <p className="text-sm text-muted-foreground">{metric.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <div>
              <p className="text-sm font-medium text-foreground">All Systems Operational</p>
              <p className="text-xs text-muted-foreground">Last updated: 2 minutes ago</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
