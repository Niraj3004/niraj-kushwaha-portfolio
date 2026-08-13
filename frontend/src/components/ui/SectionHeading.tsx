import * as React from "react"
import { cn } from "@/lib/utils"
import { TextReveal } from "../motion/TextReveal"
import { Reveal } from "../motion/Reveal"

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string
  heading: string
  subheading?: string
  align?: "left" | "center"
}

export const SectionHeading = ({ 
  eyebrow, 
  heading, 
  subheading, 
  align = "left", 
  className, 
  ...props 
}: SectionHeadingProps) => {
  return (
    <div 
      className={cn(
        "flex flex-col gap-4 mb-16",
        align === "center" && "items-center text-center",
        className
      )}
      {...props}
    >
      {eyebrow && (
        <Reveal>
          <span className="text-accent text-small font-semibold tracking-wider uppercase">
            {eyebrow}
          </span>
        </Reveal>
      )}
      
      <h2 className="text-h2">
        <TextReveal text={heading} />
      </h2>
      
      {subheading && (
        <Reveal delay={0.1}>
          <p className="text-muted text-body max-w-2xl">
            {subheading}
          </p>
        </Reveal>
      )}
    </div>
  )
}
