import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Overview } from "@/components/admin/overview"
import { AnalyticsStats } from "@/components/admin/analytics-stats"
import { DeviceStats } from "@/components/admin/device-stats"
import { ReferralSources } from "@/components/admin/referral-sources"
import { ArticlePerformance } from "@/components/admin/article-performance"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="acquisition">Acquisition</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <AnalyticsStats />

          <Card>
            <CardHeader>
              <CardTitle>Traffic Overview</CardTitle>
              <CardDescription>Site traffic over the past 30 days</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview />
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Device Breakdown</CardTitle>
                <CardDescription>Traffic by device type</CardDescription>
              </CardHeader>
              <CardContent>
                <DeviceStats />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Referral Sources</CardTitle>
                <CardDescription>Where your traffic is coming from</CardDescription>
              </CardHeader>
              <CardContent>
                <ReferralSources />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Article Performance</CardTitle>
              <CardDescription>Most viewed articles and engagement metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <ArticlePerformance />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audience" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Audience Demographics</CardTitle>
              <CardDescription>Information about your readers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                Audience demographic data visualization
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="acquisition" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>How users are finding your content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                Acquisition data visualization
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

