"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Bot, Sparkles, Zap, Send, Copy, Check, ThumbsUp, ThumbsDown, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface ArticlePageAiProps {
  articleTitle: string
  articleContent: string
  className?: string
}

export function ArticlePageAi({ articleTitle, articleContent, className }: ArticlePageAiProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState("analyze")
  const [analysis, setAnalysis] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [userQuery, setUserQuery] = useState("")
  const [queryResult, setQueryResult] = useState<string | null>(null)
  const [isQuerying, setIsQuerying] = useState(false)
  const [relatedTopics, setRelatedTopics] = useState<string[]>([])
  const [isLoadingTopics, setIsLoadingTopics] = useState(false)
  const [copiedAnalysis, setCopiedAnalysis] = useState(false)

  // Generate analysis when component mounts
  useEffect(() => {
    if (activeTab === "analyze" && !analysis && !isAnalyzing) {
      generateAnalysis()
    }
  }, [activeTab, analysis, isAnalyzing])

  // Generate related topics when switching to that tab
  useEffect(() => {
    if (activeTab === "topics" && relatedTopics.length === 0 && !isLoadingTopics) {
      generateRelatedTopics()
    }
  }, [activeTab, relatedTopics.length, isLoadingTopics])

  // Generate article analysis
  const generateAnalysis = () => {
    if (isAnalyzing) return

    setIsAnalyzing(true)
    setAnalysis(null)

    // Simulate analysis generation
    setTimeout(() => {
      const generatedAnalysis = `
This article presents a comprehensive overview of the recent global climate summit and its outcomes. 

Key insights:
- The agreement represents a significant shift in international climate policy, with unprecedented commitments from both developed and developing nations
- The financial mechanisms ($100B annual package) acknowledge the economic disparities between nations
- The monitoring framework addresses previous criticisms of climate agreements lacking enforcement
- There's a notable tension between environmental activists pushing for more aggressive action and pragmatic policy considerations

The article maintains a balanced perspective, presenting both the achievements of the summit and the criticisms from various stakeholders. It effectively contextualizes the economic implications, acknowledging both the potential job creation in clean energy sectors and the challenges for fossil fuel-dependent communities.

The timeline for implementation (2030/2050 targets) aligns with scientific consensus on climate action urgency while recognizing practical constraints of economic and industrial transitions.
      `

      setAnalysis(generatedAnalysis)
      setIsAnalyzing(false)
    }, 2500)
  }

  // Generate related topics
  const generateRelatedTopics = () => {
    setIsLoadingTopics(true)

    // Simulate topic generation
    setTimeout(() => {
      setRelatedTopics([
        "Carbon capture technologies",
        "Climate finance mechanisms",
        "Just transition policies for fossil fuel workers",
        "Renewable energy infrastructure development",
        "Climate adaptation strategies for vulnerable regions",
        "International climate policy enforcement",
        "Carbon markets and emissions trading",
        "Climate justice and equity considerations",
        "Green technology transfer to developing nations",
        "Climate change impacts on global food security",
      ])
      setIsLoadingTopics(false)
    }, 1800)
  }

  // Handle query submission
  const handleQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!userQuery.trim() || isQuerying) return

    setIsQuerying(true)
    setQueryResult(null)

    // Store current query
    const currentQuery = userQuery
    setUserQuery("")

    // Simulate query processing
    setTimeout(() => {
      let result = ""

      // Generate response based on query
      if (currentQuery.toLowerCase().includes("economic")) {
        result =
          "The article discusses several economic aspects of climate policy:\n\n1. A $100 billion annual climate finance package for developing nations\n2. Potential job creation in clean energy sectors\n3. Possible displacement of workers in fossil fuel industries\n4. The need for 'just and equitable' transition strategies\n5. Balancing economic growth with climate action in developing countries"
      } else if (
        currentQuery.toLowerCase().includes("criticism") ||
        currentQuery.toLowerCase().includes("opposition")
      ) {
        result =
          "The article mentions criticism from two main sources:\n\n1. Environmental activists (including Greta Thunberg) who argue the targets don't go far enough and that immediate action is needed rather than distant promises\n\n2. Developing nations expressing concerns about meeting targets without sufficient financial and technological support from wealthier countries"
      } else if (currentQuery.toLowerCase().includes("timeline") || currentQuery.toLowerCase().includes("deadline")) {
        result =
          "The agreement includes several key timelines:\n\n- 50% reduction in emissions by 2030 (compared to 2010 levels)\n- Net-zero emissions by 2050 for developed nations\n- Net-zero emissions by 2060 for developing countries\n- Phasing out coal power in developed nations by 2030\n- Phasing out coal power globally by 2040\n- Next major climate conference scheduled for November 2025"
      } else if (
        currentQuery.toLowerCase().includes("monitoring") ||
        currentQuery.toLowerCase().includes("enforcement")
      ) {
        result =
          "The monitoring framework includes:\n\n- Annual progress reports submitted to the UN\n- Independent verification of emissions reductions\n- A global stocktake every five years to assess collective progress\n- Financial penalties for nations that fail to meet their targets\n\nThe article emphasizes that 'accountability is essential' and quotes EU Climate Commissioner Frans Timmermans saying 'Without a strong monitoring system, these commitments risk becoming empty promises.'"
      } else {
        result =
          'Based on your query about "' +
          currentQuery +
          "\", I've analyzed the article and found the following relevant information:\n\nThe article discusses the recent climate summit where over 190 countries committed to new targets aimed at limiting global warming to 1.5 degrees Celsius. Key commitments include emissions reductions, net-zero targets, phasing out coal power, and financial support for developing nations.\n\nThe agreement has faced criticism from environmental activists who argue it doesn't go far enough, while some developing nations have concerns about implementation without adequate support.\n\nThe article also discusses economic implications, monitoring frameworks, and next steps for implementation."
      }

      setQueryResult(result)
      setIsQuerying(false)
    }, 2000)
  }

  // Copy analysis to clipboard
  const copyAnalysis = () => {
    if (analysis) {
      navigator.clipboard.writeText(analysis)
      setCopiedAnalysis(true)

      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopiedAnalysis(false)
      }, 2000)
    }
  }

  return (
    <Card className={cn("border shadow-md", className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">AI Article Analysis</CardTitle>
          </div>
          <Badge variant="outline" className="text-xs">
            Powered by AI
          </Badge>
        </div>
        <CardDescription>Get deeper insights into this article</CardDescription>
      </CardHeader>

      <Tabs defaultValue="analyze" value={activeTab} onValueChange={setActiveTab}>
        <div className="px-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="analyze" className="flex items-center gap-1">
              <Zap className="h-4 w-4" />
              <span>Analysis</span>
            </TabsTrigger>
            <TabsTrigger value="query" className="flex items-center gap-1">
              <Bot className="h-4 w-4" />
              <span>Query</span>
            </TabsTrigger>
            <TabsTrigger value="topics" className="flex items-center gap-1">
              <Sparkles className="h-4 w-4" />
              <span>Related Topics</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Analysis Tab */}
        <TabsContent value="analyze" className="m-0 p-0">
          <CardContent className="p-4">
            {isAnalyzing ? (
              <div className="text-center py-8">
                <RefreshCw className="h-8 w-8 text-primary animate-spin mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">Analyzing article content...</p>
                <p className="text-xs text-muted-foreground mt-2">Extracting key insights</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Expert Analysis</h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={copyAnalysis}>
                          {copiedAnalysis ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{copiedAnalysis ? "Copied!" : "Copy analysis"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="bg-muted p-3 rounded-md text-sm whitespace-pre-line">{analysis}</div>
                <div className="flex justify-between items-center">
                  <div className="text-xs text-muted-foreground">AI-generated analysis based on article content</div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <ThumbsUp className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <ThumbsDown className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </TabsContent>

        {/* Query Tab */}
        <TabsContent value="query" className="m-0 p-0">
          <CardContent className="p-4">
            <form onSubmit={handleQuerySubmit} className="space-y-4">
              <div>
                <label htmlFor="article-query" className="text-sm font-medium block mb-1">
                  Ask a question about this article
                </label>
                <div className="flex gap-2">
                  <Input
                    id="article-query"
                    placeholder="e.g., What are the economic implications?"
                    value={userQuery}
                    onChange={(e) => setUserQuery(e.target.value)}
                    disabled={isQuerying}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={isQuerying || !userQuery.trim()}>
                    {isQuerying ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {isQuerying ? (
                <div className="text-center py-4">
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-2 w-2 bg-primary rounded-full animate-pulse"></div>
                    <div className="h-2 w-2 bg-primary rounded-full animate-pulse delay-150"></div>
                    <div className="h-2 w-2 bg-primary rounded-full animate-pulse delay-300"></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Searching article content...</p>
                </div>
              ) : queryResult ? (
                <div className="bg-muted p-3 rounded-md text-sm whitespace-pre-line">{queryResult}</div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground">
                    Ask any question about the article content, key points, or implications
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setUserQuery("What are the economic implications?")}
                    >
                      Economic implications
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setUserQuery("What criticism does the agreement face?")}
                    >
                      Criticisms
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setUserQuery("What is the timeline for implementation?")}
                    >
                      Timeline
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
        </TabsContent>

        {/* Related Topics Tab */}
        <TabsContent value="topics" className="m-0 p-0">
          <CardContent className="p-4">
            {isLoadingTopics ? (
              <div className="text-center py-8">
                <RefreshCw className="h-8 w-8 text-primary animate-spin mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">Discovering related topics...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="font-medium">Related Topics to Explore</h3>
                <div className="flex flex-wrap gap-2">
                  {relatedTopics.map((topic, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors py-1.5"
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground text-center pt-2">
                  Click on any topic to find related articles
                </div>
              </div>
            )}
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  )
}

