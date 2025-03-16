"use client"

import { useState } from "react"
import { Bold, Italic, Link, List, ListOrdered, Quote, Heading1, Heading2, Image, Code, Undo, Redo } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export function ArticleEditor() {
  const [content, setContent] = useState("")

  const insertFormatting = (format: string) => {
    const textarea = document.getElementById("editor") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = textarea.value.substring(start, end)
    let formattedText = ""

    switch (format) {
      case "bold":
        formattedText = `**${selectedText}**`
        break
      case "italic":
        formattedText = `*${selectedText}*`
        break
      case "link":
        formattedText = `[${selectedText}](url)`
        break
      case "h1":
        formattedText = `# ${selectedText}`
        break
      case "h2":
        formattedText = `## ${selectedText}`
        break
      case "quote":
        formattedText = `> ${selectedText}`
        break
      case "ul":
        formattedText = `- ${selectedText}`
        break
      case "ol":
        formattedText = `1. ${selectedText}`
        break
      case "image":
        formattedText = `![${selectedText}](image-url)`
        break
      case "code":
        formattedText = `\`${selectedText}\``
        break
      default:
        formattedText = selectedText
    }

    const newContent = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end)
    setContent(newContent)

    // Set cursor position after the inserted text
    setTimeout(() => {
      textarea.focus()
      textarea.selectionStart = start + formattedText.length
      textarea.selectionEnd = start + formattedText.length
    }, 0)
  }

  return (
    <div className="space-y-4">
      <div className="bg-muted/40 rounded-md p-1 flex flex-wrap items-center gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormatting("bold")} title="Bold">
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => insertFormatting("italic")}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormatting("link")} title="Link">
          <Link className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="h-6" />
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => insertFormatting("h1")}
          title="Heading 1"
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => insertFormatting("h2")}
          title="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="h-6" />
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => insertFormatting("ul")}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => insertFormatting("ol")}
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormatting("quote")} title="Quote">
          <Quote className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="h-6" />
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormatting("image")} title="Image">
          <Image className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormatting("code")} title="Code">
          <Code className="h-4 w-4" />
        </Button>
        <div className="ml-auto flex items-center">
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Undo">
            <Undo className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Redo">
            <Redo className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="write">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="write">Write</TabsTrigger>
          <TabsTrigger value="markdown">Markdown</TabsTrigger>
        </TabsList>
        <TabsContent value="write" className="mt-2">
          <Textarea
            id="editor"
            placeholder="Write your article content here..."
            className="min-h-[500px] font-mono"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </TabsContent>
        <TabsContent value="markdown" className="mt-2">
          <div className="border rounded-md p-4 min-h-[500px] font-mono whitespace-pre-wrap">
            {content || "Your markdown will appear here"}
          </div>
        </TabsContent>
      </Tabs>

      <div className="text-xs text-muted-foreground">
        <p>
          Use Markdown syntax for formatting.{" "}
          <a href="#" className="underline">
            Learn more
          </a>
        </p>
      </div>
    </div>
  )
}

