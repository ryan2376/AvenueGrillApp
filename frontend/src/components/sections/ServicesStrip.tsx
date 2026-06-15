import { Bike, ShoppingBag, UtensilsCrossed, PartyPopper, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Service {
  icon: LucideIcon;
  title: string;
  body: string;
  available: boolean;
}

const services: Service[] = [
  { icon: Bike, title: "Delivery", body: `Hot meals delivered across Meru & Gitimbine.`, available: true },
  { icon: ShoppingBag, title: "Takeaway", body: "Order ahead and collect — coming soon.", available: false },
  { icon: UtensilsCrossed, title: "Dine-in", body: "Eat in with comfort — coming soon.", available: false },
  { icon: PartyPopper, title: "Event Catering", body: "Catering for your celebrations — coming soon.", available: false },
];

export function ServicesStrip() {
  return (
    <section className="bg-brand-green text-brand-cream">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Made for every occasion</h2>
          <p className="mx-auto mt-3 max-w-2xl text-brand-cream/70">
            We&apos;re starting with delivery so you can enjoy Avenue Grill at home. More ways to
            enjoy us are on the way.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, title, body, available }) => (
            <div
              key={title}
              className={cn(
                "rounded-2xl border p-6",
                available
                  ? "border-brand-orange/40 bg-brand-green700"
                  : "border-brand-cream/10 bg-brand-green700/40",
              )}
            >
              <div className="flex items-center justify-between">
                <Icon className="h-8 w-8 text-brand-amber" aria-hidden />
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                    available ? "bg-brand-orange text-white" : "bg-brand-cream/10 text-brand-cream/60",
                  )}
                >
                  {available ? "Available now" : "Soon"}
                </span>
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold text-brand-cream">{title}</h3>
              <p className="mt-2 text-sm text-brand-cream/70">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
