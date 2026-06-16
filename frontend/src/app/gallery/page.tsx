import type { Metadata } from "next";
import Image from "next/image";
import { allItems } from "@/lib/menu-data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: `A feast for the eyes — the dishes and flavours of ${site.name} in ${site.address.town}.`,
};

// Food photos + the delivery shot, for a rich visual grid.
const gallery = [
  ...allItems.map((i) => ({ src: i.image, label: i.name })),
  { src: "/food/delivery.jpg", label: "Delivered fresh" },
];

export default function GalleryPage() {
  return (
    <main>
      <section className="bg-brand-green text-brand-cream">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center sm:py-20">
          <p className="font-semibold uppercase tracking-wider text-brand-amber">Gallery</p>
          <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">A feast for the eyes</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-brand-cream/80">
            A glimpse of the Avenue Grill experience — grilled to perfection and made with love.
          </p>
        </div>
      </section>

      {/* Food grid */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {gallery.map((img) => (
            <figure
              key={img.src}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-brand-charcoal/10 shadow-sm"
            >
              <Image
                src={img.src}
                alt={img.label}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <span className="font-display text-lg font-semibold text-white">{img.label}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Brand artwork */}
      <section className="bg-brand-cream">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-center font-display text-2xl font-bold text-brand-green sm:text-3xl">
            Our brand
          </h2>
          <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2">
            {[
              { src: "/brand/flyer-1.png", alt: "Avenue Grill — Good Food. Great Mood. Better Together." },
              { src: "/brand/flyer-2.png", alt: "Avenue Grill — Delicious by passion, served with dedication." },
            ].map((img) => (
              <div key={img.src} className="overflow-hidden rounded-3xl border border-brand-charcoal/10 shadow-sm">
                <Image src={img.src} alt={img.alt} width={900} height={1240} className="h-auto w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
