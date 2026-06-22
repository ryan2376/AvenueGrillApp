import { cn } from "@/lib/utils";

/** Single content max-width + consistent gutters used across the site. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("mx-auto w-full max-w-content px-5 sm:px-6", className)}>{children}</div>;
}
