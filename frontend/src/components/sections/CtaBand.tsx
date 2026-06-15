import { Phone } from "lucide-react";
import { site } from "@/lib/site";
import { buttonVariants } from "@/components/ui/Button";
import { WhatsAppOrderButton } from "@/components/WhatsAppOrderButton";
import { cn } from "@/lib/utils";

export function CtaBand() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="relative overflow-hidden rounded-3xl bg-brand-orange px-8 py-12 text-center text-white sm:py-14">
        <div
          className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl"
          aria-hidden
        />
        <h2 className="relative font-display text-3xl font-bold sm:text-4xl">
          Hungry? Let&apos;s get you fed.
        </h2>
        <p className="relative mx-auto mt-3 max-w-xl text-white/90">
          Order in seconds on WhatsApp, or give us a call. Good food, great mood — delivered.
        </p>
        <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
          <WhatsAppOrderButton size="lg" label="Order on WhatsApp" className="bg-white text-[#1ebe5b] hover:bg-brand-cream" />
          <a
            href={`tel:${site.phoneIntl}`}
            className={cn(
              buttonVariants({ variant: "onDark", size: "lg" }),
              "border-white/60 hover:bg-white/10",
            )}
          >
            <Phone className="h-5 w-5" aria-hidden />
            {site.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
