"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Clock, TrendingUp, History, ThumbsUp } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Advertisement } from "@/components/advertisement"

interface Article {
  id: number
  title: string
  excerpt?: string
  category: string
  image: string
  date: string
  readTime?: string
  author?: string
}

export function ArticleRecommendations() {
  const [activeTab, setActiveTab] = useState("for-you")
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  // Mock data - in a real app, this would come from an API
  const mockArticles = {
    "for-you": [
      {
        id: 1,
        title: "How AI is Transforming Healthcare Diagnostics",
        category: "Technology",
        image: "/thumbnail.webp?height=200&width=300&text=AI+Healthcare",
        date: "2 hours ago",
        readTime: "5 min read",
        author: "Dr. Emily Chen",
      },
      {
        id: 2,
        title: "Global Markets React to Central Bank Policy Shifts",
        category: "Business",
        image: "/thumbnail.webp?height=200&width=300&text=Markets",
        date: "4 hours ago",
        readTime: "4 min read",
        author: "Robert Williams",
      },
      {
        id: 3,
        title: "New Study Reveals Benefits of Intermittent Fasting",
        category: "Health",
        image: "/thumbnail.webp?height=200&width=300&text=Health",
        date: "Yesterday",
        readTime: "6 min read",
        author: "Sarah Johnson",
      },
      {
        id: 4,
        title: "The Rise of Sustainable Architecture in Urban Planning",
        category: "Environment",
        image: "/thumbnail.webp?height=200&width=300&text=Architecture",
        date: "2 days ago",
        readTime: "7 min read",
        author: "Michael Chen",
      },
    ],
    trending: [
      {
        id: 5,
        title: "Major Tech Company Announces Revolutionary New Product",
        category: "Technology",
        image: "/thumbnail.webp?height=200&width=300&text=Tech+News",
        date: "1 hour ago",
        readTime: "3 min read",
        author: "James Wilson",
      },
      {
        id: 6,
        title: "Championship Finals Set After Dramatic Semifinal Matches",
        category: "Sports",
        image: "/thumbnail.webp?height=200&width=300&text=Sports",
        date: "3 hours ago",
        readTime: "4 min read",
        author: "Jessica Thompson",
      },
      {
        id: 7,
        title: "Political Leaders Gather for Climate Summit",
        category: "Politics",
        image: "/thumbnail.webp?height=200&width=300&text=Politics",
        date: "5 hours ago",
        readTime: "5 min read",
        author: "David Rodriguez",
      },
      {
        id: 8,
        title: "Award-Winning Film Director Announces New Project",
        category: "Entertainment",
        image: "/thumbnail.webp?height=200&width=300&text=Entertainment",
        date: "Yesterday",
        readTime: "3 min read",
        author: "Emma Thompson",
      },
    ],
    history: [
      {
        id: 9,
        title: "Global Leaders Pledge Ambitious Climate Goals at Summit",
        category: "Environment",
        image: "/thumbnail.webp?height=200&width=300&text=Climate",
        date: "3 days ago",
        readTime: "6 min read",
        author: "Sarah Johnson",
      },
      {
        id: 10,
        title: "Tech Giants Unveil New AI Ethics Guidelines",
        category: "Technology",
        image: "/thumbnail.webp?height=200&width=300&text=AI+Ethics",
        date: "4 days ago",
        readTime: "5 min read",
        author: "Michael Chen",
      },
      {
        id: 11,
        title: "Economic Forecast Shows Resilience Despite Challenges",
        category: "Business",
        image: "/thumbnail.webp?height=200&width=300&text=Economy",
        date: "5 days ago",
        readTime: "4 min read",
        author: "Robert Williams",
      },
      {
        id: 12,
        title: "New Study Reveals Benefits of Mediterranean Diet",
        category: "Health",
        image: "/thumbnail.webp?height=200&width=300&text=Diet",
        date: "1 week ago",
        readTime: "5 min read",
        author: "Emma Thompson",
      },
    ],
  }

  useEffect(() => {
    // Simulate API call
    setLoading(true)
    setTimeout(() => {
      setArticles(mockArticles[activeTab as keyof typeof mockArticles])
      setLoading(false)
    }, 500)
  }, [activeTab])

  return (
    <div className="bg-card border rounded-lg overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="font-serif text-xl font-bold">Recommended for You</h3>
        <p className="text-sm text-muted-foreground mt-1">Articles tailored to your reading preferences</p>
      </div>

      <Tabs defaultValue="for-you" value={activeTab} onValueChange={setActiveTab}>
        <div className="px-4 border-b">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="for-you" className="flex items-center gap-1">
              <ThumbsUp className="h-3.5 w-3.5" />
              <span>For You</span>
            </TabsTrigger>
            <TabsTrigger value="trending" className="flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>Trending</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-1">
              <History className="h-3.5 w-3.5" />
              <span>History</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="for-you" className="p-0 m-0">
          <RecommendationList articles={articles} loading={loading} />
        </TabsContent>
        <TabsContent value="trending" className="p-0 m-0">
          <RecommendationList articles={articles} loading={loading} />
        </TabsContent>
        <TabsContent value="history" className="p-0 m-0">
          <RecommendationList articles={articles} loading={loading} />
        </TabsContent>
      </Tabs>

      <div className="p-4 border-t">
        <Advertisement size="banner" className="mx-auto" />
      </div>
    </div>
  )
}

interface RecommendationListProps {
  articles: Article[]
  loading: boolean
}

function RecommendationList({ articles, loading }: RecommendationListProps) {
  if (loading) {
    return (
      <div className="p-4 space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex gap-3 animate-pulse">
            <div className="w-20 h-16 bg-muted rounded"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
              <div className="h-3 bg-muted rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="divide-y">
      {articles.map((article, index) => (
        <div key={article.id} className="p-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-20 h-16 rounded overflow-hidden">
              <img
                src={article.image || "/thumbnail.webp"}
                alt={article.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1 min-w-0">
              <Badge variant="outline" className="mb-1 text-xs">
                {article.category}
              </Badge>
              <h4 className="font-medium text-sm leading-tight line-clamp-2">
                <Link href="#" className="hover:underline">
                  {article.title}
                </Link>
              </h4>
              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                <span>{article.date}</span>
                {article.readTime && (
                  <>
                    <span>•</span>
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {article.readTime}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Insert ad after second article */}
          {index === 1 && (
            <div className="mt-4">
              <Advertisement size="medium-rectangle" className="mx-auto" />
            </div>
          )}
        </div>
      ))}

      <div className="p-4 text-center">
        <Button variant="outline">View More Recommendations</Button>
      </div>
    </div>
  )
}

