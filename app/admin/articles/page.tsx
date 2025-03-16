import { Button } from "@/components/ui/button"
import { ArticlesTable } from "@/components/admin/articles-table"
import { PlusIcon } from "lucide-react"
import Link from "next/link"

export default function ArticlesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Articles</h1>
        <Link href="/admin/articles/new">
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            New Article
          </Button>
        </Link>
      </div>

      <ArticlesTable />
    </div>
  )
}

