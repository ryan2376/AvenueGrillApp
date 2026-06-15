import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Brand button styles. Exported as `buttonVariants` so the same look can be
 * applied to links (`<a>` / Next `<Link>`) as well as `<button>` elements.
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-brand-orange text-white hover:bg-brand-amber",
        secondary:
          "border border-brand-green/30 text-brand-green hover:bg-brand-green hover:text-brand-cream",
        ghost: "text-brand-green hover:bg-brand-green/10",
        onDark: "border border-brand-cream/40 text-brand-cream hover:bg-brand-green700",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-3.5 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
