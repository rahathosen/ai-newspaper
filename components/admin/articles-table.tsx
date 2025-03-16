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
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Eye, MoreHorizontal, Search, Trash } from "lucide-react"
import Link from "next/link"

const articles = [
  {
    id: "1",
    title: "Global Leaders Pledge Ambitious Climate Goals at Summit",
    author: "Sarah Johnson",
    category: "Politics",
    status: "published",
    date: "Mar 15, 2025",
    views: 12453,
  },
  {
    id: "2",
    title: "Tech Giants Unveil New AI Ethics Guidelines",
    author: "Michael Chen",
    category: "Technology",
    status: "published",
    date: "Mar 14, 2025",
    views: 8721,
  },
  {
    id: "3",
    title: "Economic Forecast Shows Resilience Despite Challenges",
    author: "Robert Williams",
    category: "Business",
    status: "published",
    date: "Mar 13, 2025",
    views: 6542,
  },
  {
    id: "4",
    title: "New Study Reveals Benefits of Mediterranean Diet",
    author: "Emma Thompson",
    category: "Health",
    status: "published",
    date: "Mar 12, 2025",
    views: 5321,
  },
  {
    id: "5",
    title: "Championship Finals Set After Dramatic Semifinal Matches",
    author: "Marcus Johnson",
    category: "Sports",
    status: "published",
    date: "Mar 11, 2025",
    views: 7865,
  },
  {
    id: "6",
    title: "Upcoming Art Exhibition to Feature Local Artists",
    author: "Jessica Lee",
    category: "Arts",
    status: "draft",
    date: "Not published",
    views: 0,
  },
  {
    id: "7",
    title: "Analysis: Impact of Recent Policy Changes on Housing Market",
    author: "David Wilson",
    category: "Real Estate",
    status: "draft",
    date: "Not published",
    views: 0,
  },
  {
    id: "8",
    title: "Interview: Celebrity Chef Reveals Secret to Restaurant Success",
    author: "Jennifer Adams",
    category: "Food",
    status: "published",
    date: "Mar 10, 2025",
    views: 4532,
  },
  {
    id: "9",
    title: "Travel Guide: Hidden Gems in Southeast Asia",
    author: "Thomas Brown",
    category: "Travel",
    status: "published",
    date: "Mar 9, 2025",
    views: 6789,
  },
  {
    id: "10",
    title: "Opinion: The Future of Public Transportation in Urban Areas",
    author: "Lisa Garcia",
    category: "Opinion",
    status: "draft",
    date: "Not published",
    views: 0,
  },
]

export function ArticlesTable() {
  const [selectedArticles, setSelectedArticles] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const toggleSelectAll = () => {
    if (selectedArticles.length === filteredArticles.length) {
      setSelectedArticles([])
    } else {
      setSelectedArticles(filteredArticles.map((article) => article.id))
    }
  }

  const toggleSelectArticle = (id: string) => {
    if (selectedArticles.includes(id)) {
      setSelectedArticles(selectedArticles.filter((articleId) => articleId !== id))
    } else {
      setSelectedArticles([...selectedArticles, id])
    }
  }

  // Filter articles based on search query and filters
  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || article.status === statusFilter
    const matchesCategory = categoryFilter === "all" || article.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  // Get unique categories for filter
  const categories = ["all", ...new Set(articles.map((article) => article.category))]

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-end sm:items-center justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search articles..."
              className="pl-8"
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
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
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
                    checked={selectedArticles.length === filteredArticles.length && filteredArticles.length > 0}
                    onCheckedChange={toggleSelectAll}
                    aria-label="Select all articles"
                  />
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium">Title</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Author</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Category</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Views</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article) => (
                  <tr
                    key={article.id}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <td className="p-4 align-middle">
                      <Checkbox
                        checked={selectedArticles.includes(article.id)}
                        onCheckedChange={() => toggleSelectArticle(article.id)}
                        aria-label={`Select article ${article.title}`}
                      />
                    </td>
                    <td className="p-4 align-middle font-medium">{article.title}</td>
                    <td className="p-4 align-middle">{article.author}</td>
                    <td className="p-4 align-middle">
                      <Badge variant="outline">{article.category}</Badge>
                    </td>
                    <td className="p-4 align-middle">
                      <Badge variant={article.status === "published" ? "default" : "secondary"}>
                        {article.status === "published" ? "Published" : "Draft"}
                      </Badge>
                    </td>
                    <td className="p-4 align-middle">{article.date}</td>
                    <td className="p-4 align-middle">{article.views.toLocaleString()}</td>
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
                            <Link href={`/admin/articles/${article.id}`} className="flex items-center w-full">
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link href={`/article/${article.id}`} className="flex items-center w-full">
                              <Eye className="mr-2 h-4 w-4" />
                              <span>View</span>
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
                  <td colSpan={8} className="p-4 text-center text-muted-foreground">
                    No articles found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <strong>{filteredArticles.length}</strong> of <strong>{articles.length}</strong> articles
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

