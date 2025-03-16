import Link from "next/link"
import { Advertisement } from "@/components/advertisement"

export function Footer() {
  return (
    <footer className="bg-muted mt-12 py-12">
      <div className="container mx-auto px-4">
        {/* Ad before footer content */}
        <div className="mb-8">
          <Advertisement size="leaderboard" className="mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-serif text-lg font-bold mb-4">The Daily Chronicle</h4>
            <p className="text-sm text-muted-foreground">
              Delivering trusted journalism and insightful analysis since 1982.
            </p>
          </div>
          <FooterLinks
            title="Sections"
            links={[
              { label: "Home", href: "#" },
              { label: "World", href: "#" },
              { label: "Politics", href: "#" },
              { label: "Business", href: "#" },
              { label: "Technology", href: "#" },
            ]}
          />
          <FooterLinks
            title="Company"
            links={[
              { label: "About Us", href: "/about" },
              { label: "Contact", href: "/contact" },
              { label: "Careers", href: "/careers" },
              { label: "Advertise", href: "/advertise" },
            ]}
          />
          <FooterLinks
            title="Legal"
            links={[
              { label: "Terms of Service", href: "/terms" },
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Cookie Policy", href: "/cookies" },
            ]}
          />
        </div>
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} The Daily Chronicle. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

interface FooterLinksProps {
  title: string
  links: {
    label: string
    href: string
  }[]
}

function FooterLinks({ title, links }: FooterLinksProps) {
  return (
    <div>
      <h5 className="font-medium mb-4">{title}</h5>
      <ul className="space-y-2 text-sm">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="text-muted-foreground hover:text-foreground">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

