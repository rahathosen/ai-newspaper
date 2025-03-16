"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Bell, BellOff, MapPin } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function PrayerTimesWidget() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)

  // Mock prayer times - in a real app, these would come from an API
  const prayerTimes = [
    { name: "Fajr", time: "5:12 AM", passed: true },
    { name: "Dhuhr", time: "12:30 PM", passed: true },
    { name: "Asr", time: "3:45 PM", passed: false, next: true },
    { name: "Maghrib", time: "6:45 PM", passed: false },
    { name: "Isha", time: "8:15 PM", passed: false },
  ]

  // Update current time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  // Find next prayer
  const nextPrayer = prayerTimes.find((prayer) => prayer.next)

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">Prayer Times</CardTitle>
          <div className="flex items-center gap-2">
            <Switch
              id="notifications"
              checked={notificationsEnabled}
              onCheckedChange={setNotificationsEnabled}
              size="sm"
            />
            <Label htmlFor="notifications" className="text-xs">
              {notificationsEnabled ? (
                <span className="flex items-center">
                  <Bell className="h-3 w-3 mr-1" /> Alerts On
                </span>
              ) : (
                <span className="flex items-center text-muted-foreground">
                  <BellOff className="h-3 w-3 mr-1" /> Alerts Off
                </span>
              )}
            </Label>
          </div>
        </div>
        <div className="text-xs text-muted-foreground flex items-center mt-1">
          <MapPin className="h-3 w-3 mr-1" />
          <span>
            New York, NY •{" "}
            {currentTime.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {prayerTimes.map((prayer) => (
            <div
              key={prayer.name}
              className={`flex items-center justify-between p-2 rounded-md ${
                prayer.next ? "bg-primary/10 border border-primary/20" : ""
              }`}
            >
              <div className="flex items-center">
                {prayer.next && <Clock className="h-3 w-3 mr-1.5 text-primary" />}
                <span className={`text-sm ${prayer.next ? "font-medium" : ""}`}>{prayer.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">{prayer.time}</span>
                {prayer.passed ? (
                  <Badge variant="outline" className="text-[10px] h-5 bg-muted">
                    Passed
                  </Badge>
                ) : prayer.next ? (
                  <Badge variant="default" className="text-[10px] h-5">
                    Next
                  </Badge>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        {nextPrayer && (
          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground">
              Next prayer: <span className="font-medium text-foreground">{nextPrayer.name}</span> in{" "}
              <span className="font-medium text-foreground">2h 15m</span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

