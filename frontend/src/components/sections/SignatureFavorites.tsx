import Link from "next/link";
import Image from "next/image";
import { featuredItems } from "@/lib/menu-data";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonVariants } from "@/components/ui/Button";

export function SignatureFavorites() {
  return (
    <Section tone="white" size="base">
      <SectionHeading
        align="center"
        eyebrow="From the grill"
        title="Signature favourites"
        intro="A few of the dishes people keep coming back for. Browse the full menu to order for delivery."
      />

      <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {featuredItems.map((item) => (
          <article key={item.name} className="group">
            <div className="relative aspect-[4/5] overflow-hidden rounded-card">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>
            <div className="mt-4 flex items-baseline justify-between gap-3">
              <h3 className="text-h3">{item.name}</h3>
              <span className="shrink-0 text-small font-semibold text-brand-orange">
                From KES {item.fromKes.toLocaleString("en-KE")}
              </span>
            </div>
            <p className="mt-1.5 text-small text-brand-charcoal/65">{item.blurb}</p>
          </article>
        ))}
      </div>

      <div className="mt-14 text-center">
        <Link href="/menu" className={buttonVariants({ variant: "secondary", size: "lg" })}>
          See the full menu
        </Link>
      </div>
    </Section>
  );
}
