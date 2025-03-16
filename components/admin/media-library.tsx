"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Grid2X2,
  List,
  MoreHorizontal,
  Search,
  Upload,
  ImageIcon,
  FileText,
  Film,
  Music,
  Edit,
  Trash,
  Copy,
  Eye,
} from "lucide-react"

// Sample media items
const mediaItems = [
  {
    id: "1",
    type: "image",
    title: "Climate Summit Photo",
    url: "/placeholder.svg?height=600&width=1200&text=Climate+Summit",
    size: "245 KB",
    dimensions: "1200 x 600",
    uploadedBy: "Sarah Johnson",
    uploadedAt: "Mar 15, 2025",
  },
  {
    id: "2",
    type: "image",
    title: "Tech Conference",
    url: "/placeholder.svg?height=600&width=1200&text=Tech+Conference",
    size: "320 KB",
    dimensions: "1200 x 600",
    uploadedBy: "Michael Chen",
    uploadedAt: "Mar 14, 2025",
  },
  {
    id: "3",
    type: "image",
    title: "Business Meeting",
    url: "/placeholder.svg?height=600&width=1200&text=Business+Meeting",
    size: "180 KB",
    dimensions: "1200 x 600",
    uploadedBy: "Robert Williams",
    uploadedAt: "Mar 13, 2025",
  },
  {
    id: "4",
    type: "document",
    title: "Press Release.pdf",
    url: "#",
    size: "1.2 MB",
    dimensions: "N/A",
    uploadedBy: "Emma Thompson",
    uploadedAt: "Mar 12, 2025",
  },
  {
    id: "5",
    type: "video",
    title: "Interview Clip.mp4",
    url: "#",
    size: "24.5 MB",
    dimensions: "1920 x 1080",
    uploadedBy: "David Wilson",
    uploadedAt: "Mar 11, 2025",
  },
  {
    id: "6",
    type: "audio",
    title: "Podcast Episode.mp3",
    url: "#",
    size: "18.3 MB",
    dimensions: "N/A",
    uploadedBy: "Jessica Lee",
    uploadedAt: "Mar 10, 2025",
  },
]

export function MediaLibrary() {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [mediaTypeFilter, setMediaTypeFilter] = useState("all")
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)

  const toggleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(filteredItems.map((item) => item.id))
    }
  }

  const toggleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  // Filter media items based on search query and media type
  const filteredItems = mediaItems.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = mediaTypeFilter === "all" || item.type === mediaTypeFilter

    return matchesSearch && matchesType
  })

  const getIconForType = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-4 w-4" />
      case "document":
        return <FileText className="h-4 w-4" />
      case "video":
        return <Film className="h-4 w-4" />
      case "audio":
        return <Music className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-end sm:items-center justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search media..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Select value={mediaTypeFilter} onValueChange={setMediaTypeFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Media Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="image">Images</SelectItem>
              <SelectItem value="document">Documents</SelectItem>
              <SelectItem value="video">Videos</SelectItem>
              <SelectItem value="audio">Audio</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              className="h-8 w-8 rounded-none rounded-l-md"
              onClick={() => setViewMode("grid")}
            >
              <Grid2X2 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              className="h-8 w-8 rounded-none rounded-r-md"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Media</DialogTitle>
                <DialogDescription>
                  Upload images, documents, videos, or audio files to your media library.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground text-center">
                    Drag and drop files here, or click to select files
                  </p>
                  <Button variant="outline" className="mt-4">
                    Select Files
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Enter media title" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alt">Alt Text (for images)</Label>
                  <Input id="alt" placeholder="Describe the image for accessibility" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setUploadDialogOpen(false)}>Upload</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className={`overflow-hidden ${selectedItems.includes(item.id) ? "ring-2 ring-primary" : ""}`}
            >
              <div className="relative aspect-square bg-muted">
                {item.type === "image" ? (
                  <img src={item.url || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">{getIconForType(item.type)}</div>
                )}
                <div className="absolute top-2 left-2">
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={() => toggleSelectItem(item.id)}
                    className="bg-background/80"
                  />
                </div>
                <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 bg-background/80 hover:bg-background">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        <span>View</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" />
                        <span>Copy URL</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <CardContent className="p-3">
                <div className="truncate font-medium text-sm">{item.title}</div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{item.size}</span>
                  <span>{item.uploadedAt}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-md border">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    <Checkbox
                      checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                      onCheckedChange={toggleSelectAll}
                      aria-label="Select all media"
                    />
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Media</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Type</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Size</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Dimensions</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Uploaded By</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                    >
                      <td className="p-4 align-middle">
                        <Checkbox
                          checked={selectedItems.includes(item.id)}
                          onCheckedChange={() => toggleSelectItem(item.id)}
                          aria-label={`Select ${item.title}`}
                        />
                      </td>
                      <td className="p-4 align-middle">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded bg-muted flex items-center justify-center overflow-hidden">
                            {item.type === "image" ? (
                              <img
                                src={item.url || "/placeholder.svg"}
                                alt={item.title}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              getIconForType(item.type)
                            )}
                          </div>
                          <div className="font-medium">{item.title}</div>
                        </div>
                      </td>
                      <td className="p-4 align-middle capitalize">{item.type}</td>
                      <td className="p-4 align-middle">{item.size}</td>
                      <td className="p-4 align-middle">{item.dimensions}</td>
                      <td className="p-4 align-middle">{item.uploadedBy}</td>
                      <td className="p-4 align-middle">{item.uploadedAt}</td>
                      <td className="p-4 align-middle">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              <span>View</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              <span>Copy URL</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="p-4 text-center text-muted-foreground">
                      No media found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {selectedItems.length > 0 ? (
            <span>{selectedItems.length} items selected</span>
          ) : (
            <span>
              Showing {filteredItems.length} of {mediaItems.length} items
            </span>
          )}
        </div>
        {selectedItems.length > 0 && (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Copy className="mr-2 h-4 w-4" />
              Copy URLs
            </Button>
            <Button variant="destructive" size="sm">
              <Trash className="mr-2 h-4 w-4" />
              Delete Selected
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

