import { cn } from "@/lib/utils";

/** Small tracked section kicker. Orange on light, amber on dark. Use sparingly. */
export function Eyebrow({
  children,
  onDark = false,
  className,
}: {
  children: React.ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "text-eyebrow font-semibold uppercase",
        onDark ? "text-brand-amber" : "text-brand-orange",
        className,
      )}
    >
      {children}
    </span>
  );
}
