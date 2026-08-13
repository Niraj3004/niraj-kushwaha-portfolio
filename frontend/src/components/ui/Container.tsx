import * as React from "react"
import { cn } from "@/lib/utils"

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, as: Component = "div", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn("max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full", className)}
        {...props}
      />
    )
  }
)
Container.displayName = "Container"

export { Container }
