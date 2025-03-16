"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, Save } from "lucide-react"
import Link from "next/link"

export default function UserPermissionsPage() {
  // Sample permissions data
  const contentPermissions = [
    { id: "create_articles", label: "Create Articles", description: "Can create new articles" },
    { id: "edit_own_articles", label: "Edit Own Articles", description: "Can edit articles they created" },
    { id: "edit_all_articles", label: "Edit All Articles", description: "Can edit any article" },
    { id: "publish_articles", label: "Publish Articles", description: "Can publish articles" },
    { id: "delete_own_articles", label: "Delete Own Articles", description: "Can delete articles they created" },
    { id: "delete_all_articles", label: "Delete All Articles", description: "Can delete any article" },
    { id: "manage_categories", label: "Manage Categories", description: "Can create, edit, and delete categories" },
    { id: "manage_media", label: "Manage Media", description: "Can upload and manage media files" },
  ]

  const userPermissions = [
    { id: "view_users", label: "View Users", description: "Can view user list" },
    { id: "create_users", label: "Create Users", description: "Can create new users" },
    { id: "edit_users", label: "Edit Users", description: "Can edit user profiles" },
    { id: "delete_users", label: "Delete Users", description: "Can delete users" },
    { id: "assign_roles", label: "Assign Roles", description: "Can assign roles to users" },
  ]

  const settingsPermissions = [
    { id: "manage_settings", label: "Manage Settings", description: "Can change site settings" },
    { id: "manage_themes", label: "Manage Themes", description: "Can change site appearance" },
    { id: "view_analytics", label: "View Analytics", description: "Can view site analytics" },
    { id: "export_data", label: "Export Data", description: "Can export site data" },
  ]

  // State for selected permissions
  const [selectedContentPermissions, setSelectedContentPermissions] = useState<string[]>([
    "create_articles",
    "edit_own_articles",
    "publish_articles",
    "delete_own_articles",
    "manage_media",
  ])

  const [selectedUserPermissions, setSelectedUserPermissions] = useState<string[]>(["view_users"])

  const [selectedSettingsPermissions, setSelectedSettingsPermissions] = useState<string[]>(["view_analytics"])

  // Toggle permission selection
  const toggleContentPermission = (id: string) => {
    setSelectedContentPermissions((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))
  }

  const toggleUserPermission = (id: string) => {
    setSelectedUserPermissions((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))
  }

  const toggleSettingsPermission = (id: string) => {
    setSelectedSettingsPermissions((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/users">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">User Permissions</h1>
        </div>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Robert Williams</CardTitle>
          <CardDescription>Author • robert.williams@example.com</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="content">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4 mt-4">
              <div className="grid gap-6">
                {contentPermissions.map((permission) => (
                  <div key={permission.id} className="flex items-start space-x-2">
                    <Checkbox
                      id={permission.id}
                      checked={selectedContentPermissions.includes(permission.id)}
                      onCheckedChange={() => toggleContentPermission(permission.id)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor={permission.id} className="text-sm font-medium">
                        {permission.label}
                      </Label>
                      <p className="text-sm text-muted-foreground">{permission.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="users" className="space-y-4 mt-4">
              <div className="grid gap-6">
                {userPermissions.map((permission) => (
                  <div key={permission.id} className="flex items-start space-x-2">
                    <Checkbox
                      id={permission.id}
                      checked={selectedUserPermissions.includes(permission.id)}
                      onCheckedChange={() => toggleUserPermission(permission.id)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor={permission.id} className="text-sm font-medium">
                        {permission.label}
                      </Label>
                      <p className="text-sm text-muted-foreground">{permission.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4 mt-4">
              <div className="grid gap-6">
                {settingsPermissions.map((permission) => (
                  <div key={permission.id} className="flex items-start space-x-2">
                    <Checkbox
                      id={permission.id}
                      checked={selectedSettingsPermissions.includes(permission.id)}
                      onCheckedChange={() => toggleSettingsPermission(permission.id)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor={permission.id} className="text-sm font-medium">
                        {permission.label}
                      </Label>
                      <p className="text-sm text-muted-foreground">{permission.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Reset to Defaults</Button>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
          <CardDescription>Quickly apply predefined permission sets based on roles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Admin</h3>
              <p className="text-sm text-muted-foreground mb-4">Full access to all features and settings</p>
              <Button variant="outline" size="sm" className="w-full">
                Apply Admin Permissions
              </Button>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Editor</h3>
              <p className="text-sm text-muted-foreground mb-4">Can manage all content but limited system access</p>
              <Button variant="outline" size="sm" className="w-full">
                Apply Editor Permissions
              </Button>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Author</h3>
              <p className="text-sm text-muted-foreground mb-4">Can create and manage their own content</p>
              <Button variant="outline" size="sm" className="w-full">
                Apply Author Permissions
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

