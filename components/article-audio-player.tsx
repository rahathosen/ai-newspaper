"use client"

import { useState, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"

interface ArticleAudioPlayerProps {
  onClose: () => void
}

export function ArticleAudioPlayer({ onClose }: ArticleAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(80)

  // Simulate progress
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsPlaying(false)
            return 100
          }
          return prev + 0.5
        })
      }, 500)
    }

    return () => clearInterval(interval)
  }, [isPlaying])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  // Total duration in seconds (10 minutes)
  const totalDuration = 600
  // Current time based on progress
  const currentTime = (progress / 100) * totalDuration

  return (
    <Card className="mt-4">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium">Now Playing: Article Audio</h4>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-7 w-7">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setProgress(Math.max(0, progress - 10))}
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button variant="default" size="icon" className="h-10 w-10" onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setProgress(Math.min(100, progress + 10))}
            >
              <SkipForward className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-2 ml-4">
              <Volume2 className="h-4 w-4 text-muted-foreground" />
              <Slider
                value={[volume]}
                max={100}
                step={1}
                className="w-24"
                onValueChange={(value) => setVolume(value[0])}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Slider value={[progress]} max={100} step={0.1} onValueChange={(value) => setProgress(value[0])} />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(totalDuration)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

