import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us | The Daily Summary",
  description: "Get in touch with The Daily Summary team for inquiries, feedback, or support.",
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-primary">Contact Us</h1>
        <p className="text-xl text-foreground/80 mb-12 max-w-3xl">
          We value your feedback and inquiries. Use the form below to get in touch with our team, or reach out through
          one of our other contact channels.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="bg-card/50 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-serif text-xl font-bold mb-2 text-primary">Email Us</h3>
                  <p className="text-foreground/80 mb-2">For general inquiries:</p>
                  <p className="text-primary font-medium">info@dailychronicle.com</p>
                  <p className="text-foreground/80 mt-4 mb-2">For news tips:</p>
                  <p className="text-primary font-medium">tips@dailychronicle.com</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-serif text-xl font-bold mb-2 text-primary">Call Us</h3>
                  <p className="text-foreground/80 mb-2">Main Office:</p>
                  <p className="text-primary font-medium">+1 (555) 123-4567</p>
                  <p className="text-foreground/80 mt-4 mb-2">Subscription Support:</p>
                  <p className="text-primary font-medium">+1 (555) 987-6543</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-serif text-xl font-bold mb-2 text-primary">Visit Us</h3>
                  <p className="text-foreground/80 mb-2">Headquarters:</p>
                  <p className="text-primary font-medium">
                    123 News Avenue
                    <br />
                    Metropolis, NY 10001
                    <br />
                    United States
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="pt-6">
                <h2 className="font-serif text-2xl font-bold text-primary mb-6">Send Us a Message</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground/80">
                        Full Name
                      </label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground/80">
                        Email Address
                      </label>
                      <Input id="email" type="email" placeholder="Your email" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-foreground/80">
                      Subject
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="subscription">Subscription Support</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="advertising">Advertising</SelectItem>
                        <SelectItem value="correction">Correction Request</SelectItem>
                        <SelectItem value="tip">News Tip</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground/80">
                      Message
                    </label>
                    <Textarea id="message" placeholder="Your message" rows={6} />
                  </div>

                  <Button type="submit" className="w-full md:w-auto">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardContent className="pt-6">
                <h2 className="font-serif text-2xl font-bold text-primary mb-6">Business Hours</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-foreground">Newsroom</h3>
                      <p className="text-foreground/80">24 hours, 7 days a week</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-foreground">Administrative Offices</h3>
                      <p className="text-foreground/80">Monday - Friday: 9:00 AM - 5:00 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-foreground">Customer Support</h3>
                      <p className="text-foreground/80">
                        Monday - Friday: 8:00 AM - 8:00 PM
                        <br />
                        Saturday - Sunday: 9:00 AM - 5:00 PM
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-border">
                  <h2 className="font-serif text-2xl font-bold text-primary mb-4">Press Contacts</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-foreground">Media Inquiries</h3>
                      <p className="text-primary">press@dailychronicle.com</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Public Relations</h3>
                      <p className="text-primary">pr@dailychronicle.com</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="bg-muted rounded-lg p-6 text-center">
          <h2 className="font-serif text-2xl font-bold text-primary mb-4">Regional Offices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {[
              {
                city: "Washington D.C.",
                address: "456 Capitol Street, Washington D.C. 20001",
                phone: "+1 (555) 234-5678",
              },
              {
                city: "Los Angeles",
                address: "789 Hollywood Blvd, Los Angeles, CA 90028",
                phone: "+1 (555) 345-6789",
              },
              {
                city: "Chicago",
                address: "321 Windy Avenue, Chicago, IL 60601",
                phone: "+1 (555) 456-7890",
              },
              {
                city: "London",
                address: "10 Fleet Street, London EC4Y 1AA, UK",
                phone: "+44 20 7123 4567",
              },
            ].map((office) => (
              <div key={office.city} className="text-left">
                <h3 className="font-serif font-bold text-primary">{office.city}</h3>
                <p className="text-foreground/80 text-sm mt-2">{office.address}</p>
                <p className="text-primary text-sm mt-1">{office.phone}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

