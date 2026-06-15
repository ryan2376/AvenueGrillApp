import { Leaf, ChefHat, HeartHandshake, Sparkles, type LucideIcon } from "lucide-react";

interface ValueProp {
  icon: LucideIcon;
  title: string;
  body: string;
}

const valueProps: ValueProp[] = [
  { icon: Leaf, title: "Fresh Ingredients", body: "Sourced fresh and responsibly, prepared daily." },
  { icon: ChefHat, title: "Expertly Prepared", body: "Cooked to perfection by our skilled chefs." },
  { icon: HeartHandshake, title: "Warm Hospitality", body: "A welcoming space for you and your loved ones." },
  { icon: Sparkles, title: "Made for Memories", body: "Good times and great flavours that last." },
];

export function ValueProps() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <div className="text-center">
        <p className="font-semibold uppercase tracking-wider text-brand-orange">That&apos;s what we do</p>
        <h2 className="mt-2 font-display text-3xl font-bold text-brand-green sm:text-4xl">
          Crafted with care, great moments
        </h2>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {valueProps.map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            className="rounded-2xl border border-brand-charcoal/10 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange/10">
              <Icon className="h-7 w-7 text-brand-orange" aria-hidden />
            </div>
            <h3 className="font-display text-lg font-semibold text-brand-green">{title}</h3>
            <p className="mt-2 text-sm text-brand-charcoal/70">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
