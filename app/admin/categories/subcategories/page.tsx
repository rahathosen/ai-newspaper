"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { SubcategoriesTable } from "@/components/admin/subcategories-table"
import { PlusIcon, ChevronLeft } from "lucide-react"
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
import Link from "next/link"

export default function SubcategoriesPage() {
  const [open, setOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("")

  // Sample data
  const categories = [
    { id: "1", name: "Politics", slug: "politics" },
    { id: "2", name: "Business", slug: "business" },
    { id: "3", name: "Technology", slug: "technology" },
    { id: "4", name: "Health", slug: "health" },
    { id: "5", name: "Sports", slug: "sports" },
    { id: "6", name: "Arts", slug: "arts" },
    { id: "7", name: "Science", slug: "science" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/categories">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Subcategories</h1>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className="mr-2 h-4 w-4" />
              New Subcategory
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Subcategory</DialogTitle>
              <DialogDescription>Add a new subcategory for organizing articles</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="parentCategory">Parent Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger id="parentCategory">
                    <SelectValue placeholder="Select parent category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="e.g., U.S. Politics, Mobile Technology" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" placeholder="e.g., us-politics, mobile-technology" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Input id="description" placeholder="Brief description of this subcategory" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Create Subcategory</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <SubcategoriesTable />
    </div>
  )
}

