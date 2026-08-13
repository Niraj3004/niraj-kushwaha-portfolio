import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-hairline bg-white text-ink shadow-sm overflow-hidden",
        className
      )}
      {...props}
    />
  )
)
Card.displayName = "Card"

export { Card }
