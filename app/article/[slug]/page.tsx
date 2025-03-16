"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Calendar, Bookmark, Share2, Printer, Volume2, Sparkles } from "lucide-react"
import { Advertisement } from "@/components/advertisement"
import { SocialShareBar } from "@/components/social-share-bar"
import { ReadingProgress } from "@/components/reading-progress"
import { ArticleRecommendations } from "@/components/article-recommendations"
import { RelatedArticles } from "@/components/related-articles"
import { AiFeatures } from "@/components/ai-features"
import { ScrollToTop } from "@/components/scroll-to-top"
import { ArticlePageAi } from "@/components/article-page-ai"
import { AiSummaryDialog } from "@/components/ai-summary-dialog"

interface ArticlePageProps {
  params: {
    slug: string
  }
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const [aiSummaryOpen, setAiSummaryOpen] = useState(false)

  // In a real app, you would fetch the article data based on the slug
  // For this demo, we'll use mock data

  const article = {
    title: "Global Leaders Pledge Ambitious Climate Goals at Summit",
    slug: params.slug,
    excerpt:
      "World leaders from over 190 countries have committed to new climate targets aimed at limiting global warming to 1.5 degrees Celsius above pre-industrial levels.",
    content: `
      <p>World leaders from over 190 countries have committed to new climate targets aimed at limiting global warming to 1.5 degrees Celsius above pre-industrial levels. The historic agreement comes after intense negotiations that extended well beyond the scheduled conclusion of the summit.</p>
      
      <p>"This is a defining moment in our collective effort to address the climate crisis," said UN Secretary-General António Guterres. "The commitments made today represent a significant step forward, but we must ensure these pledges translate into immediate and concrete action."</p>
      
      <h2>Key Commitments</h2>
      
      <p>The agreement includes several groundbreaking commitments:</p>
      
      <ul>
        <li>A 50% reduction in greenhouse gas emissions by 2030 compared to 2010 levels</li>
        <li>Achieving net-zero emissions by 2050 for developed nations and 2060 for developing countries</li>
        <li>Phasing out coal power in developed nations by 2030 and globally by 2040</li>
        <li>A $100 billion annual climate finance package for developing nations</li>
        <li>Protecting 30% of land and ocean areas by 2030</li>
      </ul>
      
      <h2>Challenges and Criticisms</h2>
      
      <p>Despite the ambitious targets, the agreement has faced criticism from environmental activists who argue that the commitments don't go far enough to address the urgency of the climate crisis.</p>
      
      <p>"While we welcome the progress made, these targets still fall short of what the science demands," said Greta Thunberg, climate activist. "We need immediate action, not distant promises."</p>
      
      <p>Some developing nations have also expressed concerns about the feasibility of meeting these targets without significant financial and technological support from wealthier countries.</p>
      
      <blockquote>
        <p>"We cannot address climate change without addressing inequality. Developing nations need resources to transition to clean energy while still growing their economies and lifting people out of poverty."</p>
        <cite>— Dr. Amara Okafor, Climate Policy Expert</cite>
      </blockquote>
      
      <h2>Implementation and Monitoring</h2>
      
      <p>A key aspect of the agreement is the establishment of a robust monitoring and reporting framework to ensure countries are making progress toward their commitments.</p>
      
      <p>The framework includes:</p>
      
      <ul>
        <li>Annual progress reports submitted to the UN</li>
        <li>Independent verification of emissions reductions</li>
        <li>A global stocktake every five years to assess collective progress</li>
        <li>Financial penalties for nations that fail to meet their targets</li>
      </ul>
      
      <p>"Accountability is essential," said EU Climate Commissioner Frans Timmermans. "Without a strong monitoring system, these commitments risk becoming empty promises."</p>
      
      <h2>Economic Implications</h2>
      
      <p>The transition to a low-carbon economy presents both challenges and opportunities. While some industries will face significant disruption, the agreement is expected to accelerate investment in renewable energy, sustainable transportation, and green infrastructure.</p>
      
      <p>Economists project that implementing the agreement could create millions of new jobs in clean energy sectors while potentially displacing workers in fossil fuel industries.</p>
      
      <p>"This transition must be just and equitable," said International Labour Organization Director-General Gilbert Houngbo. "We need comprehensive strategies to support workers and communities that depend on carbon-intensive industries."</p>
      
      <h2>Looking Ahead</h2>
      
      <p>The success of the agreement will ultimately depend on how quickly and effectively countries translate their commitments into national policies and actions.</p>
      
      <p>"The hard work begins now," said U.S. Climate Envoy John Kerry. "We must transform our energy systems, our transportation networks, our industries, and our agricultural practices at a pace and scale never before attempted."</p>
      
      <p>The next major climate conference is scheduled for November 2025, where countries will report on their initial progress and potentially strengthen their commitments based on the latest scientific assessments.</p>
    `,
    author: {
      name: "Sarah Johnson",
      role: "Environmental Correspondent",
      avatar: "/placeholder.svg?height=40&width=40&text=SJ",
    },
    publishedAt: "March 15, 2025",
    readTime: "10 min read",
    categories: ["Politics", "Climate Change", "Global Policy"],
    location: {
      division: "Dhaka",
      district: "Dhaka District",
    },
    image: "/placeholder.svg?height=600&width=1200&text=Climate+Summit",
    imageCaption: "World leaders gather at the International Climate Summit in Geneva, Switzerland.",
  }

