"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Sparkles,
  Copy,
  Share,
  Bookmark,
  RefreshCw,
  Check,
  Download,
  Zap,
  Brain,
  Lightbulb,
  Link2,
  ArrowRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface AiSummaryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  articleTitle: string
  articleContent: string
}

interface RelatedArticle {
  id: string
  title: string
  category: string
  url: string
}

export function AiSummaryDialog({ open, onOpenChange, articleTitle, articleContent }: AiSummaryDialogProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [summary, setSummary] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("concise")
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)
  const [relatedArticles, setRelatedArticles] = useState<RelatedArticle[]>([])

  // Generate summary based on the selected style
  const generateSummary = () => {
    setIsGenerating(true)
    setSummary(null)
    setRelatedArticles([])

    // Simulate API call with timeout
    setTimeout(() => {
      let generatedSummary = ""

      if (activeTab === "concise") {
        generatedSummary =
          "World leaders from 190+ countries have committed to ambitious climate targets aimed at limiting global warming to 1.5°C. The agreement includes a 50% emissions reduction by 2030, net-zero by 2050 for developed nations, and a $100B annual climate finance package. Despite criticism from environmental activists, the agreement establishes a robust monitoring framework to ensure accountability."
      } else if (activeTab === "detailed") {
        generatedSummary =
          "The international climate summit has resulted in a landmark agreement where over 190 countries have committed to new climate targets. Key commitments include a 50% reduction in greenhouse gas emissions by 2030, achieving net-zero emissions by 2050 for developed nations and 2060 for developing countries, phasing out coal power, and a $100 billion annual climate finance package.\n\nThe agreement has faced criticism from environmental activists who argue the targets don't go far enough, while some developing nations have expressed concerns about implementation without adequate support. A robust monitoring framework has been established to ensure accountability, including annual progress reports, independent verification, and financial penalties for non-compliance.\n\nEconomists project the transition could create millions of new jobs in clean energy sectors while potentially displacing workers in fossil fuel industries. The next major climate conference is scheduled for November 2025."
      } else if (activeTab === "bullet") {
        generatedSummary =
          "• 190+ countries committed to new climate targets\n• Goal to limit warming to 1.5°C above pre-industrial levels\n• 50% emissions reduction by 2030\n• Net-zero by 2050 for developed nations, 2060 for developing countries\n• $100B annual climate finance package\n• Coal phase-out: 2030 for developed nations, 2040 globally\n• Robust monitoring framework with penalties for non-compliance\n• Environmental activists criticize targets as insufficient\n• Developing nations concerned about implementation support\n• Economists project job creation in clean energy sectors"
      }

      // Generate related articles
      const mockRelatedArticles = [
        {
          id: "1",
          title: "Climate Finance: How the $100B Package Will Be Distributed",
          category: "Environment",
          url: "#climate-finance",
        },
        {
          id: "2",
          title: "Environmental Activists Push for More Ambitious Targets",
          category: "Politics",
          url: "#activists-response",
        },
        {
          id: "3",
          title: "The Economic Impact of Climate Policies on Developing Nations",
          category: "Economy",
          url: "#economic-impact",
        },
        {
          id: "4",
          title: "Timeline: The History of International Climate Agreements",
          category: "History",
          url: "#climate-history",
        },
      ]

      setSummary(generatedSummary)
      setRelatedArticles(mockRelatedArticles)
      setIsGenerating(false)
    }, 2500)
  }

  // Copy summary to clipboard
  const copySummary = () => {
    if (summary) {
      navigator.clipboard.writeText(summary)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Toggle saved state
  const toggleSave = () => {
    setSaved(!saved)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <DialogTitle>AI Summary</DialogTitle>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Get an AI-generated summary of this article in your preferred style
          </p>
        </DialogHeader>

        <Tabs defaultValue="concise" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="concise" className="text-xs sm:text-sm">
                <Zap className="h-3.5 w-3.5 mr-1.5" />
                Concise
              </TabsTrigger>
              <TabsTrigger value="detailed" className="text-xs sm:text-sm">
                <Brain className="h-3.5 w-3.5 mr-1.5" />
                Detailed
              </TabsTrigger>
              <TabsTrigger value="bullet" className="text-xs sm:text-sm">
                <Lightbulb className="h-3.5 w-3.5 mr-1.5" />
                Bullet Points
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="px-6">
            {!summary && !isGenerating ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Generate AI Summary</h3>
                <p className="text-sm text-muted-foreground max-w-md mb-6">
                  Our AI will analyze this article and create a summary based on your selected style.
                </p>
                <Button onClick={generateSummary} className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  Generate Summary
                </Button>
              </div>
            ) : isGenerating ? (
              <div className="py-16 flex flex-col items-center justify-center">
                <div className="relative">
                  <div className="h-16 w-16 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
                  <Sparkles className="h-6 w-6 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
                <div className="mt-6 text-center">
                  <h3 className="font-medium mb-2">Analyzing Article</h3>
                  <p className="text-sm text-muted-foreground">Our AI is extracting key information...</p>
                </div>
                <div className="mt-6 w-full max-w-xs bg-muted rounded-full h-2 overflow-hidden">
                  <div className="bg-primary h-full animate-progress"></div>
                </div>
              </div>
            ) : (
              <div className="py-4">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline" className="text-xs">
                    {activeTab === "concise"
                      ? "Concise Summary"
                      : activeTab === "detailed"
                        ? "Detailed Summary"
                        : "Key Points"}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={copySummary}>
                      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleSave}>
                      <Bookmark className={cn("h-4 w-4", saved && "fill-primary text-primary")} />
                    </Button>
                  </div>
                </div>

                <div
                  className={cn(
                    "bg-muted/50 rounded-lg p-4 text-sm whitespace-pre-line",
                    activeTab === "bullet" && "font-mono",
                  )}
                >
                  {summary}
                </div>

                {/* Related Articles Section */}
                {/* {relatedArticles.length > 0 && (
                  <div className="mt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Link2 className="h-4 w-4 text-primary" />
                      <h4 className="font-medium text-sm">Related Articles & References</h4>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-3 space-y-2">
                      {relatedArticles.map((article) => (
                        <div key={article.id} className="flex items-center justify-between text-sm">
                          <div className="flex-1 min-w-0">
                            <Link href={article.url} className="hover:text-primary transition-colors line-clamp-1">
                              {article.title}
                            </Link>
                            <Badge variant="outline" className="text-xs mt-1">
                              {article.category}
                            </Badge>
                          </div>
                          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0 ml-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                )} */}
              </div>
            )}
          </div>
        </Tabs>

        <DialogFooter className="p-6 pt-2 flex-row justify-between items-center">
          <div className="text-xs text-muted-foreground">Powered by AI technology</div>
          <div className="flex gap-2">
            {summary && (
              <>
                <Button variant="outline" size="sm" onClick={() => generateSummary()}>
                  <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                  Regenerate
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-3.5 w-3.5 mr-1.5" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <Share className="h-3.5 w-3.5 mr-1.5" />
                  Share
                </Button>
              </>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

