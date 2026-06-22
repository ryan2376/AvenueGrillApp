import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function StoryStrip() {
  return (
    <Section tone="cream" size="base">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Photo */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-card sm:aspect-[5/4] lg:aspect-[4/5]">
          <Image
            src="/food/grilled-tilapia.jpg"
            alt="Whole tilapia grilled over open flame"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Words */}
        <div>
          <Eyebrow>Our kitchen</Eyebrow>
          <h2 className="mt-3 text-h2">Off the flame, to your door</h2>
          <div className="mt-5 space-y-4 text-body text-brand-charcoal/75">
            <p>
              We grill over open flame, season by hand, and cook to order — chicken, whole tilapia,
              pilau, githeri and the sides that go with them. Nothing sits under a heat lamp.
            </p>
            <p>
              We cook the way we&apos;d cook for family, because most days that&apos;s exactly who
              we&apos;re feeding. Order it and we&apos;ll send it out hot.
            </p>
          </div>
          <Link
            href="/about"
            className="mt-7 inline-flex items-center gap-1.5 text-small font-semibold text-brand-orange underline-offset-4 hover:underline"
          >
            More about us
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </Section>
  );
}
