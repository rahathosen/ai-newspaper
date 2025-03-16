"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  ChevronRight,
  Filter,
  ArrowUpDown,
  Calendar,
  Clock,
  Eye,
  Sparkles,
  Bookmark,
  BookmarkCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination"
import { AiSummaryDialog } from "@/components/ai-summary-dialog"
import { Advertisement } from "@/components/advertisement"

// Mock data for categories
const categories = {
  politics: {
    name: "Politics",
    description: "Latest political news, analysis, and commentary on Bangladesh and international politics.",
    subcategories: ["National Politics", "International Relations", "Government", "Elections"],
    articleCount: 128,
    featuredImage: "/placeholder.svg?height=400&width=800",
  },
  business: {
    name: "Business",
    description:
      "Business news, market updates, economic analysis, and corporate developments in Bangladesh and beyond.",
    subcategories: ["Economy", "Markets", "Companies", "Startups", "Trade"],
    articleCount: 96,
    featuredImage: "/placeholder.svg?height=400&width=800",
  },
  technology: {
    name: "Technology",
    description: "Latest technology news, innovations, digital trends, and tech industry developments.",
    subcategories: ["Digital Bangladesh", "Startups", "Gadgets", "Internet", "Innovation"],
    articleCount: 84,
    featuredImage: "/placeholder.svg?height=400&width=800",
  },
}

