"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  Bot,
  Sparkles,
  Zap,
  X,
  Send,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Minimize2,
  BookOpen,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface AiFeaturesProps {
  articleTitle?: string
  articleContent?: string
  className?: string
}

export function AiFeatures({ articleTitle, articleContent, className }: AiFeaturesProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI assistant. I can help answer questions about news articles, summarize content, or provide additional context. How can I help you today?",
    },
  ])
  const [userInput, setUserInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [summary, setSummary] = useState<string | null>(null)
  const [isSummarizing, setIsSummarizing] = useState(false)
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false)
  const [copiedSummary, setCopiedSummary] = useState(false)

  const chatEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [chatMessages])

  // Generate recommendations based on article
  useEffect(() => {
    if (activeTab === "recommend" && !recommendations.length && !isLoadingRecommendations) {
      generateRecommendations()
    }
  }, [activeTab, recommendations.length, isLoadingRecommendations])

  // Handle chat submission
  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!userInput.trim() || isLoading) return

    // Add user message to chat
    setChatMessages((prev) => [...prev, { role: "user", content: userInput }])
    setIsLoading(true)

    // Store the current input before clearing it
    const currentInput = userInput
    setUserInput("")

    // Simulate AI response with more varied responses
    setTimeout(() => {
      let response = ""
      const input = currentInput.toLowerCase()

      // Generate contextual response based on user input
      if (input.includes("summarize") || input.includes("summary")) {
        response =
          "Here's a summary of the article: The article discusses recent global climate initiatives, focusing on the commitments made by world leaders at the international summit. It highlights the ambitious targets set for reducing carbon emissions and the economic implications of these policies."
      } else if (input.includes("author") || input.includes("who wrote")) {
        response =
          "This article was written by Sarah Johnson, an environmental correspondent with over 15 years of experience covering climate policy and international negotiations."
      } else if (input.includes("when") || input.includes("date") || input.includes("published")) {
        response = "This article was published on March 15, 2025."
      } else if (input.includes("explain") || input.includes("what is")) {
        response =
          "I'd be happy to explain! The article is discussing the recent international climate agreement where countries have committed to specific targets for reducing greenhouse gas emissions. The goal is to limit global warming to 1.5 degrees Celsius above pre-industrial levels. This is significant because it represents one of the most ambitious coordinated global efforts to address climate change."
      } else if (input.includes("key points") || input.includes("main points")) {
        response =
          "The key points from this article are:\n\n1. 190+ countries committed to new climate targets\n2. Goal to limit warming to 1.5°C above pre-industrial levels\n3. 50% emissions reduction by 2030, net-zero by 2050\n4. $100 billion annual climate finance package\n5. Robust monitoring framework established"
      } else if (input.includes("criticism") || input.includes("critics")) {
        response =
          "The article mentions that environmental activists have criticized the agreement for not going far enough to address the urgency of the climate crisis. Greta Thunberg is quoted saying 'We need immediate action, not distant promises.' Additionally, some developing nations have expressed concerns about meeting targets without sufficient financial and technological support from wealthier countries."
      } else if (input.includes("hello") || input.includes("hi") || input.includes("hey")) {
        response =
          "Hello! I'm here to help you understand this article better. You can ask me to summarize it, explain specific points, or provide additional context about the topic. What would you like to know?"
      } else if (input.includes("thank")) {
        response =
          "You're welcome! If you have any other questions about this article or need help with anything else, feel free to ask."
      } else {
        // More varied default responses
        const defaultResponses = [
          "I understand you're asking about the article. While I don't have all the specific details, I can tell you that it discusses important developments in global climate policy. Is there something specific about the article you'd like to know more about?",
          "That's an interesting question about the article. It primarily covers the recent climate summit and the commitments made by world leaders. Could you clarify which aspect you'd like me to elaborate on?",
          "The article focuses on climate policy and international agreements. I'd be happy to provide more specific information if you could clarify your question a bit more.",
          "I see you're interested in this climate policy article. It covers the recent international summit and resulting agreements. What specific aspect would you like me to explain further?",
        ]
        response = defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
      }

      // Add AI response to chat
      setChatMessages((prev) => [...prev, { role: "assistant", content: response }])
      setIsLoading(false)
    }, 1500)
  }

  // Generate article summary
  const generateSummary = () => {
    if (isSummarizing) return

    setIsSummarizing(true)
    setSummary(null)

    // Simulate summary generation with a more realistic timing
    const summaryTime = 1500 + Math.random() * 1500 // Between 1.5 and 3 seconds

    setTimeout(() => {
      const generatedSummary =
        "World leaders from over 190 countries have committed to new climate targets aimed at limiting global warming to 1.5 degrees Celsius above pre-industrial levels. The historic agreement includes a 50% reduction in greenhouse gas emissions by 2030, achieving net-zero emissions by 2050 for developed nations, phasing out coal power, and a $100 billion annual climate finance package. Despite criticism from environmental activists who argue the targets don't go far enough, the agreement establishes a robust monitoring framework to ensure accountability. Economists project the transition could create millions of new jobs in clean energy sectors while potentially displacing workers in fossil fuel industries."

      setSummary(generatedSummary)
      setIsSummarizing(false)
    }, summaryTime)
  }

  // Generate article recommendations
  const generateRecommendations = () => {
    setIsLoadingRecommendations(true)
    setRecommendations([])

    // Simulate recommendations generation with variable timing
    const recommendTime = 1200 + Math.random() * 1800 // Between 1.2 and 3 seconds

    setTimeout(() => {
      const mockRecommendations = [
        {
          id: 1,
          title: "New Carbon Capture Technology Shows Promise in Large-Scale Tests",
          category: "Technology",
          relevance: 92,
          date: "Yesterday",
          image: "/placeholder.svg?height=100&width=150&text=Carbon+Capture",
        },
        {
          id: 2,
          title: "Economic Impact of Climate Policies on Developing Nations",
          category: "Business",
          relevance: 87,
          date: "2 days ago",
          image: "/placeholder.svg?height=100&width=150&text=Economic+Impact",
        },
        {
          id: 3,
          title: "Island Nations Push for More Aggressive Climate Targets",
          category: "Politics",
          relevance: 85,
          date: "3 days ago",
          image: "/placeholder.svg?height=100&width=150&text=Island+Nations",
        },
        {
          id: 4,
          title: "Renewable Energy Investments Reach Record High in First Quarter",
          category: "Business",
          relevance: 81,
          date: "1 week ago",
          image: "/placeholder.svg?height=100&width=150&text=Renewable+Energy",
        },
        {
          id: 5,
          title: "Climate Scientists Develop New Models for Predicting Sea Level Rise",
          category: "Science",
          relevance: 78,
          date: "1 week ago",
          image: "/placeholder.svg?height=100&width=150&text=Climate+Science",
        },
      ]

      setRecommendations(mockRecommendations)
      setIsLoadingRecommendations(false)
    }, recommendTime)
  }

  // Copy summary to clipboard
  const copySummary = () => {
    if (summary) {
      navigator.clipboard.writeText(summary)
      setCopiedSummary(true)

      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopiedSummary(false)
      }, 2000)
    }
  }

  // Reset summary
  const resetSummary = () => {
    setSummary(null)
  }

  // Refresh recommendations
  const refreshRecommendations = () => {
    generateRecommendations()
  }

  return (
    <div className={cn("fixed bottom-4 right-4 z-50", className)}>
      {/* Collapsed button */}
      {!isExpanded && (
        <Button onClick={() => setIsExpanded(true)} className="rounded-full h-14 w-14 shadow-lg">
          <Bot className="h-6 w-6" />
        </Button>
      )}

      {/* Expanded panel */}
      {isExpanded && (
        <Card
          className={cn(
            "w-[350px] shadow-lg transition-all duration-200 ease-in-out",
            isExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none",
          )}
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">AI Assistant</CardTitle>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsExpanded(false)}>
                  <Minimize2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsExpanded(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardDescription>Powered by AI to enhance your reading experience</CardDescription>
          </CardHeader>

          <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab}>
            <div className="px-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="chat" className="flex items-center gap-1">
                  <Bot className="h-4 w-4" />
                  <span>Chat</span>
                </TabsTrigger>
                <TabsTrigger value="summarize" className="flex items-center gap-1">
                  <Zap className="h-4 w-4" />
                  <span>Summarize</span>
                </TabsTrigger>
                <TabsTrigger value="recommend" className="flex items-center gap-1">
                  <Sparkles className="h-4 w-4" />
                  <span>Recommend</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Chat Tab */}
            <TabsContent value="chat" className="m-0 p-0">
              <CardContent className="p-0">
                <ScrollArea className="h-[300px] p-4">
                  <div className="space-y-4">
                    {chatMessages.map((message, index) => (
                      <div
                        key={index}
                        className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
                      >
                        <div
                          className={cn(
                            "max-w-[80%] rounded-lg p-3",
                            message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                          )}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 bg-primary rounded-full animate-pulse"></div>
                            <div className="h-2 w-2 bg-primary rounded-full animate-pulse delay-150"></div>
                            <div className="h-2 w-2 bg-primary rounded-full animate-pulse delay-300"></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>
                </ScrollArea>
              </CardContent>

              <CardFooter className="border-t p-3">
                <form onSubmit={handleChatSubmit} className="flex w-full gap-2">
                  <Input
                    placeholder="Ask about this article..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" disabled={isLoading || !userInput.trim()}>
                    {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </form>
              </CardFooter>
            </TabsContent>

            {/* Summarize Tab */}
            <TabsContent value="summarize" className="m-0 p-0">
              <CardContent className="p-4">
                {!summary && !isSummarizing ? (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-medium mb-2">Generate Article Summary</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Our AI will create a concise summary of the article for you.
                    </p>
                    <Button onClick={generateSummary}>
                      <Zap className="h-4 w-4 mr-2" />
                      Generate Summary
                    </Button>
                  </div>
                ) : isSummarizing ? (
                  <div className="text-center py-12">
                    <RefreshCw className="h-8 w-8 text-primary animate-spin mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">Analyzing article content...</p>
                    <p className="text-xs text-muted-foreground mt-2">This may take a few moments</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Article Summary</h3>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={copySummary}>
                              {copiedSummary ? (
                                <Check className="h-4 w-4 text-green-500" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{copiedSummary ? "Copied!" : "Copy summary"}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="bg-muted p-3 rounded-md text-sm">{summary}</div>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-muted-foreground">Generated by AI based on article content</div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <ThumbsUp className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <ThumbsDown className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-medium mb-2">Key Points</h4>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        <li>190+ countries committed to new climate targets</li>
                        <li>Goal to limit warming to 1.5°C above pre-industrial levels</li>
                        <li>50% emissions reduction by 2030, net-zero by 2050</li>
                        <li>$100 billion annual climate finance package</li>
                        <li>Robust monitoring framework established</li>
                      </ul>
                    </div>
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm" onClick={resetSummary}>
                        <RefreshCw className="h-3.5 w-3.5 mr-1" />
                        Regenerate
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </TabsContent>

            {/* Recommend Tab */}
            <TabsContent value="recommend" className="m-0 p-0">
              <CardContent className="p-4">
                {isLoadingRecommendations ? (
                  <div className="text-center py-12">
                    <RefreshCw className="h-8 w-8 text-primary animate-spin mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">Finding relevant articles...</p>
                    <p className="text-xs text-muted-foreground mt-2">Analyzing your reading preferences</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Recommended Articles</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          AI-Powered
                        </Badge>
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={refreshRecommendations}>
                          <RefreshCw className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {recommendations.map((article) => (
                        <div key={article.id} className="flex gap-3 group">
                          <div className="flex-shrink-0 w-16 h-12 rounded overflow-hidden">
                            <img
                              src={article.image || "/placeholder.svg"}
                              alt={article.title}
                              className="object-cover w-full h-full transition-transform group-hover:scale-105 duration-500"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="text-[10px]">
                                {article.category}
                              </Badge>
                              <Badge className="bg-primary/20 text-primary text-[10px] border-none">
                                {article.relevance}% Match
                              </Badge>
                            </div>
                            <h4 className="font-medium text-sm leading-tight line-clamp-2 group-hover:underline">
                              <a href="#">{article.title}</a>
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1">{article.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground text-center pt-2">
                      Recommendations based on your reading history and article content
                    </div>
                  </div>
                )}
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      )}
    </div>
  )
}

