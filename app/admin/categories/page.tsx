"use client"

import { Button } from "@/components/ui/button"
import { CategoriesTable } from "@/components/admin/categories-table"
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
import { useState } from "react"

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
        <NewCategoryDialog />
      </div>

      <CategoriesTable />
    </div>
  )
}

function NewCategoryDialog() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          New Category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Category</DialogTitle>
          <DialogDescription>Add a new category for organizing articles</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="e.g., Politics, Technology" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" placeholder="e.g., politics, technology" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Input id="description" placeholder="Brief description of this category" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Create Category</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

