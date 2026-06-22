import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { Container } from "@/components/layout/Container";
import { WhatsAppOrderButton } from "@/components/WhatsAppOrderButton";

// TODO: replace with the dedicated wide hero photograph from the owner
// (ideally ~2400×1600, landscape). Using an existing dish shot as a placeholder.
const HERO_IMAGE = "/food/grilled-chicken.jpg";

export function Hero() {
  return (
    <section className="relative flex min-h-[78vh] items-end overflow-hidden bg-brand-green">
      {/* Full-bleed photography */}
      <Image
        src={HERO_IMAGE}
        alt="Flame-grilled food at Avenue Grill & Restaurant"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Scrim for legibility — dark at the base, clearing toward the top */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-brand-green via-brand-green/65 to-brand-green/15"
        aria-hidden
      />

      <Container className="relative pb-14 pt-28 sm:pb-20 sm:pt-36">
        <div className="max-w-prose text-brand-cream">
          <p className="text-eyebrow font-semibold uppercase text-brand-amber">
            {site.address.full} · {site.hours.display}
          </p>

          <h1 className="mt-4 font-display text-display text-brand-cream">
            Good Food. Great Mood. Better Together.
          </h1>

          <p className="mt-5 max-w-xl text-body text-brand-cream/85">
            Flame-grilled chicken, fresh tilapia and Kenyan classics — cooked to order and delivered
            hot across {site.address.town}.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <WhatsAppOrderButton size="lg" label="Order on WhatsApp" />
            <Link
              href="/menu"
              className="inline-flex items-center gap-1.5 text-small font-semibold text-brand-cream underline-offset-4 hover:underline"
            >
              See the menu
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
