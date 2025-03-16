"use client"

import { useState } from "react"
import { MapPin, Search, X, ChevronDown, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface AreaNewsFilterProps {
  onAreaChange?: (area: string) => void
  className?: string
}

export function AreaNewsFilter({ onAreaChange, className }: AreaNewsFilterProps) {
  const [selectedArea, setSelectedArea] = useState<string>("Bangladesh")
  const [searchQuery, setSearchQuery] = useState("")

  // Bangladesh cities and districts
  const bangladeshLocations = [
    "Dhaka",
    "Chittagong",
    "Khulna",
    "Rajshahi",
    "Sylhet",
    "Barisal",
    "Rangpur",
    "Mymensingh",
    "Cox's Bazar",
    "Comilla",
    "Narayanganj",
    "Gazipur",
    "Jessore",
    "Bogra",
    "Dinajpur",
    "Tangail",
    "Jamalpur",
    "Pabna",
    "Kushtia",
    "Feni",
    "Brahmanbaria",
    "Sirajganj",
    "Chandpur",
    "Habiganj",
    "Narsingdi",
    "Savar",
    "Nawabganj",
    "Faridpur",
    "Madaripur",
  ]

  // Filter locations based on search query
  const filteredLocations = bangladeshLocations.filter((location) =>
    location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Handle area selection
  const handleAreaSelect = (area: string) => {
    setSelectedArea(area)
    if (onAreaChange) {
      onAreaChange(area)
    }
  }

  // Popular/featured locations in Bangladesh
  const featuredLocations = ["Dhaka", "Chittagong", "Sylhet", "Cox's Bazar", "Rajshahi"]

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Bangladesh News</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <MapPin className="h-3.5 w-3.5" />
                <span>{selectedArea}</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuItem onClick={() => handleAreaSelect("Bangladesh")}>
                <MapPin className="h-4 w-4 mr-2" />
                <span>All Bangladesh</span>
              </DropdownMenuItem>
              {featuredLocations.map((location) => (
                <DropdownMenuItem key={location} onClick={() => handleAreaSelect(location)}>
                  <Navigation className="h-4 w-4 mr-2" />
                  <span>{location}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="p-3 border-t border-b bg-muted/50">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search locations in Bangladesh..."
              className="pl-8 h-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1 h-7 w-7"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        </div>

        <ScrollArea className="h-[300px]">
          <div className="p-3">
            <h4 className="font-medium mb-2">Bangladesh Locations</h4>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className={cn(
                  "cursor-pointer hover:bg-primary hover:text-primary-foreground",
                  selectedArea === "Bangladesh" && "bg-primary text-primary-foreground",
                )}
                onClick={() => handleAreaSelect("Bangladesh")}
              >
                All Bangladesh
              </Badge>
              {filteredLocations.map((location) => (
                <Badge
                  key={location}
                  variant="outline"
                  className={cn(
                    "cursor-pointer hover:bg-primary hover:text-primary-foreground",
                    selectedArea === location && "bg-primary text-primary-foreground",
                  )}
                  onClick={() => handleAreaSelect(location)}
                >
                  {location}
                </Badge>
              ))}
            </div>

            {filteredLocations.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">No locations found matching "{searchQuery}"</div>
            )}
          </div>
        </ScrollArea>

        <div className="p-3 border-t">
          <div className="flex items-center justify-between">
            <div className="text-sm">
              Currently showing news for: <span className="font-medium">{selectedArea}</span>
            </div>
            {selectedArea !== "Bangladesh" && (
              <Button variant="ghost" size="sm" onClick={() => handleAreaSelect("Bangladesh")}>
                Reset
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

