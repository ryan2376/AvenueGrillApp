import type { Metadata } from "next";
import Image from "next/image";
import { Smartphone } from "lucide-react";
import { menuSections } from "@/lib/menu-data";
import { site } from "@/lib/site";
import { WhatsAppOrderButton } from "@/components/WhatsAppOrderButton";

export const metadata: Metadata = {
  title: "Menu",
  description: `Browse Avenue Grill's menu — grilled chicken, tilapia, pilau, githeri, mukimo, smocha, salads and milkshakes. Delivery across ${site.address.town}.`,
};

export default function MenuPage() {
  return (
    <main>
      <section className="bg-brand-green text-brand-cream">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center sm:py-20">
          <p className="font-semibold uppercase tracking-wider text-brand-amber">Our menu</p>
          <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Savor our specialties</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-brand-cream/80">
            From the grill to Kenyan classics. One-tap online ordering and payment (M-Pesa) is
            coming soon — for now, order any item on WhatsApp.
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
            Prices shown are indicative starting prices — final menu and checkout arrive in the next
            phase.
          </p>
        </div>
      </section>

      {/* Sections */}
      {menuSections.map((section) => (
        <section key={section.title} className="mx-auto max-w-6xl px-6 py-12">
          <div className="mb-8">
            <h2 className="font-display text-2xl font-bold text-brand-green sm:text-3xl">
              {section.title}
            </h2>
            <p className="mt-1 text-brand-charcoal/60">{section.tagline}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {section.items.map((item) => (
              <article
                key={item.name}
                className="group overflow-hidden rounded-2xl border border-brand-charcoal/10 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-xl font-semibold text-brand-green">
                      {item.name}
                    </h3>
                    <span className="shrink-0 rounded-full bg-brand-orange/10 px-2.5 py-1 text-xs font-semibold text-brand-orange">
                      From KES {item.fromKes.toLocaleString("en-KE")}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-brand-charcoal/70">{item.blurb}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}

      {/* Delivery band */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid items-center gap-8 overflow-hidden rounded-3xl bg-brand-green text-brand-cream lg:grid-cols-2">
          <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[320px]">
            <Image
              src="/food/delivery.jpg"
              alt="Avenue Grill delivery — packed fresh"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="px-8 pb-10 pt-2 lg:py-10 lg:pl-0 lg:pr-10">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Delivered fresh across {site.address.town}
            </h2>
            <p className="mt-3 text-brand-cream/80">
              Order on WhatsApp and we&apos;ll bring it to you in {site.address.area} and around{" "}
              {site.address.town}. Pay with M-Pesa or cash on delivery. {site.hours.display} EAT.
            </p>
            <div className="mt-6">
              <WhatsAppOrderButton size="lg" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
