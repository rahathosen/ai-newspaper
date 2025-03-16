import { cn } from "@/lib/utils"

interface AdvertisementProps {
  size: "banner" | "large-rectangle" | "leaderboard" | "skyscraper" | "medium-rectangle" | "mobile-banner"
  className?: string
  label?: boolean
}

export function Advertisement({ size, className, label = true }: AdvertisementProps) {
  // Define dimensions based on standard ad sizes
  const dimensions = {
    banner: { width: 468, height: 60, className: "h-[60px]" },
    "large-rectangle": { width: 336, height: 280, className: "h-[280px]" },
    leaderboard: { width: 728, height: 90, className: "h-[90px]" },
    skyscraper: { width: 160, height: 600, className: "h-[600px] w-[160px]" },
    "medium-rectangle": { width: 300, height: 250, className: "h-[250px]" },
    "mobile-banner": { width: 320, height: 50, className: "h-[50px]" },
  }

  const { width, height, className: sizeClassName } = dimensions[size]

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-muted/30 border border-dashed border-muted-foreground/20 rounded-md",
        sizeClassName,
        className,
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-muted-foreground/50 font-medium">Advertisement</div>
          <div className="text-xs text-muted-foreground/40">
            {width}x{height}
          </div>
        </div>
      </div>
      {label && <div className="absolute top-0 left-0 bg-muted text-[10px] px-1 text-muted-foreground/60">Ad</div>}
    </div>
  )
}

