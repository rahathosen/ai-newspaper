import type { Metadata } from "next"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "About Us | The Daily Summary",
  description: "Learn about The Daily Summary's history, mission, and the team behind our journalism.",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-primary">About The Daily Summary</h1>

        <div className="relative w-full h-[300px] md:h-[400px] mb-8 rounded-lg overflow-hidden">
          <Image
            src="/thumbnail.jpg?height=800&width=1200"
            alt="The Daily Summary headquarters"
            fill
            className="object-cover"
          />
        </div>

        <div className="prose prose-lg max-w-none">
          <h2 className="font-serif text-2xl font-bold text-primary mt-8 mb-4">Our Mission</h2>
          <p className="text-foreground/90 mb-6">
            Founded in 1982, The Daily Summary is committed to delivering accurate, unbiased, and insightful
            journalism to our readers. We believe in the power of information to enlighten, educate, and empower
            communities. Our mission is to uphold the highest standards of journalistic integrity while adapting to the
            evolving media landscape.
          </p>

          <h2 className="font-serif text-2xl font-bold text-primary mt-8 mb-4">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            <Card className="bg-card/50 border-primary/20">
              <CardContent className="pt-6">
                <h3 className="font-serif text-xl font-bold mb-2 text-primary">Truth</h3>
                <p className="text-foreground/80">
                  We are committed to factual reporting and transparency in our journalistic process.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-primary/20">
              <CardContent className="pt-6">
                <h3 className="font-serif text-xl font-bold mb-2 text-primary">Independence</h3>
                <p className="text-foreground/80">
                  We maintain editorial independence and resist outside influence in our reporting.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-primary/20">
              <CardContent className="pt-6">
                <h3 className="font-serif text-xl font-bold mb-2 text-primary">Innovation</h3>
                <p className="text-foreground/80">
                  We embrace new technologies and formats to better serve our readers in the digital age.
                </p>
              </CardContent>
            </Card>
          </div>

          <h2 className="font-serif text-2xl font-bold text-primary mt-8 mb-4">Our History</h2>
          <p className="text-foreground/90 mb-6">
            The Daily Summary began as a small local newspaper and has grown into a respected national publication.
            Through decades of political changes, technological revolutions, and social transformations, we have
            remained a constant source of reliable information for our readers.
          </p>
          <p className="text-foreground/90 mb-6">
            In 2005, we launched our digital platform, expanding our reach beyond print media. Today, The Daily
            Chronicle continues to evolve, incorporating multimedia storytelling, data journalism, and interactive
            features while maintaining our commitment to traditional journalistic values.
          </p>

          <h2 className="font-serif text-2xl font-bold text-primary mt-8 mb-4">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
            {[
              {
                name: "Alexandra Chen",
                title: "Editor-in-Chief",
                bio: "With over 25 years of experience in journalism, Alexandra leads our editorial vision and strategy.",
                image: "/thumbnail.jpg?height=400&width=400",
              },
              {
                name: "Marcus Johnson",
                title: "Managing Editor",
                bio: "Marcus oversees our daily operations and ensures the highest standards of reporting across all sections.",
                image: "/thumbnail.jpg?height=400&width=400",
              },
              {
                name: "Sophia Rodriguez",
                title: "Digital Director",
                bio: "Sophia leads our digital transformation and multimedia initiatives.",
                image: "/thumbnail.jpg?height=400&width=400",
              },
              {
                name: "David Kim",
                title: "Chief Technology Officer",
                bio: "David drives our technological innovation and digital infrastructure.",
                image: "/thumbnail.jpg?height=400&width=400",
              },
            ].map((person) => (
              <div key={person.name} className="flex items-start space-x-4">
                <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                  <Image src={person.image || "/thumbnail.jpg"} alt={person.name} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-primary">{person.name}</h3>
                  <p className="text-primary/70 font-medium mb-2">{person.title}</p>
                  <p className="text-foreground/80 text-sm">{person.bio}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="font-serif text-2xl font-bold text-primary mt-8 mb-4">Awards & Recognition</h2>
          <p className="text-foreground/90 mb-6">
            The Daily Summary has been recognized with numerous awards for excellence in journalism, including:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2 text-foreground/90">
            <li>National Journalism Award for Investigative Reporting (2022)</li>
            <li>Excellence in Digital Innovation Award (2021)</li>
            <li>Best News Website Design (2020)</li>
            <li>Pulitzer Prize for Public Service (2018)</li>
            <li>Global Media Award for Outstanding Coverage (2016)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

