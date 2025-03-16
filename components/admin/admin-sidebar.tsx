"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart3, FileText, Home, LayoutGrid, LogOut, Settings, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState } from "react"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: Home,
  },
  {
    title: "Content",
    icon: FileText,
    children: [
      {
        title: "Articles",
        href: "/admin/articles",
      },
      {
        title: "Categories",
        href: "/admin/categories",
      },
      {
        title: "Subcategories",
        href: "/admin/categories/subcategories",
      },
      {
        title: "Media",
        href: "/admin/media",
      },
      {
        title: "Comments",
        href: "/admin/comments",
      },
    ],
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [openSections, setOpenSections] = useState<string[]>([])

  const toggleSection = (title: string) => {
    if (openSections.includes(title)) {
      setOpenSections(openSections.filter((section) => section !== title))
    } else {
      setOpenSections([...openSections, title])
    }
  }

  // Check if a section should be open based on current path
  const isSectionActive = (children: { href: string }[]) => {
    return children.some((child) => pathname === child.href || pathname.startsWith(`${child.href}/`))
  }

  // Initialize open sections based on active path
  useState(() => {
    sidebarItems.forEach((item) => {
      if (item.children && isSectionActive(item.children)) {
        if (!openSections.includes(item.title)) {
          setOpenSections((prev) => [...prev, item.title])
        }
      }
    })
  })

  return (
    <div className="hidden md:flex flex-col w-64 border-r bg-card h-screen">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <LayoutGrid className="h-6 w-6" />
          <span className="font-serif text-xl font-bold">Admin Panel</span>
        </Link>
      </div>

      <ScrollArea className="flex-1 px-4">
        <nav className="flex flex-col gap-1">
          {sidebarItems.map((item) =>
            item.children ? (
              <Collapsible
                key={item.title}
                open={openSections.includes(item.title) || (item.children && isSectionActive(item.children))}
                onOpenChange={() => toggleSection(item.title)}
              >
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between">
                    <div className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      {item.title}
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 transition-transform duration-200"
                      style={{
                        transform: openSections.includes(item.title) ? "rotate(-180deg)" : "rotate(0deg)",
                      }}
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-6 space-y-1 pt-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        pathname === child.href || pathname.startsWith(`${child.href}/`)
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted",
                      )}
                    >
                      {child.title}
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            ),
          )}
        </nav>
      </ScrollArea>

      <div className="p-4 mt-auto border-t">
        <Link
          href="/admin/logout"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Link>
      </div>
    </div>
  )
}

