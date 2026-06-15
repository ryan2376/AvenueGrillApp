import type { Metadata } from "next";
import { Bike, Smartphone } from "lucide-react";
import { signatureCategories } from "@/lib/menu-data";
import { site } from "@/lib/site";
import { WhatsAppOrderButton } from "@/components/WhatsAppOrderButton";

export const metadata: Metadata = {
  title: "Menu",
  description: `Browse Avenue Grill's favourites — grilled chicken, fish, beef, sides, salads and milkshakes. Delivery across ${site.address.town}.`,
};

export default function MenuPage() {
  return (
    <main>
      <section className="bg-brand-green text-brand-cream">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center sm:py-20">
          <p className="font-semibold uppercase tracking-wider text-brand-amber">Our menu</p>
          <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Savor our specialties</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-brand-cream/80">
            Here&apos;s a taste of what we serve. The full menu with photos, options and one-tap
            online ordering &amp; payment (M-Pesa) is coming soon — for now, order any item on WhatsApp.
          </p>
          <div className="mt-8 flex justify-center">
            <WhatsAppOrderButton size="lg" />
          </div>
        </div>
      </section>

      {/* Notice */}
      <section className="mx-auto max-w-6xl px-6 pt-12">
        <div className="flex flex-col items-start gap-3 rounded-2xl border border-brand-amber/40 bg-brand-amber/10 p-5 text-sm text-brand-charcoal/80 sm:flex-row sm:items-center">
          <Smartphone className="h-5 w-5 shrink-0 text-brand-orange" aria-hidden />
          <p>
            <span className="font-semibold text-brand-green">Online ordering is on the way.</span>{" "}
            Prices shown are indicative placeholders. Final menu, photos and checkout arrive in the
            next phase.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {signatureCategories.map(({ name, blurb, icon: Icon, fromKes }) => (
            <article
              key={name}
              className="flex flex-col rounded-2xl border border-brand-charcoal/10 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <h2 className="font-display text-xl font-semibold text-brand-green">{name}</h2>
              </div>
              <p className="mt-4 flex-1 text-sm text-brand-charcoal/70">{blurb}</p>
              <p className="mt-4 text-sm font-semibold text-brand-orange">
                From KES {fromKes.toLocaleString("en-KE")}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Delivery note */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="flex flex-col items-center gap-3 rounded-2xl bg-brand-green px-6 py-8 text-center text-brand-cream">
          <Bike className="h-8 w-8 text-brand-amber" aria-hidden />
          <p className="font-display text-xl font-semibold">
            Delivery across {site.address.area} &amp; {site.address.town}
          </p>
          <p className="max-w-xl text-sm text-brand-cream/70">
            Pay with M-Pesa or cash on delivery. {site.hours.display} EAT.
          </p>
          <div className="mt-2">
            <WhatsAppOrderButton />
          </div>
        </div>
      </section>
    </main>
  );
}
