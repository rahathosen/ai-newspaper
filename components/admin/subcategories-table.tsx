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
import { Edit, MoreHorizontal, Trash } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const subcategories = [
  {
    id: "1",
    name: "U.S. Politics",
    slug: "us-politics",
    parentCategory: "Politics",
    description: "U.S. political news and analysis",
    articleCount: 78,
  },
  {
    id: "2",
    name: "International Relations",
    slug: "international-relations",
    parentCategory: "Politics",
    description: "Global political relationships and diplomacy",
    articleCount: 45,
  },
  {
    id: "3",
    name: "Policy",
    slug: "policy",
    parentCategory: "Politics",
    description: "Policy development and implementation",
    articleCount: 33,
  },
  {
    id: "4",
    name: "Economy",
    slug: "economy",
    parentCategory: "Business",
    description: "Economic news and analysis",
    articleCount: 62,
  },
  {
    id: "5",
    name: "Markets",
    slug: "markets",
    parentCategory: "Business",
    description: "Financial markets and trading",
    articleCount: 54,
  },
  {
    id: "6",
    name: "Companies",
    slug: "companies",
    parentCategory: "Business",
    description: "Corporate news and analysis",
    articleCount: 48,
  },
  {
    id: "7",
    name: "AI & Robotics",
    slug: "ai-robotics",
    parentCategory: "Technology",
    description: "Artificial intelligence and robotics news",
    articleCount: 39,
  },
  {
    id: "8",
    name: "Computing",
    slug: "computing",
    parentCategory: "Technology",
    description: "Computing and hardware news",
    articleCount: 27,
  },
  {
    id: "9",
    name: "Mobile",
    slug: "mobile",
    parentCategory: "Technology",
    description: "Mobile technology and apps",
    articleCount: 35,
  },
  {
    id: "10",
    name: "Medicine",
    slug: "medicine",
    parentCategory: "Health",
    description: "Medical research and healthcare",
    articleCount: 41,
  },
]

export function SubcategoriesTable() {
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const toggleSelectAll = () => {
    if (selectedSubcategories.length === filteredSubcategories.length) {
      setSelectedSubcategories([])
    } else {
      setSelectedSubcategories(filteredSubcategories.map((subcategory) => subcategory.id))
    }
  }

  const toggleSelectSubcategory = (id: string) => {
    if (selectedSubcategories.includes(id)) {
      setSelectedSubcategories(selectedSubcategories.filter((subcategoryId) => subcategoryId !== id))
    } else {
      setSelectedSubcategories([...selectedSubcategories, id])
    }
  }

  // Get unique parent categories for filter
  const parentCategories = ["all", ...new Set(subcategories.map((subcategory) => subcategory.parentCategory))]

  // Filter subcategories based on search query and category filter
  const filteredSubcategories = subcategories.filter((subcategory) => {
    const matchesSearch =
      subcategory.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subcategory.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === "all" || subcategory.parentCategory === categoryFilter

    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-end sm:items-center justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1">
            <Input
              type="search"
              placeholder="Search subcategories..."
              className="pl-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Parent Category" />
            </SelectTrigger>
            <SelectContent>
              {parentCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
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
                    checked={
                      selectedSubcategories.length === filteredSubcategories.length && filteredSubcategories.length > 0
                    }
                    onCheckedChange={toggleSelectAll}
                    aria-label="Select all subcategories"
                  />
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium">Name</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Slug</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Parent Category</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Description</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Articles</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {filteredSubcategories.length > 0 ? (
                filteredSubcategories.map((subcategory) => (
                  <tr
                    key={subcategory.id}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <td className="p-4 align-middle">
                      <Checkbox
                        checked={selectedSubcategories.includes(subcategory.id)}
                        onCheckedChange={() => toggleSelectSubcategory(subcategory.id)}
                        aria-label={`Select subcategory ${subcategory.name}`}
                      />
                    </td>
                    <td className="p-4 align-middle font-medium">{subcategory.name}</td>
                    <td className="p-4 align-middle">{subcategory.slug}</td>
                    <td className="p-4 align-middle">
                      <Badge variant="outline">{subcategory.parentCategory}</Badge>
                    </td>
                    <td className="p-4 align-middle">{subcategory.description}</td>
                    <td className="p-4 align-middle">
                      <Badge variant="outline">{subcategory.articleCount}</Badge>
                    </td>
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
                          <DropdownMenuItem>
                            <Link
                              href={`/admin/categories/subcategories/${subcategory.id}`}
                              className="flex items-center w-full"
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </Link>
                          </DropdownMenuItem>
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
                  <td colSpan={7} className="p-4 text-center text-muted-foreground">
                    No subcategories found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <strong>{filteredSubcategories.length}</strong> of <strong>{subcategories.length}</strong>{" "}
          subcategories
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

