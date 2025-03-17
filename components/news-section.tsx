"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Bookmark, BookmarkCheck, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Advertisement } from "@/components/advertisement"
import { AiSummaryDialog } from "@/components/ai-summary-dialog"

interface Article {
  id: number
  title: string
  excerpt: string
  author: string
  date: string
  image: string
  category?: string
}

interface NewsSectionProps {
  title: string
  category: string
  color?: string
  articles: Article[]
  viewAllLink?: string
}

export function NewsSection({ title, category, color = "primary", articles, viewAllLink = "#" }: NewsSectionProps) {
  // Split articles into featured (first) and secondary (rest)
  const featuredArticle = articles[0]
  const secondaryArticles = articles.slice(1)

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className={`font-serif text-2xl font-bold border-l-4 pl-3 border-${color}`}>{title}</h2>
          <Badge variant="outline" className="text-xs font-normal">
            {category}
          </Badge>
        </div>
        <Link href={viewAllLink} className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          View All <ArrowRight className="ml-1 h-3 w-3" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Featured Article */}
        <div className="md:col-span-2">
          <FeaturedNewsArticle article={featuredArticle} />
        </div>

        {/* Secondary Articles */}
        <div className="space-y-4">
          {secondaryArticles.map((article, index) => (
            <>
              <SecondaryNewsArticle key={article.id} article={article} />

              {/* Insert ad after the first article in the sidebar */}
              {index === 0 && (
                <div className="py-2">
                  <Advertisement size="medium-rectangle" className="mx-auto" />
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturedNewsArticle({ article }: { article: Article }) {
  const [isSaved, setIsSaved] = useState(false)
  const [isAiSummaryOpen, setIsAiSummaryOpen] = useState(false)

  return (
    <article className="group">
      <div className="relative aspect-[16/9] overflow-hidden rounded-md mb-3">
        <img
          src={article.image || "/thumbnail.webp"}
          alt={article.title}
          className="object-cover w-full h-full transition-transform group-hover:scale-105 duration-500"
        />
      </div>
      <div className="flex justify-between items-start">
        <h3 className="font-serif text-xl font-bold leading-tight mb-2">
          <Link href="#" className="hover:underline">
            {article.title}
          </Link>
        </h3>
        <div className="flex gap-1 ml-2">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsAiSummaryOpen(true)}>
            <Sparkles className="h-3.5 w-3.5 text-primary" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsSaved(!isSaved)}>
            {isSaved ? <BookmarkCheck className="h-3.5 w-3.5 text-primary" /> : <Bookmark className="h-3.5 w-3.5" />}
          </Button>
        </div>
      </div>
      <p className="text-muted-foreground text-sm mb-2 line-clamp-3">{article.excerpt}</p>
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          By {article.author} • {article.date}
        </p>
        <Button variant="link" size="sm" className="p-0 h-auto text-xs">
          Continue Reading
        </Button>
      </div>

      <AiSummaryDialog
        open={isAiSummaryOpen}
        onOpenChange={setIsAiSummaryOpen}
        articleTitle={article.title}
        articleContent={article.excerpt}
      />
    </article>
  )
}

function SecondaryNewsArticle({ article }: { article: Article }) {
  const [isSaved, setIsSaved] = useState(false)
  const [isAiSummaryOpen, setIsAiSummaryOpen] = useState(false)

  return (
    <article className="flex gap-3 group">
      <div className="flex-shrink-0 w-24 h-16 rounded overflow-hidden">
        <img
          src={article.image || "/thumbnail.webp"}
          alt={article.title}
          className="object-cover w-full h-full transition-transform group-hover:scale-105 duration-500"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h4 className="font-medium text-sm leading-tight mb-1 line-clamp-2">
            <Link href="#" className="hover:underline">
              {article.title}
            </Link>
          </h4>
          <div className="flex gap-1 ml-1">
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsAiSummaryOpen(true)}>
              <Sparkles className="h-3 w-3 text-primary" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsSaved(!isSaved)}>
              {isSaved ? <BookmarkCheck className="h-3 w-3 text-primary" /> : <Bookmark className="h-3 w-3" />}
            </Button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          By {article.author} • {article.date}
        </p>
      </div>

      <AiSummaryDialog
        open={isAiSummaryOpen}
        onOpenChange={setIsAiSummaryOpen}
        articleTitle={article.title}
        articleContent={article.excerpt || ""}
      />
    </article>
  )
}

