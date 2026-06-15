import Link from "next/link";
import { signatureCategories } from "@/lib/menu-data";
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
            A taste of what&apos;s on the grill. Full menu with photos and online ordering is on
            its way — meanwhile, order any favourite straight from WhatsApp.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {signatureCategories.map(({ name, blurb, icon: Icon, fromKes }) => (
            <article
              key={name}
              className="group flex flex-col rounded-2xl border border-brand-charcoal/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green transition-colors group-hover:bg-brand-green group-hover:text-brand-cream">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="font-display text-xl font-semibold text-brand-green">{name}</h3>
              </div>
              <p className="mt-4 flex-1 text-sm text-brand-charcoal/70">{blurb}</p>
              <p className="mt-4 text-sm font-semibold text-brand-orange">
                From KES {fromKes.toLocaleString("en-KE")}
              </p>
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
