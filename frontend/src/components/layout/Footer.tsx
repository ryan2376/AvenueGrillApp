import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Clock, Facebook, Instagram, Mail } from "lucide-react";
import { site, navLinks } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-green text-brand-cream/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <Link href="/" className="inline-flex items-center" aria-label={site.name}>
            <Image
              src="/brand/logo-light.png"
              alt={`${site.name} logo`}
              width={1274}
              height={837}
              className="h-16 w-auto"
            />
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-brand-cream/70">
            {site.subTagline}
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={site.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="rounded-full bg-brand-green700 p-2 transition-colors hover:bg-brand-orange hover:text-white"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href={site.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="rounded-full bg-brand-green700 p-2 transition-colors hover:bg-brand-orange hover:text-white"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={site.socials.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="rounded-full bg-brand-green700 p-2 transition-colors hover:bg-brand-orange hover:text-white"
            >
              {/* lucide has no TikTok glyph — inline brand SVG */}
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                <path d="M16.5 3c.3 2.2 1.6 3.7 3.7 3.9v2.5c-1.3.1-2.5-.3-3.7-1v5.9c0 3.4-2.6 5.7-5.8 5.2-2.6-.4-4.3-2.6-4.1-5.2.2-2.4 2.2-4.3 4.7-4.2.3 0 .6 0 1 .1v2.7c-.3-.1-.6-.2-1-.2-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2V3h3.5z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Explore */}
        <div>
          <h3 className="font-display text-base font-semibold text-brand-cream">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-brand-amber">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-display text-base font-semibold text-brand-cream">Get in touch</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-amber" />
              <span>{site.address.full}</span>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-amber" />
              <a href={`tel:${site.phoneIntl}`} className="hover:text-brand-amber">
                {site.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-amber" />
              <a href={`mailto:${site.email}`} className="hover:text-brand-amber">
                {site.email}
              </a>
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h3 className="font-display text-base font-semibold text-brand-cream">Opening hours</h3>
          <p className="mt-4 flex items-start gap-2 text-sm">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-amber" />
            <span>{site.hours.display} EAT</span>
          </p>
          <p className="mt-4 text-sm text-brand-cream/70">
            Delivery across {site.address.town} &amp; {site.address.area}.
          </p>
        </div>
      </div>

      <div className="border-t border-brand-cream/10">
        <div className="mx-auto max-w-6xl px-6 py-5 text-center text-xs text-brand-cream/50">
          © {year} {site.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
