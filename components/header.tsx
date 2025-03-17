"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { CalendarDays, Menu, Search, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { NavSubmenu } from "@/components/nav-submenu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BreakingNewsTicker } from "@/components/breaking-news-ticker"
import { SearchDialog } from "@/components/search-dialog"
import { Advertisement } from "@/components/advertisement"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const mainNavItems = [
    {
      title: "Politics",
      submenu: [
        { title: "U.S. Politics", href: "#" },
        { title: "International Relations", href: "#" },
        { title: "Policy", href: "#" },
        { title: "Elections", href: "#" },
        { title: "Campaign", href: "#" },
        { title: "Congress", href: "#" },
        { title: "White House", href: "#" },
        { title: "Supreme Court", href: "#" },
        { title: "Political Parties", href: "#" },
        { title: "Political Analysis", href: "#" },
      ],
    },
    {
      title: "Business",
      submenu: [
        { title: "Economy", href: "#" },
        { title: "Markets", href: "#" },
        { title: "Companies", href: "#" },
        { title: "Technology", href: "#" },
        { title: "Personal Finance", href: "#" },
        { title: "Entrepreneurship", href: "#" },
        { title: "Real Estate", href: "#" },
        { title: "Energy", href: "#" },
        { title: "Media", href: "#" },
        { title: "Small Business", href: "#" },
      ],
    },
    {
      title: "Technology",
      submenu: [
        { title: "AI & Robotics", href: "#" },
        { title: "Computing", href: "#" },
        { title: "Mobile", href: "#" },
        { title: "Internet", href: "#" },
        { title: "Virtual Reality", href: "#" },
        { title: "Cybersecurity", href: "#" },
        { title: "Tech Policy", href: "#" },
        { title: "Social Media", href: "#" },
        { title: "Future Tech", href: "#" },
        { title: "Reviews", href: "#" },
      ],
    },
    {
      title: "Science",
      submenu: [
        { title: "Environment", href: "#" },
        { title: "Space", href: "#" },
        { title: "Physics", href: "#" },
        { title: "Genetics", href: "#" },
        { title: "Wildlife", href: "#" },
        { title: "Climate Change", href: "#" },
        { title: "Astronomy", href: "#" },
        { title: "Biology", href: "#" },
        { title: "Chemistry", href: "#" },
        { title: "Archaeology", href: "#" },
      ],
    },
    {
      title: "Health",
      submenu: [
        { title: "Medicine", href: "#" },
        { title: "Mental Health", href: "#" },
        { title: "Nutrition", href: "#" },
        { title: "Fitness", href: "#" },
        { title: "Public Health", href: "#" },
        { title: "Diseases", href: "#" },
        { title: "Healthcare Policy", href: "#" },
        { title: "Wellness", href: "#" },
        { title: "Aging", href: "#" },
        { title: "Children's Health", href: "#" },
      ],
    },
    {
      title: "Sports",
      submenu: [
        { title: "Football", href: "#" },
        { title: "Basketball", href: "#" },
        { title: "Tennis", href: "#" },
        { title: "Golf", href: "#" },
        { title: "Olympics", href: "#" },
        { title: "Soccer", href: "#" },
        { title: "Baseball", href: "#" },
        { title: "Hockey", href: "#" },
        { title: "Racing", href: "#" },
        { title: "Combat Sports", href: "#" },
      ],
    },
    {
      title: "Arts",
      submenu: [
        { title: "Film", href: "#" },
        { title: "Music", href: "#" },
        { title: "Books", href: "#" },
        { title: "Theater", href: "#" },
        { title: "Visual Arts", href: "#" },
        { title: "Dance", href: "#" },
        { title: "Architecture", href: "#" },
        { title: "Design", href: "#" },
        { title: "Television", href: "#" },
        { title: "Culture", href: "#" },
      ],
    },
  ]

  const secondaryNavItems = [
    {
      title: "World",
      submenu: [
        { title: "Europe", href: "#" },
        { title: "Asia", href: "#" },
        { title: "Middle East", href: "#" },
        { title: "Africa", href: "#" },
        { title: "Americas", href: "#" },
        { title: "Australia", href: "#" },
        { title: "United Nations", href: "#" },
        { title: "Global Development", href: "#" },
        { title: "Global Economy", href: "#" },
        { title: "Global Politics", href: "#" },
      ],
    },
    {
      title: "U.S.",
      submenu: [
        { title: "Northeast", href: "#" },
        { title: "Midwest", href: "#" },
        { title: "South", href: "#" },
        { title: "West", href: "#" },
        { title: "National", href: "#" },
        { title: "Education", href: "#" },
        { title: "Immigration", href: "#" },
        { title: "Criminal Justice", href: "#" },
        { title: "Environment", href: "#" },
        { title: "Infrastructure", href: "#" },
      ],
    },
    {
      title: "Opinion",
      submenu: [
        { title: "Editorials", href: "#" },
        { title: "Op-Ed", href: "#" },
        { title: "Letters", href: "#" },
        { title: "Sunday Review", href: "#" },
        { title: "Video Opinion", href: "#" },
        { title: "Columnists", href: "#" },
        { title: "Guest Essays", href: "#" },
        { title: "Political Opinion", href: "#" },
        { title: "Business Opinion", href: "#" },
        { title: "Tech Opinion", href: "#" },
      ],
    },
    {
      title: "Lifestyle",
      submenu: [
        { title: "Food", href: "#" },
        { title: "Fashion", href: "#" },
        { title: "Travel", href: "#" },
        { title: "Design", href: "#" },
        { title: "Automobiles", href: "#" },
        { title: "Real Estate", href: "#" },
        { title: "Parenting", href: "#" },
        { title: "Relationships", href: "#" },
        { title: "Home & Garden", href: "#" },
        { title: "Style", href: "#" },
      ],
    },
    {
      title: "Travel",
      submenu: [
        { title: "Destinations", href: "#" },
        { title: "Adventure", href: "#" },
        { title: "Food & Drink", href: "#" },
        { title: "Hotels", href: "#" },
        { title: "Travel News", href: "#" },
        { title: "Budget Travel", href: "#" },
        { title: "Luxury Travel", href: "#" },
        { title: "Travel Guides", href: "#" },
        { title: "Travel Tips", href: "#" },
        { title: "Cruises", href: "#" },
      ],
    },
  ]

  const handleMouseEnter = (title: string) => {
    setOpenSubmenu(title)
  }

  const handleMouseLeave = () => {
    setOpenSubmenu(null)
  }

  return (
    <header ref={headerRef} className="relative">
      {/* Breaking News Ticker */}
      <BreakingNewsTicker />

      {/* Top Ad Banner */}
      <div className="container mx-auto px-4 py-2">
        <Advertisement size="leaderboard" className="mx-auto" />
      </div>

      {/* Sticky Header on Scroll */}
      {isScrolled && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b shadow-md py-2">
          <div className="container mx-auto px-4 flex items-center justify-between">
            <Link href="/" className="font-serif text-xl font-bold">
              The Daily Summary
            </Link>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-4">
                {mainNavItems.slice(0, 5).map((item) => (
                  <div
                    key={item.title}
                    className="relative group"
                    onMouseEnter={() => handleMouseEnter(item.title)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button className="text-sm text-muted-foreground hover:text-foreground">{item.title}</button>
                    {openSubmenu === item.title && (
                      <div
                        className="absolute left-0 w-full bg-background border-b shadow-lg z-50"
                        style={{ width: "100vw", left: "50%", transform: "translateX(-50%)" }}
                      >
                        <div className="container mx-auto px-4 py-6">
                          <h3 className="font-serif text-xl font-bold mb-4 border-b pb-2">{item.title}</h3>
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-2">
                            {item.submenu.map((subItem) => (
                              <Link
                                key={subItem.title}
                                href={subItem.href}
                                className="text-muted-foreground hover:text-foreground transition-colors py-1 hover:underline"
                              >
                                {subItem.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Hamburger menu for remaining categories */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hidden md:flex">
                    <Menu className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>More Categories</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {mainNavItems.slice(5).map((item) => (
                    <DropdownMenuItem key={item.title} asChild>
                      <Link href="#" className="w-full flex items-center justify-between">
                        <span>{item.title}</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <ThemeToggle />
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px] overflow-y-auto">
                  <div className="py-4">
                    <h2 className="font-serif text-xl font-bold mb-4">The Daily Summary</h2>
                    <div className="space-y-4">
                      <Accordion type="single" collapsible className="w-full">
                        {mainNavItems.map((section) => (
                          <AccordionItem key={section.title} value={section.title}>
                            <AccordionTrigger className="text-lg font-medium">{section.title}</AccordionTrigger>
                            <AccordionContent>
                              <div className="pl-4 space-y-1 border-l">
                                {section.submenu.map((item) => (
                                  <Link
                                    key={item.title}
                                    href={item.href}
                                    className="flex items-center py-1 text-muted-foreground hover:text-foreground"
                                  >
                                    <ChevronRight className="h-3 w-3 mr-1" />
                                    {item.title}
                                  </Link>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Top Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4 border-b">
          <div className="flex items-center gap-2 md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] overflow-y-auto">
                <div className="py-4">
                  <h2 className="font-serif text-xl font-bold mb-4">The Daily Summary</h2>
                  <div className="space-y-4">
                    <Accordion type="single" collapsible className="w-full">
                      {mainNavItems.map((section) => (
                        <AccordionItem key={section.title} value={section.title}>
                          <AccordionTrigger className="text-lg font-medium">{section.title}</AccordionTrigger>
                          <AccordionContent>
                            <div className="pl-4 space-y-1 border-l">
                              {section.submenu.map((item) => (
                                <Link
                                  key={item.title}
                                  href={item.href}
                                  className="flex items-center py-1 text-muted-foreground hover:text-foreground"
                                >
                                  <ChevronRight className="h-3 w-3 mr-1" />
                                  {item.title}
                                </Link>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            {mainNavItems.map((item) => (
              <div
                key={item.title}
                className="relative group"
                onMouseEnter={() => handleMouseEnter(item.title)}
                onMouseLeave={handleMouseLeave}
              >
                <button className="text-muted-foreground hover:text-foreground">{item.title}</button>
                {openSubmenu === item.title && (
                  <div
                    className="absolute left-0 w-full bg-background border-b shadow-lg z-50"
                    style={{ width: "100vw", left: "50%", transform: "translateX(-50%)" }}
                  >
                    <div className="container mx-auto px-4 py-6">
                      <h3 className="font-serif text-xl font-bold mb-4 border-b pb-2">{item.title}</h3>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-2">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.title}
                            href={subItem.href}
                            className="text-muted-foreground hover:text-foreground transition-colors py-1 hover:underline"
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Masthead */}
      <div className="container mx-auto px-4 py-6 text-center">
        <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight">The Daily Summary</h1>
        <div className="flex items-center justify-center gap-2 mt-2 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4" />
          <span>{currentDate}</span>
        </div>
      </div>

      {/* Secondary Navigation */}
      <div className="container mx-auto px-4 border-y py-2 hidden md:block">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6 text-sm">
            {secondaryNavItems.map((item) => (
              <div
                key={item.title}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.title)}
                onMouseLeave={handleMouseLeave}
              >
                <button className="text-muted-foreground hover:text-foreground">{item.title}</button>
                {openSubmenu === item.title && <NavSubmenu items={item.submenu} title={item.title} />}
              </div>
            ))}
          </div>
          <div className="relative w-64">
            <Input
              placeholder="Search articles..."
              className="h-8 text-sm pr-8"
              onClick={() => setIsSearchOpen(true)}
              readOnly
            />
            <Search className="h-4 w-4 absolute right-2 top-2 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Search Dialog */}
      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </header>
  )
}

