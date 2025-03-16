import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/admin/overview"
import { RecentArticles } from "@/components/admin/recent-articles"
import { StatsCards } from "@/components/admin/stats-cards"
import { PopularArticles } from "@/components/admin/popular-articles"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>

      <StatsCards />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>Site traffic and engagement over the past 30 days</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Popular Articles</CardTitle>
            <CardDescription>Most read articles this week</CardDescription>
          </CardHeader>
          <CardContent>
            <PopularArticles />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Articles</CardTitle>
          <CardDescription>Recently published and draft articles</CardDescription>
        </CardHeader>
        <CardContent>
          <RecentArticles />
        </CardContent>
      </Card>
    </div>
  )
}

