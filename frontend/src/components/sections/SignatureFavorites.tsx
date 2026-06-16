import Link from "next/link";
import Image from "next/image";
import { featuredItems } from "@/lib/menu-data";
import { buttonVariants } from "@/components/ui/Button";

export function SignatureFavorites() {
  return (
    <section className="bg-brand-cream">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="text-center">
          <p className="font-semibold uppercase tracking-wider text-brand-orange">
            Savor our specialties
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-brand-green sm:text-4xl">
            Signature Favourites
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-brand-charcoal/70">
            From the grill to Kenyan classics — a taste of what we serve. Order any favourite
            straight from WhatsApp while full online ordering is on its way.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredItems.map((item) => (
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

        <div className="mt-12 text-center">
          <Link href="/menu" className={buttonVariants({ variant: "secondary", size: "lg" })}>
            See the full menu
          </Link>
        </div>
      </div>
    </section>
  );
}
