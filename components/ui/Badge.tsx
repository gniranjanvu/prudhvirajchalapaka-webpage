import * as React from "react"
import { cn } from "@/lib/utils/helpers"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "accent" | "outline" | "secondary"
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default: "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100",
      secondary: "bg-gray-100 text-gray-900 dark:bg-zinc-800 dark:text-gray-300",
      accent: "bg-accent text-white",
      outline: "border border-gray-300 dark:border-gray-700",
    }

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
          variants[variant],
          className
        )}
        {...props}
      />
    )
  }
)
Badge.displayName = "Badge"

export { Badge }
