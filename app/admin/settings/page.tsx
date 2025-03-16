import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Site Information</CardTitle>
              <CardDescription>Basic information about your publication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="site-name">Site Name</Label>
                <Input id="site-name" defaultValue="The Daily Chronicle" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="site-description">Site Description</Label>
                <Textarea
                  id="site-description"
                  defaultValue="Delivering trusted journalism and insightful analysis since 1982."
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="site-url">Site URL</Label>
                <Input id="site-url" defaultValue="https://dailychronicle.com" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>How readers can reach your publication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input id="contact-email" type="email" defaultValue="contact@dailychronicle.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" defaultValue="+1 (555) 123-4567" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" defaultValue="123 News Street, New York, NY 10001" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
              <CardDescription>Customize the appearance of your site</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Enable dark mode by default</p>
                </div>
                <Switch id="dark-mode" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="system-theme">Use System Theme</Label>
                  <p className="text-sm text-muted-foreground">Follow the user's system theme preference</p>
                </div>
                <Switch id="system-theme" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Homepage Layout</CardTitle>
              <CardDescription>Configure the layout of your homepage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="featured-articles">Featured Articles</Label>
                  <p className="text-sm text-muted-foreground">Show featured articles section</p>
                </div>
                <Switch id="featured-articles" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="breaking-news">Breaking News Ticker</Label>
                  <p className="text-sm text-muted-foreground">Show breaking news ticker at the top</p>
                </div>
                <Switch id="breaking-news" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sidebar">Sidebar</Label>
                  <p className="text-sm text-muted-foreground">Show sidebar with additional content</p>
                </div>
                <Switch id="sidebar" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Configure email notifications for administrators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="new-comments">New Comments</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications for new comments</p>
                </div>
                <Switch id="new-comments" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="new-users">New User Registrations</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications when new users register</p>
                </div>
                <Switch id="new-users" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="article-published">Article Publications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications when articles are published</p>
                </div>
                <Switch id="article-published" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Cache Management</CardTitle>
              <CardDescription>Manage site caching settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enable-cache">Enable Caching</Label>
                  <p className="text-sm text-muted-foreground">Cache pages for faster loading</p>
                </div>
                <Switch id="enable-cache" defaultChecked />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="cache-duration">Cache Duration (minutes)</Label>
                <Input id="cache-duration" type="number" defaultValue="60" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Clear Cache</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Danger Zone</CardTitle>
              <CardDescription>Destructive actions for your site</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border border-destructive/50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-destructive">Reset Site Settings</h4>
                    <p className="text-sm text-muted-foreground">Reset all site settings to default values</p>
                  </div>
                  <Button variant="destructive">Reset</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

