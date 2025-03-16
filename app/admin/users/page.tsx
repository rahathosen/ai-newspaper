"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { UsersTable } from "@/components/admin/users-table"
import { PlusIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function UsersPage() {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className="mr-2 h-4 w-4" />
              New User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
              <DialogDescription>Add a new user to the system</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="author">Author</SelectItem>
                    <SelectItem value="subscriber">Subscriber</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Create User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="admin">Admins</TabsTrigger>
          <TabsTrigger value="editor">Editors</TabsTrigger>
          <TabsTrigger value="author">Authors</TabsTrigger>
          <TabsTrigger value="subscriber">Subscribers</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <UsersTable roleFilter="all" />
        </TabsContent>

        <TabsContent value="admin" className="mt-6">
          <UsersTable roleFilter="admin" />
        </TabsContent>

        <TabsContent value="editor" className="mt-6">
          <UsersTable roleFilter="editor" />
        </TabsContent>

        <TabsContent value="author" className="mt-6">
          <UsersTable roleFilter="author" />
        </TabsContent>

        <TabsContent value="subscriber" className="mt-6">
          <UsersTable roleFilter="subscriber" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

