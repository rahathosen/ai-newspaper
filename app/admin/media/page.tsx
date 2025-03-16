import { MediaLibrary } from "@/components/admin/media-library"

export default function MediaPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
      </div>

      <MediaLibrary />
    </div>
  )
}

