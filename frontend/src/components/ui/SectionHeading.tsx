import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/Eyebrow";

/** Consistent section header: optional eyebrow, a title, and optional intro. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  onDark = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  onDark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        align === "center" ? "mx-auto max-w-prose text-center" : "max-w-prose",
        className,
      )}
    >
      {eyebrow && <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>}
      <h2 className={cn("text-h2", eyebrow && "mt-3", onDark && "text-brand-cream")}>{title}</h2>
      {intro && (
        <p className={cn("mt-4 text-body", onDark ? "text-brand-cream/80" : "text-brand-charcoal/70")}>
          {intro}
        </p>
      )}
    </div>
  );
}
