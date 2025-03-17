import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Advertisement } from "@/components/advertisement"

interface RelatedArticle {
  id: number
  title: string
  category: string
  image: string
  author: string
  date: string
}

interface RelatedArticlesProps {
  articles: RelatedArticle[]
  title?: string
}

export function RelatedArticles({ articles, title = "Related Articles" }: RelatedArticlesProps) {
  return (
    <div className="bg-card border rounded-lg overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="font-serif text-xl font-bold">{title}</h3>
      </div>

      <div className="divide-y">
        {articles.map((article, index) => (
          <>
            <div key={article.id} className="p-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-20 h-16 rounded overflow-hidden">
                  <img
                    src={article.image || "/thumbnail.jpg"}
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
                  <p className="text-xs text-muted-foreground mt-1">
                    By {article.author} • {article.date}
                  </p>
                </div>
              </div>
            </div>

            {/* Insert ad after second article */}
            {index === 1 && (
              <div className="p-4">
                <Advertisement size="banner" className="mx-auto" />
              </div>
            )}
          </>
        ))}
      </div>

      <div className="p-4 border-t flex justify-center">
        <Button variant="outline" className="gap-1">
          <span>More Articles</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  )
}

