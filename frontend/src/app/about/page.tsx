import type { Metadata } from "next";
import Image from "next/image";
import { Leaf, ChefHat, HeartHandshake, Sparkles } from "lucide-react";
import { site } from "@/lib/site";
import { WhatsAppOrderButton } from "@/components/WhatsAppOrderButton";

export const metadata: Metadata = {
  title: "About",
  description: `The story behind ${site.name} — ${site.subTagline}`,
};

const pillars = [
  { icon: Leaf, title: "Fresh Ingredients", body: "Sourced fresh and responsibly for every plate." },
  { icon: ChefHat, title: "Expertly Prepared", body: "Grilled to perfection by our skilled chefs." },
  { icon: HeartHandshake, title: "Warm Hospitality", body: "A welcoming space for you and your loved ones." },
  { icon: Sparkles, title: "Made for Memories", body: "Meals that bring people together." },
];

export default function AboutPage() {
  return (
    <main>
      {/* Intro */}
      <section className="bg-brand-green text-brand-cream">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center sm:py-20">
          <p className="font-semibold uppercase tracking-wider text-brand-amber">Our story</p>
          <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
            Delicious by passion, served with dedication
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-brand-cream/80">
            Avenue Grill &amp; Restaurant is {site.address.area}&apos;s neighbourhood grill — a place
            where good food brings great moods and people come together over flame-kissed favourites.
          </p>
        </div>
      </section>

      {/* Narrative + image */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-2 sm:py-20">
        <div className="space-y-5 text-brand-charcoal/80">
          <h2 className="font-display text-3xl font-bold text-brand-green">
            From the grill to your table
          </h2>
          <p>
            Every dish at Avenue Grill is thoughtfully prepared to deliver an exceptional experience —
            from perfectly grilled chicken and fish to hearty beef, homely sides, fresh salads and
            thick, creamy milkshakes.
          </p>
          <p>
            We believe great food is about more than a meal. It&apos;s about warm hospitality, fresh
            ingredients, and the memories made around the table. Whether it&apos;s a quick weekday
            dinner or a weekend treat, we cook like we&apos;re cooking for family.
          </p>
          <p className="font-display text-xl font-semibold text-brand-green">
            {site.tagline}
          </p>
          <div className="pt-2">
            <WhatsAppOrderButton label="Order a favourite" />
          </div>
        </div>

        <div className="relative mx-auto max-w-sm overflow-hidden rounded-3xl shadow-xl">
          <Image
            src="/brand/flyer-2.png"
            alt="Avenue Grill & Restaurant — crafted with care"
            width={800}
            height={1100}
            className="h-auto w-full"
          />
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-brand-cream">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <h2 className="text-center font-display text-3xl font-bold text-brand-green">
            What we stand for
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-2xl border border-brand-charcoal/10 bg-white p-6 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange/10">
                  <Icon className="h-7 w-7 text-brand-orange" aria-hidden />
                </div>
                <h3 className="font-display text-lg font-semibold text-brand-green">{title}</h3>
                <p className="mt-2 text-sm text-brand-charcoal/70">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
