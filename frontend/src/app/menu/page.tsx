import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";
import { WhatsAppOrderButton } from "@/components/WhatsAppOrderButton";
import { MenuBrowser } from "@/components/menu/MenuBrowser";

export const metadata: Metadata = {
  title: "Menu",
  description: `Browse Avenue Grill's menu — grilled chicken, tilapia, pilau, githeri, mukimo, smocha, salads and milkshakes. Build your order and send it on WhatsApp. Delivery across ${site.address.town}.`,
};

export default function MenuPage() {
  return (
    <main>
      <section className="bg-brand-green text-brand-cream">
        <div className="mx-auto max-w-4xl px-6 py-14 text-center sm:py-16">
          <p className="font-semibold uppercase tracking-wider text-brand-amber">Our menu</p>
          <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Savor our specialties</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-brand-cream/80">
            Tap <span className="font-semibold text-brand-amber">Add</span> to build your order, then
            send it to us on WhatsApp. One-tap online checkout &amp; M-Pesa are coming soon.
          </p>
        </div>
      </section>

      {/* Live menu + cart */}
      <MenuBrowser />

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
