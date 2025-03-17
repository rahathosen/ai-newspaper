import type { Metadata } from "next"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Users, BarChart, Globe, Target } from "lucide-react"

export const metadata: Metadata = {
  title: "Advertise With Us | The Daily Summary",
  description: "Reach our engaged audience through advertising opportunities with The Daily Summary.",
}

export default function AdvertisePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-primary">Advertise With Us</h1>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Connect with our engaged audience through strategic advertising solutions tailored to your brand.
          </p>
        </div>

        <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-12">
          <Image
            src="/placeholder.svg?height=800&width=1600"
            alt="Advertising with The Daily Summary"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-8">
              <h2 className="font-serif text-3xl font-bold text-white mb-2">Reach Millions of Engaged Readers</h2>
              <p className="text-white/90 max-w-2xl">
                Our audience is educated, affluent, and engaged with current events and premium content.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="font-serif text-3xl font-bold text-primary mb-8">Our Audience</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-card/50 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Users className="h-12 w-12 text-primary" />
                  <h3 className="font-serif text-2xl font-bold mt-4 mb-2 text-primary">5.2M+</h3>
                  <p className="text-foreground/80">Monthly Unique Visitors</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Globe className="h-12 w-12 text-primary" />
                  <h3 className="font-serif text-2xl font-bold mt-4 mb-2 text-primary">12M+</h3>
                  <p className="text-foreground/80">Monthly Page Views</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <BarChart className="h-12 w-12 text-primary" />
                  <h3 className="font-serif text-2xl font-bold mt-4 mb-2 text-primary">3.5M+</h3>
                  <p className="text-foreground/80">Social Media Followers</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-serif text-xl font-bold text-primary mb-4">Demographics</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Age:</span>
                    <span className="text-foreground/80 ml-2">65% between 25-54 years old</span>
                  </div>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Education:</span>
                    <span className="text-foreground/80 ml-2">78% college educated</span>
                  </div>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Income:</span>
                    <span className="text-foreground/80 ml-2">Average household income of $120,000+</span>
                  </div>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Location:</span>
                    <span className="text-foreground/80 ml-2">60% urban, 30% suburban, 10% rural</span>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-xl font-bold text-primary mb-4">Engagement</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Average Time on Site:</span>
                    <span className="text-foreground/80 ml-2">4.5 minutes per session</span>
                  </div>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Return Rate:</span>
                    <span className="text-foreground/80 ml-2">65% are returning visitors</span>
                  </div>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Subscription:</span>
                    <span className="text-foreground/80 ml-2">1.2M+ paid digital subscribers</span>
                  </div>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Newsletter Subscribers:</span>
                    <span className="text-foreground/80 ml-2">2.5M+ across all newsletters</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="font-serif text-3xl font-bold text-primary mb-8">Advertising Solutions</h2>

          <Tabs defaultValue="digital">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="digital">Digital</TabsTrigger>
              <TabsTrigger value="print">Print</TabsTrigger>
              <TabsTrigger value="sponsored">Sponsored</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>

            <TabsContent value="digital" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Display Advertising",
                    description: "Premium display ad placements across our website and mobile app.",
                    features: [
                      "Standard IAB sizes available",
                      "Targeted by section, geography, or demographics",
                      "Viewability guaranteed above industry standards",
                      "Rich media and video options",
                    ],
                  },
                  {
                    title: "Newsletter Advertising",
                    description: "Reach our engaged subscribers directly in their inbox.",
                    features: [
                      "15+ specialized newsletters",
                      "Average open rate of 28%",
                      "Native and display options available",
                      "Exclusive sponsorship opportunities",
                    ],
                  },
                  {
                    title: "Video Advertising",
                    description: "Pre-roll, mid-roll, and post-roll video ad placements.",
                    features: [
                      "High-quality video content environment",
                      "Skippable and non-skippable options",
                      "Custom video production available",
                      "YouTube channel partnership opportunities",
                    ],
                  },
                  {
                    title: "Podcast Advertising",
                    description: "Sponsor our popular podcasts with host-read or produced ads.",
                    features: [
                      "10+ podcasts across news, business, and culture",
                      "Host-read ads for authentic delivery",
                      "Pre-roll, mid-roll, and post-roll placements",
                      "Detailed performance metrics",
                    ],
                  },
                ].map((solution) => (
                  <Card key={solution.title}>
                    <CardContent className="p-6">
                      <h3 className="font-serif text-xl font-bold text-primary mb-2">{solution.title}</h3>
                      <p className="text-foreground/80 mb-4">{solution.description}</p>
                      <h4 className="font-medium text-foreground mb-2">Features:</h4>
                      <ul className="space-y-2">
                        {solution.features.map((feature) => (
                          <li key={feature} className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-foreground/80 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="print" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Full-Page Ads",
                    description: "Make a bold statement with a full-page advertisement in our print edition.",
                    features: [
                      "Premium positioning options",
                      "Full color or black and white",
                      "Special section opportunities",
                      "Combined digital packages available",
                    ],
                  },
                  {
                    title: "Classified Advertising",
                    description: "Targeted classified ads in relevant sections.",
                    features: [
                      "Employment, real estate, and services categories",
                      "Weekly and monthly booking options",
                      "Print and digital combo packages",
                      "Design assistance available",
                    ],
                  },
                  {
                    title: "Magazine Inserts",
                    description: "Custom magazine inserts distributed with our Sunday edition.",
                    features: [
                      "High-quality glossy printing",
                      "Custom content creation available",
                      "Targeted distribution options",
                      "Extended shelf life",
                    ],
                  },
                  {
                    title: "Special Sections",
                    description: "Advertise in our themed special sections throughout the year.",
                    features: [
                      "Holiday shopping guides",
                      "Education and career specials",
                      "Home and garden features",
                      "Travel and leisure sections",
                    ],
                  },
                ].map((solution) => (
                  <Card key={solution.title}>
                    <CardContent className="p-6">
                      <h3 className="font-serif text-xl font-bold text-primary mb-2">{solution.title}</h3>
                      <p className="text-foreground/80 mb-4">{solution.description}</p>
                      <h4 className="font-medium text-foreground mb-2">Features:</h4>
                      <ul className="space-y-2">
                        {solution.features.map((feature) => (
                          <li key={feature} className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-foreground/80 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="sponsored" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Sponsored Content",
                    description: "High-quality branded content created by our studio team.",
                    features: [
                      "Expert storytelling from our content studio",
                      "Distribution across our platforms",
                      "Social media amplification",
                      "Performance reporting",
                    ],
                  },
                  {
                    title: "Brand Partnerships",
                    description: "Long-term strategic partnerships with integrated campaigns.",
                    features: [
                      "Custom content series",
                      "Multi-platform exposure",
                      "Co-branded events and activations",
                      "Exclusive category partnerships",
                    ],
                  },
                  {
                    title: "Interactive Experiences",
                    description: "Engaging interactive content experiences for your brand.",
                    features: [
                      "Quizzes and assessments",
                      "Interactive infographics",
                      "Calculators and tools",
                      "Immersive storytelling",
                    ],
                  },
                  {
                    title: "Email Courses",
                    description: "Sponsored email courses on relevant topics for our audience.",
                    features: [
                      "Multi-day educational content",
                      "Expert contributors",
                      "Lead generation opportunities",
                      "Co-branded with your organization",
                    ],
                  },
                ].map((solution) => (
                  <Card key={solution.title}>
                    <CardContent className="p-6">
                      <h3 className="font-serif text-xl font-bold text-primary mb-2">{solution.title}</h3>
                      <p className="text-foreground/80 mb-4">{solution.description}</p>
                      <h4 className="font-medium text-foreground mb-2">Features:</h4>
                      <ul className="space-y-2">
                        {solution.features.map((feature) => (
                          <li key={feature} className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-foreground/80 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="events" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Conference Sponsorships",
                    description: "Sponsor our industry-leading conferences and events.",
                    features: [
                      "Speaking opportunities",
                      "Branded exhibition space",
                      "Attendee list access",
                      "Digital promotion before and after",
                    ],
                  },
                  {
                    title: "Webinar Sponsorships",
                    description: "Sponsor our expert webinars on trending topics.",
                    features: [
                      "Thought leadership positioning",
                      "Lead generation",
                      "On-demand access after live event",
                      "Co-branding opportunities",
                    ],
                  },
                  {
                    title: "Custom Events",
                    description: "Partner with us to create custom events for your target audience.",
                    features: [
                      "Tailored to your marketing objectives",
                      "Full event management",
                      "Content creation and speaker recruitment",
                      "Multi-channel promotion",
                    ],
                  },
                  {
                    title: "Virtual Summits",
                    description: "Sponsor our virtual summits reaching global audiences.",
                    features: [
                      "Broader reach than in-person events",
                      "Interactive networking opportunities",
                      "Digital booths and resources",
                      "Extended engagement period",
                    ],
                  },
                ].map((solution) => (
                  <Card key={solution.title}>
                    <CardContent className="p-6">
                      <h3 className="font-serif text-xl font-bold text-primary mb-2">{solution.title}</h3>
                      <p className="text-foreground/80 mb-4">{solution.description}</p>
                      <h4 className="font-medium text-foreground mb-2">Features:</h4>
                      <ul className="space-y-2">
                        {solution.features.map((feature) => (
                          <li key={feature} className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-foreground/80 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="mb-16">
          <h2 className="font-serif text-3xl font-bold text-primary mb-8">Case Studies</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Financial Services Leader",
                description:
                  "A major financial institution partnered with us on a content series about personal finance, resulting in 45,000+ engaged readers and a 23% increase in brand consideration.",
                image: "/placeholder.svg?height=600&width=800",
              },
              {
                title: "Technology Innovator",
                description:
                  "A leading tech company sponsored our annual innovation summit, generating 3,500+ qualified leads and establishing thought leadership in their industry vertical.",
                image: "/placeholder.svg?height=600&width=800",
              },
              {
                title: "Luxury Automotive Brand",
                description:
                  "An interactive sponsored content campaign for a luxury car manufacturer drove 12,000+ high-intent visitors to their website and contributed to a 15% lift in test drives.",
                image: "/placeholder.svg?height=600&width=800",
              },
              {
                title: "Healthcare Provider",
                description:
                  "A regional healthcare network's print and digital campaign reached 500,000+ readers in their target market, increasing appointment bookings by 18%.",
                image: "/placeholder.svg?height=600&width=800",
              },
            ].map((study) => (
              <Card key={study.title} className="overflow-hidden">
                <div className="relative h-48">
                  <Image src={study.image || "/placeholder.svg"} alt={study.title} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-serif text-xl font-bold text-primary mb-2">{study.title}</h3>
                  <p className="text-foreground/80">{study.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="bg-primary/5 rounded-lg p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl font-bold text-primary mb-4">Our Approach</h2>
            <p className="text-foreground/80 max-w-3xl mx-auto">
              We work closely with our advertising partners to develop strategic campaigns that deliver results while
              respecting our audience's experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                title: "Consultation",
                description: "We start by understanding your business objectives and target audience.",
                icon: <Users className="h-8 w-8 text-primary" />,
              },
              {
                title: "Strategy",
                description: "Our team develops a customized advertising strategy aligned with your goals.",
                icon: <Target className="h-8 w-8 text-primary" />,
              },
              {
                title: "Execution",
                description: "We deliver your campaign across our platforms with premium placement and production.",
                icon: <CheckCircle className="h-8 w-8 text-primary" />,
              },
              {
                title: "Reporting",
                description: "Detailed analytics and insights help measure performance and optimize results.",
                icon: <BarChart className="h-8 w-8 text-primary" />,
              },
            ].map((step) => (
              <div key={step.title} className="bg-background rounded-lg p-6 text-center">
                <div className="flex justify-center mb-4">{step.icon}</div>
                <h3 className="font-serif text-xl font-bold text-primary mb-2">{step.title}</h3>
                <p className="text-foreground/80">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl font-bold text-primary mb-6">Ready to Get Started?</h2>
          <p className="text-foreground/80 max-w-2xl mx-auto mb-8">
            Contact our advertising team to discuss how we can help you reach your marketing goals.
          </p>
          <Button size="lg" className="px-8">
            Request Media Kit
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-serif text-xl font-bold text-primary mb-4">Digital Advertising</h3>
              <p className="text-foreground/80 mb-4">
                For inquiries about website, newsletter, and digital advertising opportunities.
              </p>
              <p className="text-primary font-medium">digital@dailychronicle.com</p>
              <p className="text-primary font-medium">+1 (555) 123-4567</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-serif text-xl font-bold text-primary mb-4">Print Advertising</h3>
              <p className="text-foreground/80 mb-4">
                For inquiries about newspaper and magazine advertising opportunities.
              </p>
              <p className="text-primary font-medium">print@dailychronicle.com</p>
              <p className="text-primary font-medium">+1 (555) 234-5678</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-serif text-xl font-bold text-primary mb-4">Partnerships & Events</h3>
              <p className="text-foreground/80 mb-4">
                For inquiries about sponsored content, events, and strategic partnerships.
              </p>
              <p className="text-primary font-medium">partnerships@dailychronicle.com</p>
              <p className="text-primary font-medium">+1 (555) 345-6789</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

