import { Flame, Leaf, ChefHat, HeartHandshake, Sparkles } from "lucide-react";

const valueProps = [
  { icon: Leaf, title: "Fresh Ingredients", body: "Sourced fresh, prepared daily." },
  { icon: ChefHat, title: "Expertly Prepared", body: "Grilled to perfection by our chefs." },
  { icon: HeartHandshake, title: "Warm Hospitality", body: "A welcoming space for you and yours." },
  { icon: Sparkles, title: "Made for Memories", body: "Good times. Great flavors." },
];

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-brand-green text-brand-cream">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brand-green700 px-4 py-1.5 text-sm font-medium">
            <Flame className="h-4 w-4 text-brand-orange" />
            Gitimbine, Meru · Open daily 10:00–22:00
          </div>
          <h1 className="text-4xl font-bold leading-tight sm:text-6xl">
            Good Food. <span className="text-brand-amber">Great Mood.</span>
            <br />
            Better Together.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-brand-cream/80">
            Delicious by passion, served with dedication. Order your favourites from Avenue
            Grill &amp; Restaurant for delivery across Meru.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button className="rounded-xl bg-brand-orange px-8 py-3 text-base font-semibold text-white transition hover:bg-brand-amber">
              Order Now
            </button>
            <button className="rounded-xl border border-brand-cream/40 px-8 py-3 text-base font-semibold transition hover:bg-brand-green700">
              View Menu
            </button>
          </div>
          <p className="mt-6 text-sm text-brand-cream/60">
            🚧 Phase 0 skeleton — full menu &amp; online ordering arrive in upcoming phases.
          </p>
        </div>
      </section>

      {/* Value props */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-center text-2xl font-bold text-brand-green sm:text-3xl">
          Savor Our Specialties
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {valueProps.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl border border-brand-charcoal/10 bg-white p-6 text-center shadow-sm"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange/10">
                <Icon className="h-6 w-6 text-brand-orange" />
              </div>
              <h3 className="font-semibold text-brand-green">{title}</h3>
              <p className="mt-2 text-sm text-brand-charcoal/70">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-charcoal text-brand-cream/80">
        <div className="mx-auto max-w-6xl px-6 py-12 text-center text-sm">
          <p className="text-lg font-semibold text-brand-cream">Avenue Grill &amp; Restaurant</p>
          <p className="mt-2">Gitimbine, Meru, Kenya · 📞 0741 029 405 · Open daily 10:00–22:00</p>
          <p className="mt-4 text-brand-cream/50">
            © {new Date().getFullYear()} Avenue Grill &amp; Restaurant. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
