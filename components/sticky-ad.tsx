"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Advertisement } from "@/components/advertisement"

interface StickyAdProps {
  position: "bottom" | "bottom-right"
  delay?: number
}

export function StickyAd({ position = "bottom", delay = 3000 }: StickyAdProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Show ad after delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  if (dismissed) return null

  return (
    <div
      className={`fixed z-50 transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      } ${position === "bottom" ? "bottom-0 left-0 right-0 flex justify-center p-2" : "bottom-4 right-4"}`}
    >
      {/* <div className="relative bg-background shadow-lg rounded-md overflow-hidden"> */}
      <div >
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1 right-1 h-6 w-6 z-10 bg-background/80 hover:bg-background"
          onClick={() => setDismissed(true)}
        >
          <X className="h-3 w-3" />
          <span className="sr-only">Close advertisement</span>
        </Button>

        {position === "bottom" ? (
          <Advertisement size="leaderboard" label={false} />
        ) : (
          <Advertisement size="medium-rectangle" label={false} />
        )}
      </div>
    </div>
  )
}

