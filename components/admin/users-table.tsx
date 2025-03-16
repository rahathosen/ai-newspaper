"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, MoreHorizontal, Trash, UserCog, Lock, Mail } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample users data
const users = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "admin",
    status: "active",
    lastActive: "Today, 10:23 AM",
    avatar: "/placeholder.svg?height=40&width=40&text=SJ",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    role: "editor",
    status: "active",
    lastActive: "Today, 9:41 AM",
    avatar: "/placeholder.svg?height=40&width=40&text=MC",
  },
  {
    id: "3",
    name: "Robert Williams",
    email: "robert.williams@example.com",
    role: "author",
    status: "active",
    lastActive: "Yesterday, 4:52 PM",
    avatar: "/placeholder.svg?height=40&width=40&text=RW",
  },
  {
    id: "4",
    name: "Emma Thompson",
    email: "emma.thompson@example.com",
    role: "author",
    status: "active",
    lastActive: "Yesterday, 2:15 PM",
    avatar: "/placeholder.svg?height=40&width=40&text=ET",
  },
  {
    id: "5",
    name: "Marcus Johnson",
    email: "marcus.johnson@example.com",
    role: "author",
    status: "active",
    lastActive: "Mar 14, 2025",
    avatar: "/placeholder.svg?height=40&width=40&text=MJ",
  },
  {
    id: "6",
    name: "Jessica Lee",
    email: "jessica.lee@example.com",
    role: "editor",
    status: "inactive",
    lastActive: "Mar 10, 2025",
    avatar: "/placeholder.svg?height=40&width=40&text=JL",
  },
  {
    id: "7",
    name: "David Wilson",
    email: "david.wilson@example.com",
    role: "subscriber",
    status: "active",
    lastActive: "Today, 11:32 AM",
    avatar: "/placeholder.svg?height=40&width=40&text=DW",
  },
  {
    id: "8",
    name: "Jennifer Adams",
    email: "jennifer.adams@example.com",
    role: "subscriber",
    status: "active",
    lastActive: "Mar 13, 2025",
    avatar: "/placeholder.svg?height=40&width=40&text=JA",
  },
  {
    id: "9",
    name: "Ahmed Khan",
    email: "ahmed.khan@example.com",
    role: "subscriber",
    status: "active",
    lastActive: "Mar 12, 2025",
    avatar: "/placeholder.svg?height=40&width=40&text=AK",
  },
  {
    id: "10",
    name: "Lisa Garcia",
    email: "lisa.garcia@example.com",
    role: "admin",
    status: "active",
    lastActive: "Today, 8:15 AM",
    avatar: "/placeholder.svg?height=40&width=40&text=LG",
  },
]

interface UsersTableProps {
  roleFilter?: string
}

export function UsersTable({ roleFilter = "all" }: UsersTableProps) {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(filteredUsers.map((user) => user.id))
    }
  }

  const toggleSelectUser = (id: string) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter((userId) => userId !== id))
    } else {
      setSelectedUsers([...selectedUsers, id])
    }
  }

  // Filter users based on search query, role filter, and status filter
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  // Get role badge variant
  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "default"
      case "editor":
        return "secondary"
      case "author":
        return "outline"
      default:
        return "outline"
    }
  }

  // Get role-specific actions
  const getRoleActions = (role: string, userId: string) => {
    const commonActions = [
      <DropdownMenuItem key="edit">
        <Link href={`/admin/users/${userId}`} className="flex items-center w-full">
          <Edit className="mr-2 h-4 w-4" />
          <span>Edit Profile</span>
        </Link>
      </DropdownMenuItem>,
      <DropdownMenuItem key="password">
        <Link href={`/admin/users/${userId}/password`} className="flex items-center w-full">
          <Lock className="mr-2 h-4 w-4" />
          <span>Reset Password</span>
        </Link>
      </DropdownMenuItem>,
      <DropdownMenuItem key="email">
        <Mail className="mr-2 h-4 w-4" />
        <span>Send Email</span>
      </DropdownMenuItem>,
    ]

    if (role === "admin") {
      return [
        ...commonActions,
        <DropdownMenuSeparator key="sep" />,
        <DropdownMenuItem key="permissions" className="text-amber-500">
          <UserCog className="mr-2 h-4 w-4" />
          <span>Super Admin Controls</span>
        </DropdownMenuItem>,
      ]
    } else if (role === "editor" || role === "author") {
      return [
        ...commonActions,
        <DropdownMenuSeparator key="sep" />,
        <DropdownMenuItem key="permissions">
          <Link href={`/admin/users/${userId}/permissions`} className="flex items-center w-full">
            <UserCog className="mr-2 h-4 w-4" />
            <span>Manage Permissions</span>
          </Link>
        </DropdownMenuItem>,
      ]
    }

    return commonActions
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-end sm:items-center justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1">
            <Input
              type="search"
              placeholder="Search users..."
              className="pl-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium">
                  <Checkbox
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onCheckedChange={toggleSelectAll}
                    aria-label="Select all users"
                  />
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium">User</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Role</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Last Active</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <td className="p-4 align-middle">
                      <Checkbox
                        checked={selectedUsers.includes(user.id)}
                        onCheckedChange={() => toggleSelectUser(user.id)}
                        aria-label={`Select user ${user.name}`}
                      />
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>
                            {user.name.charAt(0)}
                            {user.name.split(" ")[1]?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-xs text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <Badge variant={getRoleBadgeVariant(user.role)} className="capitalize">
                        {user.role}
                      </Badge>
                    </td>
                    <td className="p-4 align-middle">
                      <Badge
                        variant={user.status === "active" ? "success" : "secondary"}
                        className={user.status === "active" ? "bg-green-500" : ""}
                      >
                        {user.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="p-4 align-middle">{user.lastActive}</td>
                    <td className="p-4 align-middle">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {getRoleActions(user.role, user.id)}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-muted-foreground">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {selectedUsers.length > 0 ? (
            <span>{selectedUsers.length} users selected</span>
          ) : (
            <span>
              Showing {filteredUsers.length} of {users.length} users
            </span>
          )}
        </div>
        {selectedUsers.length > 0 && (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Mail className="mr-2 h-4 w-4" />
              Email Selected
            </Button>
            <Button variant="destructive" size="sm">
              <Trash className="mr-2 h-4 w-4" />
              Delete Selected
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

