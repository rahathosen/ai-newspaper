"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Bookmark, BookmarkCheck } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { SunriseSunsetWidget } from "@/components/sunrise-sunset-widget"
import { PrayerTimesWidget } from "@/components/prayer-times-widget"
import { Advertisement } from "@/components/advertisement"

export function Sidebar() {
  return (
    <div className="space-y-8 sticky top-4">
      <WeatherWidget />

      {/* Ad after weather widget */}
      <Advertisement size="medium-rectangle" />

      <SunriseSunsetWidget />
      <PrayerTimesWidget />

      {/* Ad after prayer times */}
      <Advertisement size="medium-rectangle" />

      <TodaysPaper />
      <NewsTabs />

      {/* Ad after news tabs */}
      <Advertisement size="medium-rectangle" />

      <Newsletter />
      <StockTicker />
      <ReadLaterList />
    </div>
  )
}

function WeatherWidget() {
  return (
    <div className="bg-card p-4 rounded-lg border">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">New York, NY</h3>
          <p className="text-sm text-muted-foreground">Partly Cloudy</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">72°F</p>
          <p className="text-sm text-muted-foreground">H:78° L:65°</p>
        </div>
      </div>
    </div>
  )
}

function TodaysPaper() {
  return (
    <div className="bg-card p-4 rounded-lg border">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-serif font-bold">Today's Paper</h3>
        <Badge variant="outline">March 15, 2025</Badge>
      </div>
      <div className="aspect-[3/4] bg-muted rounded-md overflow-hidden relative mb-3">
        <img
          src="/placeholder.svg?height=400&width=300&text=Front Page"
          alt="Today's Front Page"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-3 text-white">
            <h4 className="font-serif font-bold text-sm">Global Leaders Pledge Ambitious Climate Goals</h4>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <Button variant="outline" size="sm">
          View Paper
        </Button>
        <Button variant="outline" size="sm">
          Download PDF
        </Button>
      </div>
    </div>
  )
}

function NewsTabs() {
  return (
    <Tabs defaultValue="breaking" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="breaking">Breaking</TabsTrigger>
        <TabsTrigger value="trending">Trending</TabsTrigger>
        <TabsTrigger value="popular">Popular</TabsTrigger>
      </TabsList>
      <TabsContent value="breaking" className="pt-4">
        <div className="space-y-4">
          <BreakingNewsItem title="Supreme Court Rules on Landmark Privacy Case" time="10 minutes ago" isNew={true} />
          <BreakingNewsItem title="Major Breakthrough in Cancer Treatment Announced" time="1 hour ago" isNew={true} />
          <BreakingNewsItem title="Stock Markets Reach Record Highs Amid Economic Data" time="3 hours ago" />
          <BreakingNewsItem title="Olympic Committee Announces Host City for 2036 Games" time="5 hours ago" />
        </div>
      </TabsContent>
      <TabsContent value="trending" className="pt-4">
        <div className="space-y-4">
          <MostReadItem title="Scientists Discover New Species in Deep Ocean Expedition" reads="15.2K reads" rank={1} />
          <MostReadItem
            title="Analysis: How the Housing Market is Shifting in Major Cities"
            reads="12.8K reads"
            rank={2}
          />
          <MostReadItem
            title="Interview: Celebrity Chef Reveals Secret to Restaurant Success"
            reads="10.5K reads"
            rank={3}
          />
          <MostReadItem title="Tech Review: The Latest Smartphones Compared" reads="9.3K reads" rank={4} />
        </div>
      </TabsContent>
      <TabsContent value="popular" className="pt-4">
        <div className="space-y-4">
          <MostReadItem title="Opinion: Why Remote Work is Here to Stay" reads="22.1K reads" rank={1} />
          <MostReadItem title="The 10 Most Beautiful Hiking Trails in America" reads="18.7K reads" rank={2} />
          <MostReadItem title="How to Invest in a Volatile Market: Expert Advice" reads="16.9K reads" rank={3} />
          <MostReadItem
            title="Review: This Year's Most Anticipated Film Lives Up to the Hype"
            reads="14.2K reads"
            rank={4}
          />
        </div>
      </TabsContent>
    </Tabs>
  )
}

interface BreakingNewsItemProps {
  title: string
  time: string
  isNew?: boolean
}

function BreakingNewsItem({ title, time, isNew }: BreakingNewsItemProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-start gap-2">
        <h4 className="font-medium">
          <Link href="#">{title}</Link>
        </h4>
        {isNew && (
          <Badge variant="destructive" className="text-[10px] h-5">
            NEW
          </Badge>
        )}
      </div>
      <p className="text-xs text-muted-foreground">{time}</p>
    </div>
  )
}

interface MostReadItemProps {
  title: string
  reads: string
  rank: number
}

function MostReadItem({ title, reads, rank }: MostReadItemProps) {
  return (
    <article className="flex gap-3">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground">
        {rank}
      </div>
      <div>
        <h4 className="font-medium text-sm leading-tight">
          <Link href="#">{title}</Link>
        </h4>
        <p className="text-xs text-muted-foreground mt-1">{reads}</p>
      </div>
    </article>
  )
}

function Newsletter() {
  return (
    <div className="bg-card p-6 rounded-lg border">
      <h3 className="font-serif text-lg font-bold mb-4">Subscribe to Our Newsletter</h3>
      <p className="text-sm text-muted-foreground mb-4">Get the latest news delivered directly to your inbox.</p>
      <div className="space-y-2">
        <Input placeholder="Your email address" />
        <Button className="w-full">Subscribe</Button>
      </div>
    </div>
  )
}

function StockTicker() {
  return (
    <div className="bg-muted p-4 rounded-lg overflow-hidden">
      <h3 className="font-medium mb-2">Market Watch</h3>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {[
          { symbol: "AAPL", price: "182.63", change: "+1.25%" },
          { symbol: "MSFT", price: "415.32", change: "+0.78%" },
          { symbol: "GOOGL", price: "142.17", change: "-0.32%" },
          { symbol: "AMZN", price: "178.75", change: "+2.14%" },
        ].map((stock) => (
          <div key={stock.symbol} className="flex-shrink-0 bg-card p-2 rounded border">
            <div className="font-bold">{stock.symbol}</div>
            <div className="text-sm">${stock.price}</div>
            <div className={`text-xs ${stock.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
              {stock.change}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ReadLaterList() {
  const [savedArticles, setSavedArticles] = useState([
    { id: 1, title: "Global Leaders Pledge Ambitious Climate Goals at Summit", isSaved: true },
    { id: 2, title: "Tech Giants Unveil New AI Ethics Guidelines", isSaved: true },
  ])

  const toggleSave = (id: number) => {
    setSavedArticles(
      savedArticles.map((article) => (article.id === id ? { ...article, isSaved: !article.isSaved } : article)),
    )
  }

  return (
    <div className="bg-card p-4 rounded-lg border">
      <h3 className="font-serif text-lg font-bold mb-4">Read Later</h3>
      {savedArticles.length > 0 ? (
        <div className="space-y-3">
          {savedArticles.map((article) => (
            <div key={article.id} className="flex items-start gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 mt-0.5"
                      onClick={() => toggleSave(article.id)}
                    >
                      {article.isSaved ? (
                        <BookmarkCheck className="h-4 w-4 text-primary" />
                      ) : (
                        <Bookmark className="h-4 w-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{article.isSaved ? "Remove from saved" : "Save for later"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <p className="text-sm">{article.title}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          No saved articles yet. Click the bookmark icon on any article to save it for later.
        </p>
      )}
    </div>
  )
}

