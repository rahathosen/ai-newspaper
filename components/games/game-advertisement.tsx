"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Gamepad2, Trophy, Users, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface GameAdvertisementProps {
  title: string
  description: string
  featured: string[]
  background?: "gradient" | "pattern" | "solid"
  variant?: "standard" | "compact"
  className?: string
}

export function GameAdvertisement({
  title,
  description,
  featured,
  background = "gradient",
  variant = "standard",
  className,
}: GameAdvertisementProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [playerCount, setPlayerCount] = useState(Math.floor(Math.random() * 50) + 150)

  // Simulate active players changing
  useEffect(() => {
    const interval = setInterval(() => {
      setPlayerCount((prev) => prev + Math.floor(Math.random() * 5) - 2)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Rotate featured games
  useEffect(() => {
    if (featured.length > 1) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % featured.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [featured])

  // Get background styles based on type
  const getBackgroundStyles = () => {
    switch (background) {
      case "gradient":
        return "bg-gradient-to-r from-primary/10 via-primary/5 to-background border border-primary/10"
      case "pattern":
        return "bg-[radial-gradient(circle_at_top_right,rgba(var(--secondary-rgb),0.1),transparent_70%),radial-gradient(circle_at_bottom_left,rgba(var(--primary-rgb),0.1),transparent_70%)] border border-muted"
      case "solid":
        return "bg-muted/30 border border-muted"
      default:
        return "bg-background border border-border"
    }
  }

  return (
    <div
      className={cn(
        "rounded-lg overflow-hidden shadow-sm",
        getBackgroundStyles(),
        variant === "compact" ? "p-4" : "p-6",
        className,
      )}
    >
      {variant === "standard" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Left content */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <Gamepad2 className="h-5 w-5 text-primary" />
              <h3 className="font-serif text-xl font-bold">{title}</h3>
            </div>
            <p className="text-muted-foreground">{description}</p>

            <div className="flex flex-wrap gap-2 pt-2">
              {featured.map((game, index) => (
                <Badge
                  key={game}
                  variant={index === activeIndex ? "default" : "outline"}
                  className={cn("text-xs transition-all duration-300", index === activeIndex && "animate-pulse")}
                >
                  {game}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
              <div className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                <span>{playerCount} playing now</span>
              </div>
              <div className="flex items-center gap-1">
                <Trophy className="h-3.5 w-3.5" />
                <span>Weekly prizes</span>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/games">
                <Button className="gap-2">
                  Play Now <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right content - Game preview */}
          <div className="relative h-40 md:h-full rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-muted/50 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  duration: 2,
                }}
                className="relative"
              >
                <Gamepad2 className="h-16 w-16 text-primary/30" />
                <Sparkles className="absolute top-0 right-0 h-6 w-6 text-primary animate-pulse" />
              </motion.div>
            </div>
          </div>
        </div>
      ) : (
        // Compact variant
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 h-16 w-16 rounded bg-muted/50 flex items-center justify-center">
            <Gamepad2 className="h-8 w-8 text-primary/40" />
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-serif font-bold text-base">{title}</h4>
            <p className="text-sm text-muted-foreground line-clamp-1">{description}</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs">
                {featured[activeIndex]}
              </Badge>
              <span className="text-xs text-muted-foreground">{playerCount} active players</span>
            </div>
          </div>

          <Link href="/games" className="flex-shrink-0">
            <Button size="sm" variant="outline" className="gap-1">
              Play <ArrowRight className="h-3 w-3" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}

