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

const categories = [
  {
    id: "1",
    name: "Politics",
    slug: "politics",
    description: "Political news and analysis",
    articleCount: 156,
  },
  {
    id: "2",
    name: "Business",
    slug: "business",
    description: "Business and economic news",
    articleCount: 124,
  },
  {
    id: "3",
    name: "Technology",
    slug: "technology",
    description: "Technology news and reviews",
    articleCount: 98,
  },
  {
    id: "4",
    name: "Health",
    slug: "health",
    description: "Health and wellness information",
    articleCount: 87,
  },
  {
    id: "5",
    name: "Sports",
    slug: "sports",
    description: "Sports news and analysis",
    articleCount: 112,
  },
  {
    id: "6",
    name: "Arts",
    slug: "arts",
    description: "Arts and culture coverage",
    articleCount: 65,
  },
  {
    id: "7",
    name: "Science",
    slug: "science",
    description: "Scientific discoveries and research",
    articleCount: 78,
  },
  {
    id: "8",
    name: "Travel",
    slug: "travel",
    description: "Travel guides and tips",
    articleCount: 54,
  },
  {
    id: "9",
    name: "Food",
    slug: "food",
    description: "Food and cooking",
    articleCount: 43,
  },
  {
    id: "10",
    name: "Opinion",
    slug: "opinion",
    description: "Opinion pieces and editorials",
    articleCount: 92,
  },
]

export function CategoriesTable() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const toggleSelectAll = () => {
    if (selectedCategories.length === categories.length) {
      setSelectedCategories([])
    } else {
      setSelectedCategories(categories.map((category) => category.id))
    }
  }

  const toggleSelectCategory = (id: string) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(selectedCategories.filter((categoryId) => categoryId !== id))
    } else {
      setSelectedCategories([...selectedCategories, id])
    }
  }

  return (
    <div className="rounded-md border">
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th className="h-12 px-4 text-left align-middle font-medium">
                <Checkbox
                  checked={selectedCategories.length === categories.length}
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all categories"
                />
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium">Name</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Slug</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Description</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Articles</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {categories.map((category) => (
              <tr
                key={category.id}
                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
              >
                <td className="p-4 align-middle">
                  <Checkbox
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => toggleSelectCategory(category.id)}
                    onCheckedChange={() => toggleSelectCategory(category.id)}
                    aria-label={`Select category ${category.name}`}
                  />
                </td>
                <td className="p-4 align-middle font-medium">{category.name}</td>
                <td className="p-4 align-middle">{category.slug}</td>
                <td className="p-4 align-middle">{category.description}</td>
                <td className="p-4 align-middle">
                  <Badge variant="outline">{category.articleCount}</Badge>
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
                        <Link href={`/admin/categories/${category.id}`} className="flex items-center w-full">
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

