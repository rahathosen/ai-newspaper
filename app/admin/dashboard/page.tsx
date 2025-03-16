import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/admin/overview"
import { RecentArticles } from "@/components/admin/recent-articles"
import { StatsCards } from "@/components/admin/stats-cards"
import { PopularArticles } from "@/components/admin/popular-articles"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserRoleStats } from "@/components/admin/user-role-stats"
import { DivisionStats } from "@/components/admin/division-stats"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="admin">Admin View</TabsTrigger>
          <TabsTrigger value="editor">Editor View</TabsTrigger>
          <TabsTrigger value="author">Author View</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
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

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Distribution</CardTitle>
                <CardDescription>Users by role</CardDescription>
              </CardHeader>
              <CardContent>
                <UserRoleStats />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content by Division</CardTitle>
                <CardDescription>Article distribution across Bangladesh</CardDescription>
              </CardHeader>
              <CardContent>
                <DivisionStats />
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
        </TabsContent>

        <TabsContent value="admin" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,284</div>
                <p className="text-xs text-muted-foreground">+24 from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">System Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">98.7%</div>
                <p className="text-xs text-muted-foreground">Uptime this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Articles awaiting review</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68%</div>
                <p className="text-xs text-muted-foreground">4.2 GB of 6 GB</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>System Logs</CardTitle>
              <CardDescription>Recent system activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4 py-1">
                  <p className="text-sm">Database backup completed successfully</p>
                  <p className="text-xs text-muted-foreground">Today, 03:15 AM</p>
                </div>
                <div className="border-l-4 border-amber-500 pl-4 py-1">
                  <p className="text-sm">User role changed: Michael Chen (Editor → Admin)</p>
                  <p className="text-xs text-muted-foreground">Today, 09:41 AM</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4 py-1">
                  <p className="text-sm">System update scheduled for March 20, 2025</p>
                  <p className="text-xs text-muted-foreground">Yesterday, 4:52 PM</p>
                </div>
                <div className="border-l-4 border-red-500 pl-4 py-1">
                  <p className="text-sm">Failed login attempts detected (IP: 192.168.1.45)</p>
                  <p className="text-xs text-muted-foreground">Yesterday, 11:23 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="editor" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Articles Published</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">From 5 authors</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Top Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Politics</div>
                <p className="text-xs text-muted-foreground">32 articles this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">Articles for next week</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Content Calendar</CardTitle>
              <CardDescription>Upcoming scheduled articles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-muted rounded-md">
                  <div>
                    <p className="font-medium">Economic Impact of Climate Policies</p>
                    <p className="text-sm text-muted-foreground">By Robert Williams</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Mar 18, 2025</p>
                    <p className="text-xs text-muted-foreground">08:00 AM</p>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-muted rounded-md">
                  <div>
                    <p className="font-medium">New Healthcare Initiative in Rural Areas</p>
                    <p className="text-sm text-muted-foreground">By Emma Thompson</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Mar 19, 2025</p>
                    <p className="text-xs text-muted-foreground">10:30 AM</p>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-muted rounded-md">
                  <div>
                    <p className="font-medium">Tech Innovation Summit Coverage</p>
                    <p className="text-sm text-muted-foreground">By Michael Chen</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Mar 20, 2025</p>
                    <p className="text-xs text-muted-foreground">09:00 AM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="author" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">My Articles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">Published this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Drafts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">Work in progress</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45.2K</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Avg. Read Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3:42</div>
                <p className="text-xs text-muted-foreground">Minutes per article</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>My Recent Articles</CardTitle>
              <CardDescription>Performance of your recent publications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-muted rounded-md">
                  <div className="flex-1">
                    <p className="font-medium">Global Leaders Pledge Ambitious Climate Goals</p>
                    <div className="flex items-center gap-4 mt-1">
                      <p className="text-xs text-muted-foreground">Mar 15, 2025</p>
                      <p className="text-xs text-muted-foreground">12,453 views</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-500">+15%</p>
                    <p className="text-xs text-muted-foreground">vs. avg</p>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-muted rounded-md">
                  <div className="flex-1">
                    <p className="font-medium">Analysis: Impact of New Environmental Regulations</p>
                    <div className="flex items-center gap-4 mt-1">
                      <p className="text-xs text-muted-foreground">Mar 10, 2025</p>
                      <p className="text-xs text-muted-foreground">8,721 views</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-500">+8%</p>
                    <p className="text-xs text-muted-foreground">vs. avg</p>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-muted rounded-md">
                  <div className="flex-1">
                    <p className="font-medium">Interview: Climate Scientist on Recent Findings</p>
                    <div className="flex items-center gap-4 mt-1">
                      <p className="text-xs text-muted-foreground">Mar 5, 2025</p>
                      <p className="text-xs text-muted-foreground">6,542 views</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-red-500">-3%</p>
                    <p className="text-xs text-muted-foreground">vs. avg</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

