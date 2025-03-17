import type { Metadata } from "next"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Users, Briefcase, GraduationCap, MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "Careers | The Daily Summary",
  description: "Join our team at The Daily Summary and be part of shaping the future of journalism.",
}

export default function CareersPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-primary">Join Our Team</h1>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Be part of a dynamic team dedicated to delivering impactful journalism in the digital age.
          </p>
        </div>

        <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-12">
          <Image
            src="/thumbnail.webp?height=800&width=1600"
            alt="The Daily Summary team"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-8">
              <h2 className="font-serif text-3xl font-bold text-white mb-2">Shape the Future of Journalism</h2>
              <p className="text-white/90 max-w-2xl">
                At The Daily Summary, we're reimagining how news is created, delivered, and experienced.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: "Innovation",
              description: "We embrace new technologies and approaches to storytelling.",
              icon: <CheckCircle className="h-8 w-8 text-primary" />,
            },
            {
              title: "Collaboration",
              description: "Our diverse teams work together to create impactful journalism.",
              icon: <Users className="h-8 w-8 text-primary" />,
            },
            {
              title: "Growth",
              description: "We invest in your professional development and career advancement.",
              icon: <GraduationCap className="h-8 w-8 text-primary" />,
            },
          ].map((value) => (
            <Card key={value.title} className="bg-card/50 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  {value.icon}
                  <h3 className="font-serif text-xl font-bold mt-4 mb-2 text-primary">{value.title}</h3>
                  <p className="text-foreground/80">{value.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="font-serif text-3xl font-bold text-primary mb-8">Open Positions</h2>

          <Tabs defaultValue="editorial">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="editorial">Editorial</TabsTrigger>
              <TabsTrigger value="technology">Technology</TabsTrigger>
              <TabsTrigger value="business">Business</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
            </TabsList>

            <TabsContent value="editorial" className="space-y-6">
              {[
                {
                  title: "Senior Political Reporter",
                  location: "Washington D.C.",
                  type: "Full-time",
                  description:
                    "Cover national politics and policy developments with a focus on investigative reporting.",
                },
                {
                  title: "Technology Editor",
                  location: "San Francisco",
                  type: "Full-time",
                  description: "Lead our technology coverage, managing a team of reporters covering the tech industry.",
                },
                {
                  title: "Breaking News Reporter",
                  location: "New York",
                  type: "Full-time",
                  description: "Report on breaking news stories across various beats with speed and accuracy.",
                },
                {
                  title: "International Correspondent",
                  location: "London",
                  type: "Full-time",
                  description: "Report on major international news stories from our European bureau.",
                },
              ].map((job) => (
                <JobListing key={job.title} job={job} />
              ))}
            </TabsContent>

            <TabsContent value="technology" className="space-y-6">
              {[
                {
                  title: "Full Stack Developer",
                  location: "New York",
                  type: "Full-time",
                  description: "Build and maintain our digital platforms using modern web technologies.",
                },
                {
                  title: "Data Engineer",
                  location: "Remote",
                  type: "Full-time",
                  description:
                    "Design and implement data pipelines to support our journalism and business intelligence.",
                },
                {
                  title: "Product Manager",
                  location: "New York",
                  type: "Full-time",
                  description: "Lead product development for our digital subscription platforms.",
                },
                {
                  title: "DevOps Engineer",
                  location: "Remote",
                  type: "Full-time",
                  description: "Manage our cloud infrastructure and deployment pipelines.",
                },
              ].map((job) => (
                <JobListing key={job.title} job={job} />
              ))}
            </TabsContent>

            <TabsContent value="business" className="space-y-6">
              {[
                {
                  title: "Digital Advertising Manager",
                  location: "New York",
                  type: "Full-time",
                  description: "Develop and execute digital advertising strategies for our clients.",
                },
                {
                  title: "Subscription Growth Analyst",
                  location: "New York",
                  type: "Full-time",
                  description:
                    "Analyze subscription data and develop strategies to increase subscriber acquisition and retention.",
                },
                {
                  title: "Marketing Coordinator",
                  location: "Chicago",
                  type: "Full-time",
                  description: "Support marketing campaigns across digital and traditional channels.",
                },
                {
                  title: "Business Development Associate",
                  location: "Los Angeles",
                  type: "Full-time",
                  description: "Identify and develop new business opportunities and partnerships.",
                },
              ].map((job) => (
                <JobListing key={job.title} job={job} />
              ))}
            </TabsContent>

            <TabsContent value="design" className="space-y-6">
              {[
                {
                  title: "UX/UI Designer",
                  location: "New York",
                  type: "Full-time",
                  description: "Design intuitive and engaging user experiences for our digital platforms.",
                },
                {
                  title: "Visual Journalist",
                  location: "New York",
                  type: "Full-time",
                  description:
                    "Create compelling data visualizations and interactive graphics to enhance our storytelling.",
                },
                {
                  title: "Motion Graphics Designer",
                  location: "Los Angeles",
                  type: "Full-time",
                  description: "Create animated content for our digital and social media platforms.",
                },
                {
                  title: "Art Director",
                  location: "New York",
                  type: "Full-time",
                  description: "Lead the visual direction of our print and digital publications.",
                },
              ].map((job) => (
                <JobListing key={job.title} job={job} />
              ))}
            </TabsContent>
          </Tabs>
        </div>

        <div className="mb-16">
          <h2 className="font-serif text-3xl font-bold text-primary mb-8">Benefits & Perks</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-serif text-xl font-bold mb-4 text-primary">Health & Wellness</h3>
                <ul className="space-y-3">
                  {[
                    "Comprehensive health, dental, and vision insurance",
                    "Mental health resources and support",
                    "Wellness stipend for gym memberships or fitness classes",
                    "Generous paid time off and sick leave",
                  ].map((benefit) => (
                    <li key={benefit} className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/90">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-serif text-xl font-bold mb-4 text-primary">Professional Growth</h3>
                <ul className="space-y-3">
                  {[
                    "Tuition reimbursement for relevant courses and degrees",
                    "Professional development budget for conferences and training",
                    "Mentorship programs and career coaching",
                    "Internal mobility and advancement opportunities",
                  ].map((benefit) => (
                    <li key={benefit} className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/90">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-serif text-xl font-bold mb-4 text-primary">Work-Life Balance</h3>
                <ul className="space-y-3">
                  {[
                    "Flexible work arrangements and remote options",
                    "Parental leave for all parents",
                    "Sabbatical program for long-term employees",
                    "Summer Fridays and company holidays",
                  ].map((benefit) => (
                    <li key={benefit} className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/90">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-serif text-xl font-bold mb-4 text-primary">Additional Perks</h3>
                <ul className="space-y-3">
                  {[
                    "401(k) matching program",
                    "Employee stock purchase plan",
                    "Free digital and print subscription",
                    "Company-wide events and team building activities",
                  ].map((benefit) => (
                    <li key={benefit} className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/90">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="bg-muted rounded-lg p-8 text-center mb-16">
          <h2 className="font-serif text-3xl font-bold text-primary mb-4">Internship Program</h2>
          <p className="text-foreground/80 max-w-3xl mx-auto mb-6">
            Our internship program offers students and recent graduates hands-on experience in journalism, technology,
            business, and design. Interns work alongside our talented staff on meaningful projects.
          </p>
          <Button>Learn More About Internships</Button>
        </div>

        <div className="mb-16">
          <h2 className="font-serif text-3xl font-bold text-primary mb-8">Our Hiring Process</h2>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20" />

            {[
              {
                step: 1,
                title: "Application Review",
                description: "Our recruiting team reviews your application and resume.",
              },
              {
                step: 2,
                title: "Initial Interview",
                description:
                  "A phone or video interview with a recruiter to discuss your background and interest in the role.",
              },
              {
                step: 3,
                title: "Skills Assessment",
                description:
                  "Depending on the role, you may be asked to complete a skills assessment or portfolio review.",
              },
              {
                step: 4,
                title: "Team Interviews",
                description: "Meet with potential team members and managers to discuss the role in depth.",
              },
              {
                step: 5,
                title: "Final Decision",
                description: "We'll make a decision and extend an offer to the selected candidate.",
              },
            ].map((step) => (
              <div key={step.step} className="relative pl-16 pb-12">
                <div className="absolute left-6 -translate-x-1/2 bg-background border-4 border-primary text-primary rounded-full h-8 w-8 flex items-center justify-center font-bold">
                  {step.step}
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-primary mb-2">{step.title}</h3>
                  <p className="text-foreground/80">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-primary/5 rounded-lg p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl font-bold text-primary mb-4">Diversity & Inclusion</h2>
            <p className="text-foreground/80 max-w-3xl mx-auto">
              The Daily Summary is committed to building a diverse and inclusive workplace. We believe that bringing
              together different perspectives strengthens our journalism and our organization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Equal Opportunity",
                description:
                  "We are an equal opportunity employer and do not discriminate based on race, color, religion, gender, sexual orientation, gender identity, national origin, age, disability, or any other protected characteristic.",
              },
              {
                title: "Employee Resource Groups",
                description:
                  "We support various employee resource groups that foster community, provide mentorship, and advocate for inclusive policies and practices.",
              },
              {
                title: "Inclusive Recruitment",
                description:
                  "We actively work to ensure our recruitment processes are accessible and reach candidates from diverse backgrounds and experiences.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-background rounded-lg p-6">
                <h3 className="font-serif text-xl font-bold text-primary mb-2">{item.title}</h3>
                <p className="text-foreground/80">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold text-primary mb-6">Ready to Join Us?</h2>
          <p className="text-foreground/80 max-w-2xl mx-auto mb-8">
            Explore our current openings and find the role that matches your skills and passion.
          </p>
          <Button size="lg" className="px-8">
            View All Openings
          </Button>
        </div>
      </div>
    </div>
  )
}

interface JobProps {
  job: {
    title: string
    location: string
    type: string
    description: string
  }
}

function JobListing({ job }: JobProps) {
  return (
    <Card className="hover:border-primary/50 transition-colors">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-xl font-bold text-primary">{job.title}</h3>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <Badge variant="outline" className="text-foreground/70">
                <Briefcase className="h-3 w-3 mr-1" />
                {job.type}
              </Badge>
              <Badge variant="outline" className="text-foreground/70">
                <MapPin className="h-3 w-3 mr-1" />
                {job.location}
              </Badge>
            </div>
            <p className="text-foreground/80 mt-3">{job.description}</p>
          </div>
          <Button className="md:self-start flex-shrink-0">Apply Now</Button>
        </div>
      </CardContent>
    </Card>
  )
}

