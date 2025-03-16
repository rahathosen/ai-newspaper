"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Twitter, Facebook, Linkedin, Mail, LinkIcon, Share2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

interface SocialShareBarProps {
  title: string
  url?: string
  description?: string
  vertical?: boolean
  className?: string
}

export function SocialShareBar({
  title,
  url = window.location.href,
  description = "",
  vertical = false,
  className,
}: SocialShareBarProps) {
  const [showMobileShare, setShowMobileShare] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const shareLinks = [
    {
      name: "Twitter",
      icon: Twitter,
      color: "hover:bg-[#1DA1F2] hover:text-white",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    },
    {
      name: "Facebook",
      icon: Facebook,
      color: "hover:bg-[#4267B2] hover:text-white",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "hover:bg-[#0077B5] hover:text-white",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      name: "Email",
      icon: Mail,
      color: "hover:bg-gray-700 hover:text-white",
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${description}\n\n${url}`)}`,
    },
  ]

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      setIsCopied(true)
      toast({
        title: "Link copied!",
        description: "The article link has been copied to your clipboard.",
        duration: 3000,
      })

      setTimeout(() => {
        setIsCopied(false)
      }, 3000)
    })
  }

  const handleShare = (e: React.MouseEvent, shareUrl: string) => {
    e.preventDefault()
    window.open(shareUrl, "_blank", "width=600,height=400")
  }

  // For native mobile share
  const handleMobileShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        })
      } catch (err) {
        console.error("Error sharing:", err)
      }
    } else {
      setShowMobileShare(!showMobileShare)
    }
  }

  if (!isVisible) return null

  return (
    <div
      className={cn(
        "fixed z-40 transition-all duration-300",
        vertical
          ? "left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2"
          : "left-0 right-0 bottom-0 p-2 bg-background/80 backdrop-blur-sm border-t",
        className,
      )}
    >
      {vertical ? (
        <div className="bg-background border rounded-full shadow-md p-1 flex flex-col items-center gap-1">
          <TooltipProvider>
            {shareLinks.map((link) => (
              <Tooltip key={link.name}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn("rounded-full h-8 w-8", link.color)}
                    onClick={(e) => handleShare(e, link.url)}
                  >
                    <link.icon className="h-4 w-4" />
                    <span className="sr-only">Share on {link.name}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Share on {link.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-8 w-8 hover:bg-gray-700 hover:text-white"
                  onClick={copyToClipboard}
                >
                  <LinkIcon className="h-4 w-4" />
                  <span className="sr-only">Copy link</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{isCopied ? "Copied!" : "Copy link"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ) : (
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-sm font-medium">Share this article:</div>
          <div className="flex items-center gap-2">
            {/* Mobile share button */}
            <div className="md:hidden">
              <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleMobileShare}>
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </Button>

              {showMobileShare && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                  <div className="bg-background rounded-lg p-4 w-[90%] max-w-md">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Share this article</h3>
                      <Button variant="ghost" size="icon" onClick={() => setShowMobileShare(false)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      {shareLinks.map((link) => (
                        <a
                          key={link.name}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col items-center gap-1"
                          onClick={(e) => handleShare(e, link.url)}
                        >
                          <div className={cn("p-3 rounded-full", link.color.replace("hover:", ""))}>
                            <link.icon className="h-5 w-5 text-white" />
                          </div>
                          <span className="text-xs">{link.name}</span>
                        </a>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4" onClick={copyToClipboard}>
                      <LinkIcon className="h-4 w-4 mr-2" />
                      <span>{isCopied ? "Copied!" : "Copy link"}</span>
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Desktop share buttons */}
            <div className="hidden md:flex items-center gap-2">
              {shareLinks.map((link) => (
                <Button
                  key={link.name}
                  variant="ghost"
                  size="icon"
                  className={cn("rounded-full h-8 w-8", link.color)}
                  onClick={(e) => handleShare(e, link.url)}
                >
                  <link.icon className="h-4 w-4" />
                  <span className="sr-only">Share on {link.name}</span>
                </Button>
              ))}

              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-8 w-8 hover:bg-gray-700 hover:text-white"
                onClick={copyToClipboard}
              >
                <LinkIcon className="h-4 w-4" />
                <span className="sr-only">Copy link</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