// Mock articles data
const mockArticles = [
  {
    id: 1,
    title: "Government Announces New Digital Economy Initiative",
    excerpt:
      "The Bangladesh government has unveiled a comprehensive plan to boost the country's digital economy over the next five years, with significant investments in infrastructure and education.",
    category: "Politics",
    subcategory: "Government",
    author: "Rahima Khan",
    date: "March 15, 2025",
    readTime: "8 min read",
    views: 4582,
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Digital Economy", "Government", "Technology Policy"],
    division: "Dhaka",
    district: "Dhaka",
  },
  {
    id: 2,
    title: "Parliament Passes New Climate Change Adaptation Bill",
    excerpt:
      "Bangladesh's parliament has approved a landmark bill aimed at strengthening the country's resilience to climate change impacts, with new provisions for coastal protection and sustainable agriculture.",
    category: "Politics",
    subcategory: "National Politics",
    author: "Kamal Ahmed",
    date: "March 14, 2025",
    readTime: "6 min read",
    views: 3241,
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Climate Change", "Legislation", "Environment"],
    division: "Dhaka",
    district: "Dhaka",
  },
  {
    id: 3,
    title: "Opposition Calls for Electoral Reforms Ahead of Next Year's Elections",
    excerpt:
      "Leading opposition parties have jointly called for comprehensive electoral reforms, citing concerns about the fairness and transparency of the current electoral system.",
    category: "Politics",
    subcategory: "Elections",
    author: "Nusrat Jahan",
    date: "March 13, 2025",
    readTime: "5 min read",
    views: 2876,
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Elections", "Opposition", "Electoral Reform"],
    division: "Dhaka",
    district: "Dhaka",
  },
  {
    id: 4,
    title: "Bangladesh Signs New Trade Agreement with European Union",
    excerpt:
      "A new comprehensive trade agreement between Bangladesh and the European Union aims to boost exports and strengthen economic ties, with special provisions for the garment industry.",
    category: "Politics",
    subcategory: "International Relations",
    author: "Faisal Rahman",
    date: "March 12, 2025",
    readTime: "7 min read",
    views: 3542,
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Trade", "European Union", "International Relations"],
    division: "Dhaka",
    district: "Dhaka",
  },
  {
    id: 5,
    title: "Prime Minister Inaugurates New Infrastructure Projects in Chittagong",
    excerpt:
      "The Prime Minister has inaugurated several major infrastructure projects in Chittagong, including a new deep-sea port terminal and highway connections to boost regional connectivity.",
    category: "Politics",
    subcategory: "Government",
    author: "Tahmina Begum",
    date: "March 11, 2025",
    readTime: "6 min read",
    views: 2987,
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Infrastructure", "Development", "Chittagong"],
    division: "Chittagong",
    district: "Chittagong",
  },
  {
    id: 6,
    title: "Cabinet Approves New Digital Security Policy",
    excerpt:
      "The cabinet has approved a new digital security policy aimed at protecting critical infrastructure and combating cybercrime while ensuring digital rights and privacy.",
    category: "Politics",
    subcategory: "Government",
    author: "Imran Hossain",
    date: "March 10, 2025",
    readTime: "5 min read",
    views: 2345,
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Digital Security", "Cybersecurity", "Policy"],
    division: "Dhaka",
    district: "Dhaka",
  },
]

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const category = categories[slug as keyof typeof categories]

  const [articles, setArticles] = useState(mockArticles)
  const [sortBy, setSortBy] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
  const [aiSummaryOpen, setAiSummaryOpen] = useState(false)
  const [currentArticle, setCurrentArticle] = useState<any>(null)
  const [savedArticles, setSavedArticles] = useState<number[]>([])

  const articlesPerPage = 5
  const totalPages = Math.ceil(articles.length / articlesPerPage)

  // Filter articles by category and subcategory
  useEffect(() => {
    let filtered = mockArticles.filter((article) => article.category.toLowerCase() === slug.toLowerCase())

    if (selectedSubcategory) {
      filtered = filtered.filter((article) => article.subcategory === selectedSubcategory)
    }

    // Sort articles
    switch (sortBy) {
      case "newest":
        // No need to sort as they're already in date order in our mock data
        break
      case "oldest":
        filtered = [...filtered].reverse()
        break
      case "most-viewed":
        filtered = [...filtered].sort((a, b) => b.views - a.views)
        break
      case "reading-time":
        filtered = [...filtered].sort((a, b) => Number.parseInt(a.readTime) - Number.parseInt(b.readTime))
        break
    }

    setArticles(filtered)
  }, [slug, selectedSubcategory, sortBy])

  const paginatedArticles = articles.slice((currentPage - 1) * articlesPerPage, currentPage * articlesPerPage)

  const handleAiSummary = (article: any) => {
    setCurrentArticle(article)
    setAiSummaryOpen(true)
  }

  const toggleSaveArticle = (id: number) => {
    if (savedArticles.includes(id)) {
      setSavedArticles(savedArticles.filter((articleId) => articleId !== id))
    } else {
      setSavedArticles([...savedArticles, id])
    }
  }

  if (!category) {
    return (
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-2xl font-bold">Category not found</h1>
        <p className="mt-4">The category you're looking for doesn't exist.</p>
        <Button asChild className="mt-6">
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href="/categories" className="hover:text-foreground">
          Categories
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="font-medium text-foreground">{category.name}</span>
      </div>

      {/* Category Header */}
      <div className="relative rounded-lg overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40">
          <img
            src={category.featuredImage || "/placeholder.svg"}
            alt={category.name}
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>
        <div className="relative z-10 p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-3">{category.name}</h1>
          <p className="text-white/90 max-w-3xl mb-4">{category.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {category.subcategories.map((subcategory) => (
              <Badge
                key={subcategory}
                variant={selectedSubcategory === subcategory ? "default" : "outline"}
                className={`cursor-pointer ${selectedSubcategory === subcategory ? "bg-white text-primary" : "text-white border-white/70 hover:bg-white/20"}`}
                onClick={() => setSelectedSubcategory(subcategory === selectedSubcategory ? null : subcategory)}
              >
                {subcategory}
              </Badge>
            ))}
          </div>
          <div className="flex items-center text-white/90 text-sm">
            <span className="font-medium">{category.articleCount} Articles</span>
            {selectedSubcategory && (
              <>
                <span className="mx-2">•</span>
                <span>Filtered by: {selectedSubcategory}</span>
                <Button
                  variant="link"
                  className="text-white p-0 h-auto ml-2 underline"
                  onClick={() => setSelectedSubcategory(null)}
                >
                  Clear
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Filters and Sorting */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Sort by:{" "}
                {sortBy === "newest"
                  ? "Newest"
                  : sortBy === "oldest"
                    ? "Oldest"
                    : sortBy === "most-viewed"
                      ? "Most Viewed"
                      : "Reading Time"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuLabel>Sort Articles</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setSortBy("newest")}>
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Newest First</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("oldest")}>
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Oldest First</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("most-viewed")}>
                  <Eye className="h-4 w-4 mr-2" />
                  <span>Most Viewed</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("reading-time")}>
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Reading Time</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="text-sm text-muted-foreground">
          Showing {paginatedArticles.length} of {articles.length} articles
        </div>
      </div>

      {/* Articles List */}
      <div className="grid grid-cols-1 gap-6 mb-8">
        {paginatedArticles.map((article, index) => (
          <Card key={article.id} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                <div className="md:col-span-1">
                  <div className="relative h-48 md:h-full">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                    {article.division && article.district && (
                      <Badge className="absolute top-3 left-3 bg-primary/80 hover:bg-primary">
                        {article.division}, {article.district}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="md:col-span-2 p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs font-normal">
                          {article.subcategory}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{article.date}</span>
                      </div>
                      <h2 className="text-xl md:text-2xl font-serif font-bold mb-2">
                        <Link href={`/article/${article.id}`} className="hover:text-primary transition-colors">
                          {article.title}
                        </Link>
                      </h2>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleAiSummary(article)}>
                        <Sparkles className="h-4 w-4 text-primary" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => toggleSaveArticle(article.id)}
                      >
                        {savedArticles.includes(article.id) ? (
                          <BookmarkCheck className="h-4 w-4 text-primary" />
                        ) : (
                          <Bookmark className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">{article.excerpt}</p>

                  <div className="flex flex-wrap items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-muted mr-2"></div>
                      <span className="text-sm font-medium">{article.author}</span>
                      <span className="mx-2 text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {article.readTime}
                      </span>
                      <span className="mx-2 text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {article.views.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-2 sm:mt-0">
                      {article.tags.map((tag) => (
                        <Link href={`/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`} key={tag}>
                          <Badge variant="secondary" className="text-xs cursor-pointer">
                            {tag}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Advertisement */}
        {articles.length > 0 && (
          <div className="my-6">
            <Advertisement size="leaderboard" className="mx-auto" />
          </div>
        )}

        {articles.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No articles found</h3>
            <p className="text-muted-foreground mb-4">There are no articles matching your current filters.</p>
            <Button onClick={() => setSelectedSubcategory(null)}>Clear Filters</Button>
          </div>
        )}
      </div>

      {/* Pagination */}
      {articles.length > 0 && (
        <Pagination className="my-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationLink onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>
                Previous
              </PaginationLink>
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink onClick={() => setCurrentPage(page)} isActive={currentPage === page}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationLink
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {/* Related Categories */}
      <div className="mt-12">
        <h3 className="text-xl font-serif font-bold mb-4">Explore Other Categories</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(categories)
            .filter(([key]) => key !== slug)
            .map(([key, cat]) => (
              <Link href={`/category/${key}`} key={key}>
                <Card className="h-full hover:shadow-md transition-shadow overflow-hidden group">
                  <div className="relative h-32">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60">
                      <img
                        src={cat.featuredImage || "/placeholder.svg"}
                        alt={cat.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <h4 className="text-white font-medium">{cat.name}</h4>
                      <p className="text-white/80 text-sm">{cat.articleCount} Articles</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
        </div>
      </div>

      {/* AI Summary Dialog */}
      {currentArticle && (
        <AiSummaryDialog
          open={aiSummaryOpen}
          onOpenChange={setAiSummaryOpen}
          articleTitle={currentArticle.title}
          articleContent={currentArticle.excerpt}
        />
      )}
    </div>
  )
}

