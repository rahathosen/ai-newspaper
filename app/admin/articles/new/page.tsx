"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, ChevronLeft, Image, Plus, Save, X } from "lucide-react"
import { ArticleEditor } from "@/components/admin/article-editor"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { bangladeshDivisions, bangladeshDistricts } from "@/lib/bangladesh-data"

export default function NewArticlePage() {
  const [date, setDate] = useState<Date>()
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([])
  const [selectedDivision, setSelectedDivision] = useState<string>("")
  const [selectedDistrict, setSelectedDistrict] = useState<string>("")

  // Sample data
  const categories = [
    { id: "1", name: "Politics", slug: "politics" },
    { id: "2", name: "Business", slug: "business" },
    { id: "3", name: "Technology", slug: "technology" },
    { id: "4", name: "Health", slug: "health" },
    { id: "5", name: "Sports", slug: "sports" },
    { id: "6", name: "Arts", slug: "arts" },
    { id: "7", name: "Science", slug: "science" },
  ]

  const subcategories = [
    { id: "1", parentId: "1", name: "U.S. Politics", slug: "us-politics" },
    { id: "2", parentId: "1", name: "International Relations", slug: "international-relations" },
    { id: "3", parentId: "1", name: "Policy", slug: "policy" },
    { id: "4", parentId: "2", name: "Economy", slug: "economy" },
    { id: "5", parentId: "2", name: "Markets", slug: "markets" },
    { id: "6", parentId: "2", name: "Companies", slug: "companies" },
    { id: "7", parentId: "3", name: "AI & Robotics", slug: "ai-robotics" },
    { id: "8", parentId: "3", name: "Computing", slug: "computing" },
    { id: "9", parentId: "3", name: "Mobile", slug: "mobile" },
    { id: "10", parentId: "4", name: "Medicine", slug: "medicine" },
    { id: "11", parentId: "4", name: "Mental Health", slug: "mental-health" },
    { id: "12", parentId: "4", name: "Nutrition", slug: "nutrition" },
    { id: "13", parentId: "5", name: "Football", slug: "football" },
    { id: "14", parentId: "5", name: "Basketball", slug: "basketball" },
    { id: "15", parentId: "5", name: "Tennis", slug: "tennis" },
  ]

  const availableSubcategories = subcategories.filter((sub) => selectedCategories.includes(sub.parentId))

  // Get districts for selected division
  const availableDistricts = selectedDivision
    ? bangladeshDistricts.filter((district) => district.division === selectedDivision)
    : []

  const handleAddTag = () => {
    if (newTag && !selectedTags.includes(newTag)) {
      setSelectedTags([...selectedTags, newTag])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag))
  }

  const handleCategoryChange = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId))
      // Remove any subcategories that belong to this category
      setSelectedSubcategories(
        selectedSubcategories.filter(
          (id) => !subcategories.find((sub) => sub.id === id && sub.parentId === categoryId),
        ),
      )
    } else {
      setSelectedCategories([...selectedCategories, categoryId])
    }
  }

  const handleSubcategoryChange = (subcategoryId: string) => {
    if (selectedSubcategories.includes(subcategoryId)) {
      setSelectedSubcategories(selectedSubcategories.filter((id) => id !== subcategoryId))
    } else {
      setSelectedSubcategories([...selectedSubcategories, subcategoryId])
    }
  }

  const handleDivisionChange = (division: string) => {
    setSelectedDivision(division)
    setSelectedDistrict("") // Reset district when division changes
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <a href="/admin/articles">
              <ChevronLeft className="h-4 w-4" />
            </a>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">New Article</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Save as Draft</Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Publish
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Enter article title" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea id="excerpt" placeholder="Brief summary of the article" className="min-h-[100px]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="editor">
                <TabsList className="mb-4">
                  <TabsTrigger value="editor">Editor</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <TabsContent value="editor">
                  <ArticleEditor />
                </TabsContent>
                <TabsContent value="preview">
                  <div className="border rounded-md p-4 min-h-[500px] prose dark:prose-invert max-w-none">
                    <h2>Article Preview</h2>
                    <p>Your article content will appear here as you type.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Publishing Options</h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue="draft">
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="publishDate">Publish Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="featured">Featured Article</Label>
                    <p className="text-sm text-muted-foreground">Display prominently on homepage</p>
                  </div>
                  <Switch id="featured" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Bangladesh Location</h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="division">Division</Label>
                  <Select value={selectedDivision} onValueChange={handleDivisionChange}>
                    <SelectTrigger id="division">
                      <SelectValue placeholder="Select division" />
                    </SelectTrigger>
                    <SelectContent>
                      {bangladeshDivisions.map((division) => (
                        <SelectItem key={division.id} value={division.id}>
                          {division.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="district">District</Label>
                  <Select value={selectedDistrict} onValueChange={setSelectedDistrict} disabled={!selectedDivision}>
                    <SelectTrigger id="district">
                      <SelectValue placeholder={selectedDivision ? "Select district" : "Select division first"} />
                    </SelectTrigger>
                    <SelectContent>
                      {availableDistricts.map((district) => (
                        <SelectItem key={district.id} value={district.id}>
                          {district.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="isNational">National News</Label>
                    <p className="text-sm text-muted-foreground">Mark as national news (not specific to a location)</p>
                  </div>
                  <Switch
                    id="isNational"
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedDivision("")
                        setSelectedDistrict("")
                      }
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Categories & Subcategories</h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Categories</Label>
                  <ScrollArea className="h-[200px] border rounded-md p-4">
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              type="checkbox"
                              id={`category-${category.id}`}
                              checked={selectedCategories.includes(category.id)}
                              onChange={() => handleCategoryChange(category.id)}
                              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor={`category-${category.id}`} className="font-medium">
                              {category.name}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                {selectedCategories.length > 0 && (
                  <div className="space-y-2">
                    <Label>Subcategories</Label>
                    <ScrollArea className="h-[200px] border rounded-md p-4">
                      <div className="space-y-2">
                        {availableSubcategories.length > 0 ? (
                          availableSubcategories.map((subcategory) => (
                            <div key={subcategory.id} className="flex items-start">
                              <div className="flex items-center h-5">
                                <input
                                  type="checkbox"
                                  id={`subcategory-${subcategory.id}`}
                                  checked={selectedSubcategories.includes(subcategory.id)}
                                  onChange={() => handleSubcategoryChange(subcategory.id)}
                                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                              </div>
                              <div className="ml-3 text-sm">
                                <label htmlFor={`subcategory-${subcategory.id}`} className="font-medium">
                                  {subcategory.name}
                                </label>
                                <p className="text-muted-foreground">
                                  {categories.find((c) => c.id === subcategory.parentId)?.name}
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            No subcategories available for selected categories
                          </p>
                        )}
                      </div>
                    </ScrollArea>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Tags</h3>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddTag()
                      }
                    }}
                  />
                  <Button type="button" onClick={handleAddTag} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedTags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                  {selectedTags.length === 0 && <p className="text-sm text-muted-foreground">No tags added yet</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Featured Image</h3>

              <div className="space-y-4">
                <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                  <Image className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground text-center">
                    Drag and drop an image here, or click to select a file
                  </p>
                  <Button variant="outline" className="mt-4">
                    Upload Image
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">SEO Settings</h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="seoTitle">SEO Title</Label>
                  <Input id="seoTitle" placeholder="SEO optimized title" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seoDescription">Meta Description</Label>
                  <Textarea
                    id="seoDescription"
                    placeholder="Brief description for search engines"
                    className="min-h-[80px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">URL Slug</Label>
                  <div className="flex items-center">
                    <span className="text-sm text-muted-foreground mr-2">/article/</span>
                    <Input id="slug" placeholder="article-url-slug" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="indexable">Allow Indexing</Label>
                    <p className="text-sm text-muted-foreground">Allow search engines to index</p>
                  </div>
                  <Switch id="indexable" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

