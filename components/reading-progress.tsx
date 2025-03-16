"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface ReadingProgressProps {
  target?: string
  color?: string
  height?: number
  top?: boolean
  zIndex?: number
  className?: string
}

export function ReadingProgress({
  target,
  color = "bg-primary",
  height = 4,
  top = true,
  zIndex = 50,
  className,
}: ReadingProgressProps) {
  const [readingProgress, setReadingProgress] = useState(0)

  useEffect(() => {
    const calculateScrollProgress = () => {
      const scrollElement = document.documentElement
      let targetElement: HTMLElement | null = null

      if (target) {
        targetElement = document.querySelector(target) as HTMLElement
        if (targetElement) {
          const rect = targetElement.getBoundingClientRect()
          const windowHeight = window.innerHeight
          const totalHeight = rect.height
          const visibleHeight = Math.min(windowHeight, rect.bottom) - Math.max(0, rect.top)
          const progress = Math.min(100, Math.max(0, (visibleHeight / totalHeight) * 100))
          setReadingProgress(progress)
          return
        }
      }

      // Default behavior - calculate progress for entire page
      const totalHeight = scrollElement.scrollHeight - scrollElement.clientHeight
      const currentProgress = scrollElement.scrollTop / totalHeight
      setReadingProgress(currentProgress * 100)
    }

    // Calculate on mount
    calculateScrollProgress()

    // Add scroll event listener
    window.addEventListener("scroll", calculateScrollProgress, { passive: true })

    return () => {
      window.removeEventListener("scroll", calculateScrollProgress)
    }
  }, [target])

  return (
    <div
      className={cn("fixed left-0 right-0 transition-transform duration-300", top ? "top-0" : "bottom-0", className)}
      style={{
        height: `${height}px`,
        zIndex: zIndex,
        transform: readingProgress > 0 ? "translateY(0)" : top ? "translateY(-100%)" : "translateY(100%)",
      }}
    >
      <div
        className={color}
        style={{
          width: `${readingProgress}%`,
          height: "100%",
        }}
      />
    </div>
  )
}

