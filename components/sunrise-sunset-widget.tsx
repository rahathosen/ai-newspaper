"use client"

import { useState, useEffect } from "react"
import { Sunrise, Sunset, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function SunriseSunsetWidget() {
  const [dayProgress, setDayProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Mock data - in a real app, this would come from an API based on location
  const sunriseTime = new Date()
  sunriseTime.setHours(6, 30, 0)

  const sunsetTime = new Date()
  sunsetTime.setHours(18, 45, 0)

  // Format times
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // Calculate day progress
  useEffect(() => {
    const calculateDayProgress = () => {
      const now = new Date()
      setCurrentTime(now)

      const sunrise = sunriseTime.getTime()
      const sunset = sunsetTime.getTime()
      const current = now.getTime()

      // If before sunrise or after sunset
      if (current < sunrise || current > sunset) {
        setDayProgress(current < sunrise ? 0 : 100)
        return
      }

      // Calculate percentage of day passed
      const totalDayLength = sunset - sunrise
      const timeSinceSunrise = current - sunrise
      const percentage = (timeSinceSunrise / totalDayLength) * 100

      setDayProgress(Math.min(100, Math.max(0, percentage)))
    }

    calculateDayProgress()
    const interval = setInterval(calculateDayProgress, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  // Calculate remaining time
  const getRemainingTime = () => {
    const now = currentTime.getTime()

    if (now < sunriseTime.getTime()) {
      const diff = sunriseTime.getTime() - now
      const minutes = Math.floor(diff / 60000)
      return `Sunrise in ${minutes} min`
    } else if (now < sunsetTime.getTime()) {
      const diff = sunsetTime.getTime() - now
      const hours = Math.floor(diff / 3600000)
      const minutes = Math.floor((diff % 3600000) / 60000)
      return `Sunset in ${hours}h ${minutes}m`
    } else {
      return "Next sunrise tomorrow"
    }
  }

  // Determine if it's day or night
  const isDaytime = currentTime.getTime() >= sunriseTime.getTime() && currentTime.getTime() <= sunsetTime.getTime()

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          <span>Sunrise & Sunset</span>
          <span className="text-xs text-muted-foreground flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            New York
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Sunrise className="h-4 w-4 mr-2 text-yellow-500" />
              <span className="text-sm">{formatTime(sunriseTime)}</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm">{formatTime(sunsetTime)}</span>
              <Sunset className="h-4 w-4 ml-2 text-orange-500" />
            </div>
          </div>

          <div className="space-y-1">
            <Progress value={dayProgress} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Dawn</span>
              <span>Noon</span>
              <span>Dusk</span>
            </div>
          </div>

          <div className="text-center text-sm">
            <span className={isDaytime ? "text-yellow-500" : "text-blue-500"}>{isDaytime ? "☀️ Day" : "🌙 Night"}</span>
            <p className="text-xs text-muted-foreground mt-1">{getRemainingTime()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

