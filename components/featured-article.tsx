"use client"

import { useState } from "react"
import Link from "next/link"
import { Clock, Bookmark, BookmarkCheck, Share2, MessageSquare, Volume2, Printer, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArticleAudioPlayer } from "@/components/article-audio-player"
import { AiSummaryDialog } from "@/components/ai-summary-dialog"

export function FeaturedArticle() {
  const [isSaved, setIsSaved] = useState(false)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [isAiSummaryOpen, setIsAiSummaryOpen] = useState(false)

  return (
    <div className="space-y-6">
      <article className="space-y-4">
        <div className="relative">
          <Badge className="absolute top-3 left-3 z-10">FEATURED</Badge>
          <div className="relative aspect-[16/9] overflow-hidden rounded-md">
            <img
              src="/placeholder.svg?height=600&width=1200"
              alt="Global leaders at climate summit"
              className="object-cover w-full h-full transition-transform hover:scale-105 duration-500"
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between items-start">
            <h2 className="font-serif text-2xl md:text-3xl font-bold leading-tight">
              <Link href="#">Global Leaders Pledge Ambitious Climate Goals at Summit</Link>
            </h2>
            <div className="flex gap-2 ml-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsAiSummaryOpen(true)}>
                      <Sparkles className="h-4 w-4 text-primary" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>AI Summary</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsSaved(!isSaved)}>
                      {isSaved ? <BookmarkCheck className="h-4 w-4 text-primary" /> : <Bookmark className="h-4 w-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isSaved ? "Remove from saved" : "Save article"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setIsAudioPlaying(!isAudioPlaying)}
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Listen to article</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => window.print()}>
                      <Printer className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Print article</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <DropdownMenu>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share article</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link href="#" className="w-full">
                      Twitter
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="#" className="w-full">
                      Facebook
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="#" className="w-full">
                      LinkedIn
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="#" className="w-full">
                      Email
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="#" className="w-full">
                      Copy Link
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <span>By Sarah Johnson</span>
              <span>•</span>
              <Clock className="h-3 w-3" />
              <span>10 min read</span>
            </p>
            <Link href="#" className="text-sm text-muted-foreground flex items-center gap-1 hover:text-foreground">
              <MessageSquare className="h-3 w-3" />
              <span>128 comments</span>
            </Link>
          </div>
          <p className="mt-4 text-muted-foreground">
            World leaders from over 190 countries have committed to new climate targets aimed at limiting global warming
            to 1.5 degrees Celsius above pre-industrial levels. The historic agreement comes after intense negotiations
            that extended well beyond the scheduled conclusion of the summit.
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            <Badge variant="outline">Climate Change</Badge>
            <Badge variant="outline">Global Policy</Badge>
            <Badge variant="outline">Environment</Badge>
          </div>
          <Button variant="link" className="px-0 mt-2">
           <Link href={'/article/1'}>
           Continue Reading →
           </Link>
          </Button>

          {isAudioPlaying && <ArticleAudioPlayer onClose={() => setIsAudioPlaying(false)} />}

          <AiSummaryDialog
            open={isAiSummaryOpen}
            onOpenChange={setIsAiSummaryOpen}
            articleTitle="Global Leaders Pledge Ambitious Climate Goals at Summit"
            articleContent="World leaders from over 190 countries have committed to new climate targets aimed at limiting global warming to 1.5 degrees Celsius above pre-industrial levels. The historic agreement comes after intense negotiations that extended well beyond the scheduled conclusion of the summit."
          />
        </div>
      </article>

      <Separator />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <SecondaryArticle
          title="Tech Giants Unveil New AI Ethics Guidelines"
          author="Michael Chen"
          readTime="6 min read"
          summary="Leading technology companies have jointly announced a new framework for ethical AI development and deployment, addressing concerns about bias, privacy, and transparency."
          tags={["Technology", "AI", "Ethics"]}
          comments={42}
        />

        <SecondaryArticle
          title="Economic Forecast Shows Resilience Despite Challenges"
          author="Robert Williams"
          readTime="5 min read"
          summary="A new economic report suggests that despite ongoing inflation concerns, the global economy is showing signs of resilience with moderate growth expected in the coming quarters."
          tags={["Economy", "Markets", "Finance"]}
          comments={36}
        />
      </div>
    </div>
  )
}

interface SecondaryArticleProps {
  title: string
  author: string
  readTime: string
  summary: string
  tags: string[]
  comments: number
}

function SecondaryArticle({ title, author, readTime, summary, tags, comments }: SecondaryArticleProps) {
  const [isSaved, setIsSaved] = useState(false)
  const [isAiSummaryOpen, setIsAiSummaryOpen] = useState(false)

  return (
    <article className="space-y-3">
      <div className="relative aspect-[16/9] overflow-hidden rounded-md">
        <img
          src="/placeholder.svg?height=400&width=600"
          alt={title}
          className="object-cover w-full h-full transition-transform hover:scale-105 duration-500"
        />
      </div>
      <div>
        <div className="flex justify-between items-start">
          <h3 className="font-serif text-xl font-bold leading-tight">
            <Link href="#">{title}</Link>
          </h3>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsAiSummaryOpen(true)}>
              <Sparkles className="h-3.5 w-3.5 text-primary" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsSaved(!isSaved)}>
              {isSaved ? <BookmarkCheck className="h-3.5 w-3.5 text-primary" /> : <Bookmark className="h-3.5 w-3.5" />}
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-muted-foreground flex items-center gap-2">
            <span>By {author}</span>
            <span>•</span>
            <Clock className="h-3 w-3" />
            <span>{readTime}</span>
          </p>
          <Link href="#" className="text-xs text-muted-foreground flex items-center gap-1 hover:text-foreground">
            <MessageSquare className="h-3 w-3" />
            <span>{comments}</span>
          </Link>
        </div>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{summary}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <AiSummaryDialog
        open={isAiSummaryOpen}
        onOpenChange={setIsAiSummaryOpen}
        articleTitle={title}
        articleContent={summary}
      />
    </article>
  )
}

