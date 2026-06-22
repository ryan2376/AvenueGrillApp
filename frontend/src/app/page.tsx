import { Hero } from "@/components/sections/Hero";
import { StoryStrip } from "@/components/sections/StoryStrip";
import { SignatureFavorites } from "@/components/sections/SignatureFavorites";
import { DeliveryBand } from "@/components/sections/DeliveryBand";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { site } from "@/lib/site";

const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: site.name,
  description: site.description,
  servesCuisine: ["Grill", "Kenyan", "Barbecue"],
  priceRange: "KES",
  url: site.url,
  telephone: `+${site.phoneIntl}`,
  image: `${site.url}/brand/flyer-1.png`,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.address.area,
    addressRegion: site.address.town,
    addressCountry: "KE",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: site.hours.opens,
    closes: site.hours.closes,
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- structured data for SEO
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
      />
      <Hero />
      <StoryStrip />
      <SignatureFavorites />
      <DeliveryBand />
      <ClosingCta />
    </>
  );
}
