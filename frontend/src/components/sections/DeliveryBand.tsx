import Image from "next/image";
import { Check } from "lucide-react";
import { site } from "@/lib/site";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { WhatsAppOrderButton } from "@/components/WhatsAppOrderButton";

const points = [
  `Delivered hot across ${site.address.area}, Makutano & ${site.address.town} town`,
  "Pay with M-Pesa or cash on delivery",
  "Takeaway, dine-in & catering coming soon",
];

export function DeliveryBand() {
  return (
    <Section tone="green" size="base">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Words */}
        <div>
          <Eyebrow onDark>Delivery</Eyebrow>
          <h2 className="mt-3 text-h2 text-brand-cream">Hot food, brought to you</h2>
          <p className="mt-5 max-w-xl text-body text-brand-cream/80">
            We&apos;re starting with delivery so you can enjoy Avenue Grill at home. Order on WhatsApp
            or online, and we&apos;ll bring it over.
          </p>
          <ul className="mt-6 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-brand-cream/90">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-amber" aria-hidden />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <WhatsAppOrderButton size="lg" label="Order on WhatsApp" />
          </div>
        </div>

        {/* Photo */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-card lg:order-last">
          <Image
            src="/food/delivery.jpg"
            alt="Avenue Grill order packed fresh for delivery"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </Section>
  );
}
