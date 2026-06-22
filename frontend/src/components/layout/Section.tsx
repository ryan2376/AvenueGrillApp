import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";

type Tone = "cream" | "green" | "white";
type Size = "sm" | "base" | "lg";

const toneClass: Record<Tone, string> = {
  cream: "bg-brand-cream text-brand-charcoal",
  green: "bg-brand-green text-brand-cream",
  white: "bg-white text-brand-charcoal",
};

const sizeClass: Record<Size, string> = {
  sm: "py-section-sm",
  base: "py-section",
  lg: "py-section-lg",
};

/**
 * Vertical-rhythm wrapper for page sections. Applies a background tone and one
 * of the named spacing tokens, and (by default) wraps children in the standard
 * Container. Pass `bleed` for full-width content (e.g. the hero).
 */
export function Section({
  tone = "cream",
  size = "base",
  bleed = false,
  className,
  id,
  children,
}: {
  tone?: Tone;
  size?: Size;
  bleed?: boolean;
  className?: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn(toneClass[tone], sizeClass[size], className)}>
      {bleed ? children : <Container>{children}</Container>}
    </section>
  );
}
