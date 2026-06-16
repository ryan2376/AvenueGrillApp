"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { site, navLinks } from "@/lib/site";
import { WhatsAppOrderButton } from "@/components/WhatsAppOrderButton";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-charcoal/10 bg-brand-cream/90 backdrop-blur supports-[backdrop-filter]:bg-brand-cream/75">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo (wordmark included in the image) — black-text version for the light header */}
        <Link href="/" className="flex items-center" aria-label={site.name}>
          <Image
            src="/brand/logo-dark.png"
            alt={`${site.name} logo`}
            width={1274}
            height={837}
            className="h-12 w-auto sm:h-14"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive(link.href)
                    ? "bg-brand-green/10 text-brand-green"
                    : "text-brand-charcoal/70 hover:text-brand-green",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href={`tel:${site.phoneIntl}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-green hover:text-brand-orange"
          >
            <Phone className="h-4 w-4" aria-hidden />
            {site.phoneDisplay}
          </a>
          <WhatsAppOrderButton size="sm" label="Order Now" />
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-brand-green md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-brand-charcoal/10 bg-brand-cream md:hidden">
          <ul className="space-y-1 px-4 py-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-lg px-3 py-2 text-base font-medium",
                    isActive(link.href)
                      ? "bg-brand-green/10 text-brand-green"
                      : "text-brand-charcoal/80",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 border-t border-brand-charcoal/10 px-4 py-4">
            <a
              href={`tel:${site.phoneIntl}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-brand-green"
            >
              <Phone className="h-4 w-4" aria-hidden />
              {site.phoneDisplay}
            </a>
            <WhatsAppOrderButton size="md" label="Order on WhatsApp" />
          </div>
        </div>
      )}
    </header>
  );
}
