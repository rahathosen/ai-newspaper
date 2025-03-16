"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Dialog, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Clock, X, Newspaper, ArrowRight, Bookmark } from "lucide-react"
import Link from "next/link"

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [recentSearches, setRecentSearches] = useState([
    "climate change",
    "election results",
    "stock market",
    "technology news",
  ])
  const [isSearching, setIsSearching] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  // Mock search suggestions based on input
  const suggestions = [
    "climate summit",
    "climate change policy",
    "climate scientists",
    "climate activism",
    "climate agreement",
  ]

  // Mock categories for search results
  const categories = [
    { id: "all", label: "All" },
    { id: "news", label: "News" },
    { id: "opinion", label: "Opinion" },
    { id: "business", label: "Business" },
    { id: "technology", label: "Technology" },
  ]

  // Mock search results
  const mockResults = [
    {
      id: 1,
      title: "Global Leaders Pledge Ambitious Climate Goals at Summit",
      snippet:
        "World leaders from over 190 countries have committed to new climate targets aimed at limiting global warming...",
      date: "2 hours ago",
      category: "news",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      title: "Opinion: Climate Change Requires Immediate Action",
      snippet: "The recent climate summit has shown that while progress is being made, more urgent steps are needed...",
      date: "5 hours ago",
      category: "opinion",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      title: "Tech Companies Announce Carbon Neutral Initiatives",
      snippet: "Leading technology firms have unveiled plans to become carbon neutral by 2030, with some aiming for...",
      date: "Yesterday",
      category: "technology",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 4,
      title: "Markets React to Climate Policy Announcements",
      snippet:
        "Stock markets showed mixed reactions to the climate policy announcements, with renewable energy sectors...",
      date: "2 days ago",
      category: "business",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 5,
      title: "Climate Scientists Warn of Accelerating Ice Melt",
      snippet:
        "A new study by climate researchers indicates that polar ice caps are melting at a faster rate than previously...",
      date: "3 days ago",
      category: "news",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  // Handle search
  const handleSearch = () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)

    // Simulate API call
    setTimeout(() => {
      setSearchResults(mockResults)

      // Add to recent searches if not already there
      if (!recentSearches.includes(searchQuery.toLowerCase())) {
        setRecentSearches((prev) => [searchQuery.toLowerCase(), ...prev].slice(0, 5))
      }

      setIsSearching(false)
    }, 500)
  }

  // Filter results based on active tab
  const filteredResults =
    activeTab === "all" ? searchResults : searchResults.filter((result) => result.category === activeTab)

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  // Clear search
  const clearSearch = () => {
    setSearchQuery("")
    setSearchResults([])
  }

  // Clear a recent search
  const removeRecentSearch = (search: string) => {
    setRecentSearches((prev) => prev.filter((item) => item !== search))
  }

  // Use a suggestion
  const useSearchSuggestion = useCallback(
    (suggestion: string) => {
      setSearchQuery(suggestion)
      handleSearch()
    },
    [handleSearch],
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] flex flex-col">
        <DialogHeader className="border-b pb-4">
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Search for articles, topics, or keywords..."
              className="border-0 focus-visible:ring-0 text-lg"
              autoFocus
            />
            {searchQuery && (
              <Button variant="ghost" size="icon" onClick={clearSearch}>
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          {!searchResults.length ? (
            <div className="py-4">
              {searchQuery && suggestions.some((s) => s.includes(searchQuery.toLowerCase())) ? (
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Suggestions</h3>
                  <div className="space-y-2">
                    {suggestions
                      .filter((s) => s.includes(searchQuery.toLowerCase()))
                      .map((suggestion) => (
                        <Button
                          key={suggestion}
                          variant="outline"
                          className="mr-2 mb-2"
                          onClick={() => useSearchSuggestion(suggestion)}
                        >
                          {suggestion}
                        </Button>
                      ))}
                  </div>
                </div>
              ) : recentSearches.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Recent Searches</h3>
                    <Button variant="ghost" size="sm" onClick={() => setRecentSearches([])} className="text-xs h-8">
                      Clear All
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {recentSearches.map((search) => (
                      <div key={search} className="flex items-center justify-between group">
                        <Button
                          variant="ghost"
                          className="text-muted-foreground justify-start px-2 h-8"
                          onClick={() => {
                            setSearchQuery(search)
                            handleSearch()
                          }}
                        >
                          <Clock className="h-3.5 w-3.5 mr-2" />
                          {search}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeRecentSearch(search)}
                        >
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="py-4">
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <div className="flex items-center justify-between mb-4">
                  <TabsList>
                    {categories.map((category) => (
                      <TabsTrigger key={category.id} value={category.id}>
                        {category.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  <div className="text-sm text-muted-foreground">{filteredResults.length} results</div>
                </div>

                <TabsContent value={activeTab} className="mt-0">
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-6">
                      {filteredResults.map((result) => (
                        <SearchResult key={result.id} result={result} />
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>

        <DialogFooter className="border-t pt-4 flex-row justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <Newspaper className="h-4 w-4 mr-2" />
            <span>Press Enter to search the entire archive</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSearch} disabled={!searchQuery.trim() || isSearching}>
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

interface SearchResultProps {
  result: {
    id: number
    title: string
    snippet: string
    date: string
    category: string
    image: string
  }
}

function SearchResult({ result }: SearchResultProps) {
  const [isSaved, setIsSaved] = useState(false)

  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-20 h-20 rounded-md overflow-hidden">
        <img src={result.image || "/placeholder.svg"} alt={result.title} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <Badge variant="outline" className="mb-1 text-xs">
              {result.category.charAt(0).toUpperCase() + result.category.slice(1)}
            </Badge>
            <h3 className="font-medium">
              <Link href="#" className="hover:underline">
                {result.title}
              </Link>
            </h3>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsSaved(!isSaved)}>
            {isSaved ? <Bookmark className="h-4 w-4 fill-primary text-primary" /> : <Bookmark className="h-4 w-4" />}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{result.snippet}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-muted-foreground">{result.date}</span>
          <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
            Read Article <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  )
}

