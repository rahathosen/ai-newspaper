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

const comments = [
  {
    id: "1",
    author: "Sarah Johnson",
    article: "Global Leaders Pledge Ambitious Climate Goals at Summit",
    comment: "This is a great article!",
    status: "approved",
    date: "Mar 15, 2025",
  },
  {
    id: "2",
    author: "Michael Chen",
    article: "Tech Giants Unveil New AI Ethics Guidelines",
    comment: "I have some thoughts on this...",
    status: "pending",
    date: "Mar 14, 2025",
  },
  {
    id: "3",
    author: "Robert Williams",
    article: "Economic Forecast Shows Resilience Despite Challenges",
    comment: "Interesting perspective.",
    status: "approved",
    date: "Mar 13, 2025",
  },
  {
    id: "4",
    author: "Emma Thompson",
    article: "New Study Reveals Benefits of Mediterranean Diet",
    comment: "I'm going to try this!",
    status: "spam",
    date: "Mar 12, 2025",
  },
  {
    id: "5",
    author: "Marcus Johnson",
    article: "Championship Finals Set After Dramatic Semifinal Matches",
    comment: "What a game!",
    status: "trash",
    date: "Mar 11, 2025",
  },
]

export function CommentsTable() {
  const [selectedComments, setSelectedComments] = useState<string[]>([])

  const toggleSelectAll = () => {
    if (selectedComments.length === comments.length) {
      setSelectedComments([])
    } else {
      setSelectedComments(comments.map((comment) => comment.id))
    }
  }

  const toggleSelectComment = (id: string) => {
    if (selectedComments.includes(id)) {
      setSelectedComments(selectedComments.filter((commentId) => commentId !== id))
    } else {
      setSelectedComments([...selectedComments, id])
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
                  checked={selectedComments.length === comments.length}
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all comments"
                />
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium">Author</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Article</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Comment</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
              <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {comments.map((comment) => (
              <tr
                key={comment.id}
                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
              >
                <td className="p-4 align-middle">
                  <Checkbox
                    checked={selectedComments.includes(comment.id)}
                    onCheckedChange={() => toggleSelectComment(comment.id)}
                    aria-label={`Select comment by ${comment.author}`}
                  />
                </td>
                <td className="p-4 align-middle">{comment.author}</td>
                <td className="p-4 align-middle">{comment.article}</td>
                <td className="p-4 align-middle">{comment.comment}</td>
                <td className="p-4 align-middle">
                  <Badge
                    variant={
                      comment.status === "approved"
                        ? "default"
                        : comment.status === "pending"
                          ? "secondary"
                          : comment.status === "spam"
                            ? "destructive"
                            : "destructive"
                    }
                  >
                    {comment.status}
                  </Badge>
                </td>
                <td className="p-4 align-middle">{comment.date}</td>
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
                        <Link href={`/admin/comments/${comment.id}`} className="flex items-center w-full">
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

