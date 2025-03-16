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
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react"
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
]

export function RecentArticles() {
  const [selectedArticles, setSelectedArticles] = useState<string[]>([])

  const toggleSelectAll = () => {
    if (selectedArticles.length === articles.length) {
      setSelectedArticles([])
    } else {
      setSelectedArticles(articles.map((article) => article.id))
    }
  }

  const toggleSelectArticle = (id: string) => {
    if (selectedArticles.includes(id)) {
      setSelectedArticles(selectedArticles.filter((articleId) => articleId !== id))
    } else {
      setSelectedArticles([...selectedArticles, id])
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
                  checked={selectedArticles.length === articles.length}
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
            {articles.map((article) => (
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

