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

// Mock data for subcategories
const subcategories = {
  "national-politics": {
    name: "National Politics",
    description:
      "Latest news and analysis on Bangladesh's national political landscape, government policies, and political developments.",
    parentCategory: "Politics",
    parentSlug: "politics",
    articleCount: 56,
    featuredImage: "/thumbnail.jpg?height=400&width=800",
  },
  "international-relations": {
    name: "International Relations",
    description:
      "Coverage of Bangladesh's foreign policy, diplomatic relations, and international engagements with other countries and global organizations.",
    parentCategory: "Politics",
    parentSlug: "politics",
    articleCount: 42,
    featuredImage: "/thumbnail.jpg?height=400&width=800",
  },
  economy: {
    name: "Economy",
    description: "Analysis and news on Bangladesh's economic policies, growth, challenges, and financial developments.",
    parentCategory: "Business",
    parentSlug: "business",
    articleCount: 38,
    featuredImage: "/thumbnail.jpg?height=400&width=800",
  },
}

// Mock articles data
const mockArticles = [
  {
    id: 1,
    title: "Parliament Passes New Budget with Focus on Digital Infrastructure",
    excerpt:
      "The Bangladesh Parliament has approved the new fiscal year budget with significant allocations for digital infrastructure development across the country.",
    category: "Politics",
    subcategory: "National Politics",
    author: "Rahima Khan",
    date: "March 15, 2025",
    readTime: "7 min read",
    views: 3582,
    image: "/thumbnail.jpg?height=300&width=500",
    tags: ["Budget", "Parliament", "Digital Infrastructure"],
    division: "Dhaka",
    district: "Dhaka",
  },
  {
    id: 2,
    title: "Political Parties Begin Preparations for Upcoming Local Elections",
    excerpt:
      "Major political parties across Bangladesh have started their preparations for the upcoming local government elections scheduled for later this year.",
    category: "Politics",
    subcategory: "National Politics",
    author: "Kamal Ahmed",
    date: "March 14, 2025",
    readTime: "6 min read",
    views: 2841,
    image: "/thumbnail.jpg?height=300&width=500",
    tags: ["Local Elections", "Political Parties", "Campaign"],
    division: "Dhaka",
    district: "Dhaka",
  },
  {
    id: 3,
    title: "New Constitutional Amendment Proposed in Parliament",
    excerpt:
      "A new constitutional amendment has been proposed in the Parliament, focusing on judicial reforms and strengthening democratic institutions.",
    category: "Politics",
    subcategory: "National Politics",
    author: "Nusrat Jahan",
    date: "March 13, 2025",
    readTime: "8 min read",
    views: 3176,
    image: "/thumbnail.jpg?height=300&width=500",
    tags: ["Constitution", "Parliament", "Judicial Reform"],
    division: "Dhaka",
    district: "Dhaka",
  },
  {
    id: 4,
    title: "Political Leaders Call for National Unity on Independence Day",
    excerpt:
      "Political leaders from across the spectrum have called for national unity and solidarity during Independence Day celebrations.",
    category: "Politics",
    subcategory: "National Politics",
    author: "Faisal Rahman",
    date: "March 12, 2025",
    readTime: "5 min read",
    views: 2542,
    image: "/thumbnail.jpg?height=300&width=500",
    tags: ["Independence Day", "National Unity", "Political Leaders"],
    division: "Dhaka",
    district: "Dhaka",
  },
  {
    id: 5,
    title: "Government Announces New Initiative for Rural Development",
    excerpt:
      "The government has launched a comprehensive initiative aimed at accelerating rural development and reducing urban-rural disparities.",
    category: "Politics",
    subcategory: "National Politics",
    author: "Tahmina Begum",
    date: "March 11, 2025",
    readTime: "6 min read",
    views: 2187,
    image: "/thumbnail.jpg?height=300&width=500",
    tags: ["Rural Development", "Government Initiative", "Infrastructure"],
    division: "Dhaka",
    district: "Dhaka",
  },
]

export default function SubcategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const subcategory = subcategories[slug as keyof typeof subcategories]

  const [articles, setArticles] = useState<any[]>([])
  const [sortBy, setSortBy] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const [aiSummaryOpen, setAiSummaryOpen] = useState(false)
  const [currentArticle, setCurrentArticle] = useState<any>(null)
  const [savedArticles, setSavedArticles] = useState<number[]>([])
  const [filterByDivision, setFilterByDivision] = useState<string | null>(null)

  const articlesPerPage = 5

  // Filter articles by subcategory
  useEffect(() => {
    if (!subcategory) return

    let filtered = mockArticles.filter(
      (article) => article.subcategory.toLowerCase().replace(/\s+/g, "-") === slug.toLowerCase(),
    )

    if (filterByDivision) {
      filtered = filtered.filter((article) => article.division === filterByDivision)
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
  }, [slug, filterByDivision, sortBy, subcategory])

  const totalPages = Math.ceil(articles.length / articlesPerPage)

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

  // Get unique divisions from articles
  const divisions = [...new Set(articles.map((article) => article.division))]

  if (!subcategory) {
    return (
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-2xl font-bold">Subcategory not found</h1>
        <p className="mt-4">The subcategory you're looking for doesn't exist.</p>
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
        <Link href={`/category/${subcategory.parentSlug}`} className="hover:text-foreground">
          {subcategory.parentCategory}
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="font-medium text-foreground">{subcategory.name}</span>
      </div>

      {/* Subcategory Header */}
      <div className="relative rounded-lg overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40">
          <img
            src={subcategory.featuredImage || "/thumbnail.jpg"}
            alt={subcategory.name}
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>
        <div className="relative z-10 p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-3">{subcategory.name}</h1>
          <p className="text-white/90 max-w-3xl mb-4">{subcategory.description}</p>
          <div className="flex items-center text-white/90 text-sm">
            <span className="font-medium">{subcategory.articleCount} Articles</span>
            {filterByDivision && (
              <>
                <span className="mx-2">•</span>
                <span>Filtered by: {filterByDivision} Division</span>
                <Button
                  variant="link"
                  className="text-white p-0 h-auto ml-2 underline"
                  onClick={() => setFilterByDivision(null)}
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="h-4 w-4 mr-2" />
                {filterByDivision ? `${filterByDivision} Division` : "Filter by Division"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuLabel>Select Division</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setFilterByDivision(null)}>All Divisions</DropdownMenuItem>
                {divisions.map((division) => (
                  <DropdownMenuItem key={division} onClick={() => setFilterByDivision(division)}>
                    {division}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

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
                      src={article.image || "/thumbnail.jpg"}
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
                          {article.category}
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
            <Button onClick={() => setFilterByDivision(null)}>Clear Filters</Button>
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

      {/* Related Subcategories */}
      <div className="mt-12">
        <h3 className="text-xl font-serif font-bold mb-4">Related Subcategories</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(subcategories)
            .filter(([key, subcat]) => key !== slug && subcat.parentCategory === subcategory.parentCategory)
            .map(([key, subcat]) => (
              <Link href={`/subcategory/${key}`} key={key}>
                <Card className="h-full hover:shadow-md transition-shadow overflow-hidden group">
                  <div className="relative h-32">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60">
                      <img
                        src={subcat.featuredImage || "/thumbnail.jpg"}
                        alt={subcat.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <h4 className="text-white font-medium">{subcat.name}</h4>
                      <p className="text-white/80 text-sm">{subcat.articleCount} Articles</p>
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

