/**
 * Central brand & site configuration. Single source of truth for contact
 * details, links, and copy used across the marketing site.
 * Mirrors docs/00-PROJECT-OVERVIEW.md and docs/06-DESIGN-SYSTEM.md.
 */
export const site = {
  name: "Avenue Grill & Restaurant",
  shortName: "Avenue Grill",
  tagline: "Good Food. Great Mood. Better Together.",
  subTagline: "Delicious by passion, served with dedication.",
  description:
    "Avenue Grill & Restaurant in Gitimbine, Meru — grilled to perfection. Browse our favourites and order online for delivery across Meru.",
  url: "https://avenuegrillrestaurant.co.ke",

  // Contact
  phoneDisplay: "0741 029 405",
  phoneIntl: "254741029405", // tel/wa.me format
  whatsapp: "254741029405",
  email: "hello@avenuegrillrestaurant.co.ke", // placeholder — confirm real address

  address: {
    area: "Gitimbine",
    town: "Meru",
    country: "Kenya",
    full: "Gitimbine, Meru, Kenya",
  },

  hours: {
    display: "Open daily 10:00 – 22:00",
    opens: "10:00",
    closes: "22:00",
  },

  // Social links — placeholders until real handles are confirmed
  socials: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    tiktok: "https://tiktok.com",
  },

  // Maps (no API key needed for the embed)
  mapEmbed:
    "https://www.google.com/maps?q=Gitimbine%2C%20Meru%2C%20Kenya&z=15&output=embed",
  mapLink:
    "https://www.google.com/maps/search/?api=1&query=Gitimbine%2C%20Meru%2C%20Kenya",
} as const;

/** Build a WhatsApp click-to-chat deep link with a pre-filled message. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Primary navigation used by the header and footer. */
export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;
