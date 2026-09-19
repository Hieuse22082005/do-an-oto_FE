import * as React from "react"

const buttonVariants = (variant = "default", size = "default", className = "") => {
  const base = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
  
  const variants: Record<string, string> = {
    default: "bg-blue-600 text-white hover:bg-blue-600/90",
    destructive: "bg-red-500 text-white hover:bg-red-500/90",
    outline: "border border-input bg-background hover:bg-gray-100 hover:text-gray-900",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-100/80",
    ghost: "hover:bg-gray-100 hover:text-gray-900",
    link: "text-blue-600 underline-offset-4 hover:underline",
  }

  const sizes: Record<string, string> = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  }

  return `${base} ${variants[variant] || variants.default} ${sizes[size] || sizes.default} ${className}`
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // If asChild is true, we should render Slot, but without radix-ui installed, we fallback to button
    const Comp = "button"
    return (
      <Comp
        className={buttonVariants(variant, size, className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
