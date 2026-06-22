import { MessageCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { site, whatsappLink } from "@/lib/site";

/**
 * "Order on WhatsApp" deep-link button. For Phase 1 it opens a chat with a
 * friendly pre-filled greeting; Phase 2.5 will make the message cart-aware
 * (itemised order). Uses WhatsApp brand green for instant recognition.
 */
export function WhatsAppOrderButton({
  label = "Order on WhatsApp",
  size = "md",
  className,
  message,
}: {
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  message?: string;
}) {
  const text =
    message ??
    `Hello ${site.shortName}! 👋 I'd like to place an order for delivery in ${site.address.area}.`;

  return (
    <a
      href={whatsappLink(text)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(buttonVariants({ variant: "whatsapp", size }), className)}
    >
      <MessageCircle className="h-5 w-5" aria-hidden />
      {label}
    </a>
  );
}
