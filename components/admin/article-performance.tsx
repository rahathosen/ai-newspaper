"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpRight, Eye, MessageSquare, ThumbsUp } from "lucide-react"
import Link from "next/link"

const articles = [
  {
    id: "1",
    title: "Global Leaders Pledge Ambitious Climate Goals at Summit",
    category: "Politics",
    views: 12453,
    comments: 128,
    likes: 342,
    readTime: "10 min",
    trend: "+15%",
  },
  {
    id: "2",
    title: "Tech Giants Unveil New AI Ethics Guidelines",
    category: "Technology",
    views: 8721,
    comments: 95,
    likes: 231,
    readTime: "8 min",
    trend: "+23%",
  },
  {
    id: "3",
    title: "Championship Finals Set After Dramatic Semifinal Matches",
    category: "Sports",
    views: 7865,
    comments: 203,
    likes: 412,
    readTime: "6 min",
    trend: "+8%",
  },
  {
    id: "4",
    title: "Economic Forecast Shows Resilience Despite Challenges",
    category: "Business",
    views: 6542,
    comments: 87,
    likes: 156,
    readTime: "12 min",
    trend: "+5%",
  },
  {
    id: "5",
    title: "New Study Reveals Benefits of Mediterranean Diet",
    category: "Health",
    views: 5321,
    comments: 76,
    likes: 198,
    readTime: "7 min",
    trend: "+12%",
  },
  {
    id: "6",
    title: "Interview: Celebrity Chef Reveals Secret to Restaurant Success",
    category: "Food",
    views: 4532,
    comments: 64,
    likes: 187,
    readTime: "9 min",
    trend: "+3%",
  },
  {
    id: "7",
    title: "Travel Guide: Hidden Gems in Southeast Asia",
    category: "Travel",
    views: 6789,
    comments: 92,
    likes: 245,
    readTime: "11 min",
    trend: "+18%",
  },
]

export function ArticlePerformance() {
  const [timeRange, setTimeRange] = useState("7days")

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24hours">Last 24 Hours</SelectItem>
            <SelectItem value="7days">Last 7 Days</SelectItem>
            <SelectItem value="30days">Last 30 Days</SelectItem>
            <SelectItem value="90days">Last 90 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium">Article</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Category</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Views</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Engagement</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Read Time</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Trend</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {articles.map((article) => (
                <tr
                  key={article.id}
                  className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                >
                  <td className="p-4 align-middle font-medium">
                    <Link href={`/article/${article.id}`} className="hover:underline">
                      {article.title}
                    </Link>
                  </td>
                  <td className="p-4 align-middle">
                    <Badge variant="outline">{article.category}</Badge>
                  </td>
                  <td className="p-4 align-middle">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span>{article.views.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="p-4 align-middle">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <span>{article.comments}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                        <span>{article.likes}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 align-middle">{article.readTime}</td>
                  <td className="p-4 align-middle">
                    <div className="flex items-center text-green-500">
                      <ArrowUpRight className="mr-1 h-4 w-4" />
                      <span>{article.trend}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

