"use client"

import { useState } from "react"
import { Printer, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function PrintView() {
  const [printOptions, setPrintOptions] = useState({
    includeImages: true,
    includeComments: false,
    fontSize: "medium",
    layout: "portrait",
  })

  const handlePrint = () => {
    // In a real implementation, this would apply the print options
    window.print()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Printer className="h-4 w-4" />
          <span>Print Article</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Print Options</DialogTitle>
          <DialogDescription>Customize how you want to print this article.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fontSize" className="text-right">
              Font Size
            </Label>
            <Select
              value={printOptions.fontSize}
              onValueChange={(value) => setPrintOptions({ ...printOptions, fontSize: value })}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select font size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="layout" className="text-right">
              Layout
            </Label>
            <Select
              value={printOptions.layout}
              onValueChange={(value) => setPrintOptions({ ...printOptions, layout: value })}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select layout" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="portrait">Portrait</SelectItem>
                <SelectItem value="landscape">Landscape</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="col-span-4 space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeImages"
                  checked={printOptions.includeImages}
                  onCheckedChange={(checked) => setPrintOptions({ ...printOptions, includeImages: checked as boolean })}
                />
                <Label htmlFor="includeImages">Include images</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeComments"
                  checked={printOptions.includeComments}
                  onCheckedChange={(checked) =>
                    setPrintOptions({ ...printOptions, includeComments: checked as boolean })
                  }
                />
                <Label htmlFor="includeComments">Include comments</Label>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            <span>Save as PDF</span>
          </Button>
          <Button onClick={handlePrint} className="gap-2">
            <Printer className="h-4 w-4" />
            <span>Print</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

