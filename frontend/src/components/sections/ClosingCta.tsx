import { Phone, MessageCircle } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";
import { Section } from "@/components/layout/Section";

const orderMessage = `Hello ${site.shortName}! 👋 I'd like to place an order for delivery in ${site.address.area}.`;

export function ClosingCta() {
  return (
    <Section tone="cream" size="base">
      <div className="rounded-card bg-brand-orange px-6 py-14 text-center text-white sm:px-12">
        <h2 className="text-h2 text-white">Hungry? Let&apos;s get you fed.</h2>
        <p className="mx-auto mt-3 max-w-prose text-body text-white/90">
          Order in seconds on WhatsApp, or give us a call. Good food, great mood — delivered.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href={whatsappLink(orderMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 font-semibold text-brand-orange transition-colors hover:bg-brand-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-orange"
          >
            <MessageCircle className="h-5 w-5" aria-hidden />
            Order on WhatsApp
          </a>
          <a
            href={`tel:${site.phoneIntl}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/60 px-8 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
          >
            <Phone className="h-5 w-5" aria-hidden />
            {site.phoneDisplay}
          </a>
        </div>
      </div>
    </Section>
  );
}
