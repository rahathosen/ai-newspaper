"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Mail, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface NewsletterPopupProps {
  delay?: number // Delay in milliseconds before showing popup
  cookieExpiration?: number // Days until the cookie expires
}

export function NewsletterPopup({ delay = 10000, cookieExpiration = 7 }: NewsletterPopupProps) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [categories, setCategories] = useState({
    politics: false,
    business: true,
    technology: false,
    sports: false,
    health: false,
    entertainment: false,
  })

  useEffect(() => {
    // Check if user has already dismissed or subscribed
    const hasInteracted = localStorage.getItem("newsletter_interaction")

    if (!hasInteracted) {
      const timer = setTimeout(() => {
        setOpen(true)
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [delay])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, you would send this data to your API
    console.log("Subscribing email:", email)
    console.log("Selected categories:", categories)

    // Set subscribed state to show success message
    setSubscribed(true)

    // Store in localStorage to prevent showing again
    localStorage.setItem("newsletter_interaction", "subscribed")

    // Close after 3 seconds
    setTimeout(() => {
      setOpen(false)
    }, 3000)
  }

  const handleDismiss = () => {
    setOpen(false)

    // Store in localStorage to prevent showing again for some time
    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() + cookieExpiration)
    localStorage.setItem("newsletter_interaction", expirationDate.toISOString())
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          {!subscribed ? (
            <>
              <DialogTitle className="text-2xl font-serif">Stay Informed with Our Newsletter</DialogTitle>
              <DialogDescription>
                Get the latest news and updates delivered directly to your inbox. No spam, unsubscribe anytime.
              </DialogDescription>
            </>
          ) : (
            <DialogTitle className="text-2xl font-serif text-center">Thank You for Subscribing!</DialogTitle>
          )}
        </DialogHeader>

        {!subscribed ? (
          <form onSubmit={handleSubscribe}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Select your interests</Label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(categories).map(([key, value]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox
                        id={key}
                        checked={value}
                        onCheckedChange={(checked) => setCategories({ ...categories, [key]: !!checked })}
                      />
                      <Label htmlFor={key} className="capitalize">
                        {key}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" type="button" onClick={handleDismiss}>
                Remind me later
              </Button>
              <Button type="submit">Subscribe</Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="py-6 flex flex-col items-center text-center">
            <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
            <p className="mb-4">
              You've been successfully subscribed to our newsletter. Watch your inbox for the latest news and updates!
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

