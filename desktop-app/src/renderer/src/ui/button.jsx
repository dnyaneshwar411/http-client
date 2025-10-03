import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import cn from "../lib/cn"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-accent-blue)] text-[var(--color-bg)] shadow-sm hover:bg-[var(--color-accent-blue)]/80",
        destructive:
          "bg-[var(--color-accent-red)] text-[var(--color-bg)] shadow-sm hover:bg-[var(--color-accent-red)]/80 focus-visible:ring-[var(--color-accent-red)]/50",
        outline:
          "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] shadow-sm hover:bg-[var(--color-highlight)]",
        secondary:
          "bg-[var(--color-accent-purple)] text-[var(--color-bg)] shadow-sm hover:bg-[var(--color-accent-purple)]/80",
        ghost:
          "text-[var(--color-text)] hover:bg-[var(--color-accent-yellow)]/20 hover:text-[var(--color-accent-yellow)]",
        link: "text-[var(--color-accent-orange)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-4 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn("cursor-pointer", buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
