import Link from "next/link";
import Image from "next/image";
import { Flame, MapPin } from "lucide-react";
import { site } from "@/lib/site";
import { buttonVariants } from "@/components/ui/Button";
import { WhatsAppOrderButton } from "@/components/WhatsAppOrderButton";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-green text-brand-cream">
      {/* decorative glow */}
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-orange/20 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 sm:py-20 lg:grid-cols-2 lg:py-24">
        {/* Copy */}
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-green700 px-4 py-1.5 text-sm font-medium">
            <MapPin className="h-4 w-4 text-brand-amber" aria-hidden />
            {site.address.full} · {site.hours.display}
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
            Good Food. <span className="text-brand-amber">Great Mood.</span>
            <br />
            Better Together.
          </h1>

          <p className="mt-6 max-w-xl text-lg text-brand-cream/80">
            {site.subTagline} From the grill to your table, every dish is thoughtfully
            prepared — and delivered fresh across {site.address.town}.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <WhatsAppOrderButton size="lg" label="Order on WhatsApp" />
            <Link href="/menu" className={buttonVariants({ variant: "onDark", size: "lg" })}>
              View the Menu
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-brand-cream/70">
            <span className="inline-flex items-center gap-2">
              <Flame className="h-4 w-4 text-brand-orange" aria-hidden /> Fresh off the grill
            </span>
            <span>· Delivery in {site.address.area} &amp; {site.address.town}</span>
            <span>· M-Pesa &amp; Cash on Delivery</span>
          </div>
        </div>

        {/* Showcase image */}
        <div className="animate-fade-up [animation-delay:120ms]">
          <div className="relative mx-auto max-w-md rotate-1 overflow-hidden rounded-3xl border-4 border-brand-cream/10 shadow-2xl">
            <Image
              src="/food/grilled-chicken.jpg"
              alt="Flame-grilled chicken at Avenue Grill & Restaurant"
              width={1080}
              height={1080}
              className="h-auto w-full"
              priority
            />
            <span className="absolute bottom-4 left-4 rounded-full bg-brand-green/90 px-3 py-1 text-sm font-medium text-brand-cream">
              Fresh off the grill 🔥
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
