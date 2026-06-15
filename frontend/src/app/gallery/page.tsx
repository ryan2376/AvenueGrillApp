import type { Metadata } from "next";
import Image from "next/image";
import { Camera } from "lucide-react";
import { signatureCategories } from "@/lib/menu-data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: `A look at ${site.name} — our brand, our flavours, and the moments we serve up in ${site.address.town}.`,
};

export default function GalleryPage() {
  return (
    <main>
      <section className="bg-brand-green text-brand-cream">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center sm:py-20">
          <p className="font-semibold uppercase tracking-wider text-brand-amber">Gallery</p>
          <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">A feast for the eyes</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-brand-cream/80">
            A glimpse of the Avenue Grill experience. Fresh food photography is on the way — here&apos;s
            our brand and flavours in the meantime.
          </p>
        </div>
      </section>

      {/* Brand artwork */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-2">
          {[
            { src: "/brand/flyer-1.png", alt: "Avenue Grill — Good Food. Great Mood. Better Together." },
            { src: "/brand/flyer-2.png", alt: "Avenue Grill — Delicious by passion, served with dedication." },
          ].map((img) => (
            <div key={img.src} className="overflow-hidden rounded-3xl border border-brand-charcoal/10 shadow-sm">
              <Image src={img.src} alt={img.alt} width={900} height={1240} className="h-auto w-full" />
            </div>
          ))}
        </div>
      </section>

      {/* Placeholder food tiles */}
      <section className="bg-brand-cream">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-center font-display text-2xl font-bold text-brand-green sm:text-3xl">
            On the grill
          </h2>
          <p className="mt-2 text-center text-sm text-brand-charcoal/60">
            Photography coming soon — a taste of what&apos;s cooking.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {signatureCategories.map(({ name, icon: Icon }) => (
              <div
                key={name}
                className="flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-brand-green/30 bg-white text-brand-green/70"
              >
                <Icon className="h-10 w-10" aria-hidden />
                <span className="font-display text-lg font-semibold">{name}</span>
                <span className="inline-flex items-center gap-1 text-xs text-brand-charcoal/40">
                  <Camera className="h-3.5 w-3.5" aria-hidden /> photo coming soon
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
