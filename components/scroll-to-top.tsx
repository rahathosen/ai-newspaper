"use client"

import { useState, useEffect } from "react"
import { ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ScrollToTopProps {
  threshold?: number
  className?: string
}

export function ScrollToTop({ threshold = 300, className }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false)

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > threshold) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    // Initial check
    toggleVisibility()

    window.addEventListener("scroll", toggleVisibility)

    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [threshold])

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <Button
      variant="secondary"
      size="icon"
      className={cn(
        "fixed bottom-20 right-4 z-50 h-10 w-10 rounded-full shadow-md transition-all duration-300",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none",
        className,
      )}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <ChevronUp className="h-5 w-5" />
    </Button>
  )
}

