"use client"

import { useState } from "react"
import {
  Cloud,
  CloudRain,
  CloudSnow,
  Sun,
  CloudSun,
  Wind,
  Droplets,
  Thermometer,
  MapPin,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface WeatherData {
  location: string
  current: {
    temp: number
    feelsLike: number
    condition: string
    icon: string
    humidity: number
    windSpeed: number
    precipitation: number
    uvIndex: number
  }
  hourly: Array<{
    time: string
    temp: number
    condition: string
    icon: string
    precipitation: number
  }>
  daily: Array<{
    day: string
    date: string
    high: number
    low: number
    condition: string
    icon: string
    precipitation: number
    sunrise: string
    sunset: string
  }>
}

export function WeatherForecast() {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    location: "New York, NY",
    current: {
      temp: 72,
      feelsLike: 74,
      condition: "Partly Cloudy",
      icon: "cloud-sun",
      humidity: 65,
      windSpeed: 8,
      precipitation: 20,
      uvIndex: 6,
    },
    hourly: [
      { time: "Now", temp: 72, condition: "Partly Cloudy", icon: "cloud-sun", precipitation: 20 },
      { time: "1 PM", temp: 74, condition: "Partly Cloudy", icon: "cloud-sun", precipitation: 15 },
      { time: "2 PM", temp: 75, condition: "Mostly Sunny", icon: "sun", precipitation: 10 },
      { time: "3 PM", temp: 76, condition: "Mostly Sunny", icon: "sun", precipitation: 5 },
      { time: "4 PM", temp: 75, condition: "Partly Cloudy", icon: "cloud-sun", precipitation: 10 },
      { time: "5 PM", temp: 73, condition: "Partly Cloudy", icon: "cloud-sun", precipitation: 15 },
      { time: "6 PM", temp: 71, condition: "Cloudy", icon: "cloud", precipitation: 25 },
      { time: "7 PM", temp: 69, condition: "Cloudy", icon: "cloud", precipitation: 30 },
      { time: "8 PM", temp: 68, condition: "Chance of Rain", icon: "cloud-rain", precipitation: 40 },
    ],
    daily: [
      {
        day: "Today",
        date: "Mar 15",
        high: 76,
        low: 65,
        condition: "Partly Cloudy",
        icon: "cloud-sun",
        precipitation: 20,
        sunrise: "6:30 AM",
        sunset: "6:45 PM",
      },
      {
        day: "Sat",
        date: "Mar 16",
        high: 78,
        low: 67,
        condition: "Mostly Sunny",
        icon: "sun",
        precipitation: 10,
        sunrise: "6:29 AM",
        sunset: "6:46 PM",
      },
      {
        day: "Sun",
        date: "Mar 17",
        high: 80,
        low: 68,
        condition: "Sunny",
        icon: "sun",
        precipitation: 0,
        sunrise: "6:28 AM",
        sunset: "6:47 PM",
      },
      {
        day: "Mon",
        date: "Mar 18",
        high: 77,
        low: 66,
        condition: "Partly Cloudy",
        icon: "cloud-sun",
        precipitation: 15,
        sunrise: "6:27 AM",
        sunset: "6:48 PM",
      },
      {
        day: "Tue",
        date: "Mar 19",
        high: 72,
        low: 63,
        condition: "Chance of Rain",
        icon: "cloud-rain",
        precipitation: 60,
        sunrise: "6:26 AM",
        sunset: "6:49 PM",
      },
      {
        day: "Wed",
        date: "Mar 20",
        high: 68,
        low: 60,
        condition: "Rain",
        icon: "cloud-rain",
        precipitation: 80,
        sunrise: "6:25 AM",
        sunset: "6:50 PM",
      },
      {
        day: "Thu",
        date: "Mar 21",
        high: 70,
        low: 62,
        condition: "Partly Cloudy",
        icon: "cloud-sun",
        precipitation: 30,
        sunrise: "6:24 AM",
        sunset: "6:51 PM",
      },
    ],
  })

  const [expanded, setExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState("hourly")

  // Get weather icon component based on icon name
  const getWeatherIcon = (iconName: string, size = 5) => {
    const iconProps = { className: `h-${size} w-${size}` }

    switch (iconName) {
      case "sun":
        return <Sun {...iconProps} className={`${iconProps.className} text-yellow-500`} />
      case "cloud-sun":
        return <CloudSun {...iconProps} className={`${iconProps.className} text-blue-400`} />
      case "cloud":
        return <Cloud {...iconProps} className={`${iconProps.className} text-gray-400`} />
      case "cloud-rain":
        return <CloudRain {...iconProps} className={`${iconProps.className} text-blue-500`} />
      case "cloud-snow":
        return <CloudSnow {...iconProps} className={`${iconProps.className} text-blue-200`} />
      default:
        return <Sun {...iconProps} className={`${iconProps.className} text-yellow-500`} />
    }
  }

  return (
    <Card className={cn("overflow-hidden transition-all duration-300", expanded ? "h-auto" : "h-[180px]")}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{weatherData.location}</span>
          </CardTitle>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setExpanded(!expanded)}>
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        {/* Current Weather */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getWeatherIcon(weatherData.current.icon)}
            <div>
              <div className="text-3xl font-bold">{weatherData.current.temp}°F</div>
              <div className="text-sm text-muted-foreground">Feels like {weatherData.current.feelsLike}°F</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-medium">{weatherData.current.condition}</div>
            <div className="text-sm text-muted-foreground flex items-center justify-end gap-2">
              <Droplets className="h-3.5 w-3.5" />
              <span>{weatherData.current.precipitation}%</span>
            </div>
          </div>
        </div>

        {/* Expanded content */}
        {expanded && (
          <div className="mt-4">
            {/* Current details */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              <div className="flex flex-col items-center p-2 bg-muted/50 rounded-md">
                <Droplets className="h-4 w-4 mb-1 text-blue-500" />
                <span className="text-xs text-muted-foreground">Humidity</span>
                <span className="font-medium">{weatherData.current.humidity}%</span>
              </div>
              <div className="flex flex-col items-center p-2 bg-muted/50 rounded-md">
                <Wind className="h-4 w-4 mb-1 text-blue-400" />
                <span className="text-xs text-muted-foreground">Wind</span>
                <span className="font-medium">{weatherData.current.windSpeed} mph</span>
              </div>
              <div className="flex flex-col items-center p-2 bg-muted/50 rounded-md">
                <Thermometer className="h-4 w-4 mb-1 text-red-500" />
                <span className="text-xs text-muted-foreground">UV Index</span>
                <span className="font-medium">{weatherData.current.uvIndex} (Moderate)</span>
              </div>
              <div className="flex flex-col items-center p-2 bg-muted/50 rounded-md">
                <CloudRain className="h-4 w-4 mb-1 text-blue-500" />
                <span className="text-xs text-muted-foreground">Precipitation</span>
                <span className="font-medium">{weatherData.current.precipitation}%</span>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Forecast tabs */}
            <Tabs defaultValue="hourly" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="hourly">Hourly</TabsTrigger>
                <TabsTrigger value="daily">7-Day</TabsTrigger>
              </TabsList>

              <TabsContent value="hourly" className="mt-4">
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {weatherData.hourly.map((hour, index) => (
                    <div key={index} className="flex flex-col items-center min-w-[60px]">
                      <span className="text-xs text-muted-foreground">{hour.time}</span>
                      {getWeatherIcon(hour.icon, 4)}
                      <span className="font-medium mt-1">{hour.temp}°</span>
                      <div className="flex items-center mt-1">
                        <Droplets className="h-3 w-3 text-blue-500 mr-1" />
                        <span className="text-xs">{hour.precipitation}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="daily" className="mt-4">
                <div className="space-y-3">
                  {weatherData.daily.map((day, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="w-16">
                        <div className="font-medium">{day.day}</div>
                        <div className="text-xs text-muted-foreground">{day.date}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Droplets className="h-3.5 w-3.5 text-blue-500" />
                        <span className="text-xs">{day.precipitation}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {getWeatherIcon(day.icon, 4)}
                        <span className="text-sm">{day.condition}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-medium">{day.high}°</span>
                        <span className="text-muted-foreground text-sm"> / {day.low}°</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

