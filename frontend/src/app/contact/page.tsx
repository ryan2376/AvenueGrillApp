import type { Metadata } from "next";
import { Phone, MapPin, Clock, MessageCircle, Mail } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact & Location",
  description: `Find and reach ${site.name} in ${site.address.full}. Call, WhatsApp, or order for delivery. ${site.hours.display} EAT.`,
};

export default function ContactPage() {
  return (
    <main>
      <section className="bg-brand-green text-brand-cream">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center sm:py-20">
          <p className="font-semibold uppercase tracking-wider text-brand-amber">Get in touch</p>
          <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Come hungry, leave happy</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-brand-cream/80">
            We&apos;re your neighbourhood dining spot in {site.address.area}, {site.address.town}.
            Reach us any day, {site.hours.display} EAT.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-2">
        {/* Contact details */}
        <div className="space-y-4">
          <ContactCard icon={Phone} title="Call us" lines={[site.phoneDisplay]} href={`tel:${site.phoneIntl}`} cta="Call now" />
          <ContactCard
            icon={MessageCircle}
            title="WhatsApp"
            lines={[site.phoneDisplay, "Quick orders & questions"]}
            href={whatsappLink(`Hello ${site.shortName}! I have a question.`)}
            cta="Chat on WhatsApp"
            external
          />
          <ContactCard icon={MapPin} title="Location" lines={[site.address.full]} href={site.mapLink} cta="Get directions" external />
          <ContactCard icon={Mail} title="Email" lines={[site.email]} href={`mailto:${site.email}`} cta="Send an email" />
          <div className="flex items-start gap-4 rounded-2xl border border-brand-charcoal/10 bg-white p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-orange/10 text-brand-orange">
              <Clock className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold text-brand-green">Opening hours</h2>
              <p className="mt-1 text-sm text-brand-charcoal/70">{site.hours.display} EAT · 7 days a week</p>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="overflow-hidden rounded-3xl border border-brand-charcoal/10 shadow-sm">
          <iframe
            title={`Map showing ${site.name} in ${site.address.full}`}
            src={site.mapEmbed}
            className="h-full min-h-[420px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>
    </main>
  );
}

function ContactCard({
  icon: Icon,
  title,
  lines,
  href,
  cta,
  external = false,
}: {
  icon: typeof Phone;
  title: string;
  lines: string[];
  href: string;
  cta: string;
  external?: boolean;
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-brand-charcoal/10 bg-white p-5">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-orange/10 text-brand-orange">
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <div className="flex-1">
        <h2 className="font-display text-lg font-semibold text-brand-green">{title}</h2>
        {lines.map((line) => (
          <p key={line} className="mt-0.5 text-sm text-brand-charcoal/70">
            {line}
          </p>
        ))}
      </div>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "shrink-0 self-center")}
      >
        {cta}
      </a>
    </div>
  );
}