  const relatedArticles = [
    {
      id: 1,
      title: "Global Markets React to Central Bank Policy Shifts",
      category: "Business",
      image: "/placeholder.svg?height=200&width=300&text=Markets",
      author: "Robert Williams",
      date: "4 hours ago",
    },
    {
      id: 2,
      title: "Tech Companies Announce Carbon Neutral Initiatives",
      category: "Technology",
      image: "/placeholder.svg?height=200&width=300&text=Tech",
      author: "Michael Chen",
      date: "Yesterday",
    },
    {
      id: 3,
      title: "Analysis: How the Housing Market is Shifting in Major Cities",
      category: "Real Estate",
      image: "/placeholder.svg?height=200&width=300&text=Housing",
      author: "Jennifer Lee",
      date: "2 days ago",
    },
    {
      id: 4,
      title: "Political Leaders Gather for Climate Summit",
      category: "Politics",
      image: "/placeholder.svg?height=200&width=300&text=Climate",
      author: "David Rodriguez",
      date: "3 days ago",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <ReadingProgress target="#article-content" />
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <article id="article-content">
              {/* Article Header */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {article.categories.map((category) => (
                    <Badge key={category} variant={category === "Politics" ? "default" : "outline"}>
                      {category}
                    </Badge>
                  ))}
                </div>

                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                  {article.title}
                </h1>

                <p className="text-lg text-muted-foreground mb-4">{article.excerpt}</p>

                {article.location && (
                  <div className="mb-4">
                    <Badge variant="outline" className="text-sm">
                      {article.location.division}, {article.location.district}
                    </Badge>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={article.author.avatar} alt={article.author.name} />
                      <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{article.author.name}</div>
                      <div className="text-sm text-muted-foreground">{article.author.role}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{article.publishedAt}</span>
                    <span className="mx-1">•</span>
                    <Clock className="h-4 w-4" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Article Actions */}
              <div className="flex items-center justify-between mb-6 py-3 border-y">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="gap-1 bg-primary/10 hover:bg-primary/20 text-primary"
                    onClick={() => setAiSummaryOpen(true)}
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>AI Summary</span>
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Printer className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Featured Image */}
              <div className="relative aspect-[16/9] overflow-hidden rounded-lg mb-6">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt="Global Climate Summit"
                  className="object-cover w-full h-full"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                  <p className="text-sm">{article.imageCaption}</p>
                </div>
              </div>

              {/* Article Content */}
              <div
                className="prose prose-lg dark:prose-invert max-w-none mb-8"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Mid-article Ad */}
              <div className="my-8">
                <Advertisement size="leaderboard" className="mx-auto" />
              </div>

              {/* AI Analysis */}
              <div className="my-8">
                <ArticlePageAi articleTitle={article.title} articleContent={article.content} />
              </div>

              {/* Article Footer */}
              <div className="border-t pt-6 mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{article.author.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Environmental Correspondent with over 15 years of experience covering climate policy and
                      international negotiations.
                    </p>
                  </div>
                  <Button variant="outline">Follow Author</Button>
                </div>
              </div>
            </article>
          </div>

          <div className="space-y-8">
            {/* Sidebar Ad */}
            <Advertisement size="medium-rectangle" />

            {/* Article Recommendations */}
            <ArticleRecommendations />

            {/* Related Articles */}
            <RelatedArticles articles={relatedArticles} />

            {/* Sidebar Ad */}
            <Advertisement size="medium-rectangle" />
          </div>
        </div>
      </main>

      <Footer />

      {/* Social Share Bar */}
      <SocialShareBar title={article.title} description={article.excerpt} vertical={true} />

      {/* AI Features */}
      <AiFeatures articleTitle={article.title} articleContent={article.content} />

      {/* Scroll to Top Button */}
      <ScrollToTop />

      {/* AI Summary Dialog */}
      <AiSummaryDialog
        open={aiSummaryOpen}
        onOpenChange={setAiSummaryOpen}
        articleTitle={article.title}
        articleContent={article.content}
      />
    </div>
  )
}

