import Link from "next/link"
import { Advertisement } from "@/components/advertisement"

export function MoreStories() {
  const articles = [
    {
      id: 1,
      title: "New Study Reveals Benefits of Mediterranean Diet",
      author: "Emma Thompson",
    },
    {
      id: 2,
      title: "Local Artist's Exhibition Breaks Attendance Records",
      author: "David Rodriguez",
    },
    {
      id: 3,
      title: "Sports Team Announces Major Stadium Renovation Plans",
      author: "Jennifer Lee",
    },
    {
      id: 4,
      title: "Travel Industry Sees Surge in Sustainable Tourism Options",
      author: "Marcus Johnson",
    },
    {
      id: 5,
      title: "New Technology Promises to Revolutionize Home Energy Use",
      author: "Sarah Chen",
    },
    {
      id: 6,
      title: "Historic Building Restoration Project Receives Major Funding",
      author: "Michael Davis",
    },
    {
      id: 7,
      title: "Film Festival Announces Lineup of Independent Productions",
      author: "Jessica Wilson",
    },
    {
      id: 8,
      title: "Research Team Discovers New Species in Remote Rainforest",
      author: "Robert Thompson",
    },
  ]

  return (
    <div className="mt-12">
      <h2 className="font-serif text-2xl font-bold mb-6 pb-2 border-b">More Stories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {articles.map((article, index) => (
          <>
            <article key={article.id} className="space-y-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-md">
                <img
                  src={`/thumbnail.webp?height=300&width=400&text=Article ${article.id}`}
                  alt={article.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold leading-tight">
                  <Link href="#">{article.title}</Link>
                </h3>
                <p className="text-xs text-muted-foreground mt-2">By {article.author}</p>
              </div>
            </article>

            {/* Insert ad after every 4 articles */}
            {(index + 1) % 4 === 0 && index < articles.length - 1 && (
              <div className="col-span-full my-6">
                <Advertisement size="banner" className="mx-auto" />
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  )
}

