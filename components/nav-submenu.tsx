"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

interface NavSubmenuProps {
  title: string
  items: {
    title: string
    href: string
  }[]
}

export function NavSubmenu({ title, items }: NavSubmenuProps) {
  const submenuRef = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      ref={submenuRef}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="fixed left-0 w-full bg-background border-b shadow-lg"
      style={{
        top: "100%",
        position: "absolute",
        zIndex: 1000,
      }}
    >
      <div className="container mx-auto px-4 py-6">
        <h3 className="font-serif text-xl font-bold mb-4 border-b pb-2">{title}</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-2">
          {items.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="text-muted-foreground hover:text-foreground transition-colors py-1 hover:underline"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

