"use client";

import { useEffect, useState } from "react";
import { ShoppingCart, Loader2, AlertCircle, Clock } from "lucide-react";
import type { MenuItem, MenuResponse, StoreStatus } from "@/lib/types";
import { getMenu, getStoreStatus } from "@/lib/api";
import { useCart, cartCount } from "@/store/cart";
import { useHydrated } from "@/lib/useHydrated";
import { MenuItemCard } from "@/components/menu/MenuItemCard";
import { CartDrawer } from "@/components/cart/CartDrawer";

export function MenuBrowser() {
  const [menu, setMenu] = useState<MenuResponse | null>(null);
  const [status, setStatus] = useState<StoreStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const hydrated = useHydrated();
  const lines = useCart((s) => s.lines);
  const add = useCart((s) => s.add);
  const openCart = useCart((s) => s.openCart);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(false);
    Promise.all([getMenu(), getStoreStatus()])
      .then(([m, s]) => {
        if (!active) return;
        setMenu(m);
        setStatus(s);
      })
      .catch(() => active && setError(true))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const handleAdd = (item: MenuItem) => {
    add(item);
    openCart();
  };

  const count = hydrated ? cartCount(lines) : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-brand-charcoal/60">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading the menu…
      </div>
    );
  }

  if (error || !menu) {
    return (
      <div className="mx-auto max-w-md px-6 py-24 text-center">
        <AlertCircle className="mx-auto h-8 w-8 text-brand-orange" />
        <p className="mt-3 font-medium text-brand-green">We couldn&apos;t load the menu.</p>
        <p className="mt-1 text-sm text-brand-charcoal/60">
          Please check your connection and try again.
        </p>
        <button
          type="button"
          onClick={() => location.reload()}
          className="mt-5 rounded-xl bg-brand-orange px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-amber"
        >
          Retry
        </button>
      </div>
    );
  }

  const categories = menu.categories.filter((c) => c.items.length > 0);

  return (
    <>
      {/* Closed banner */}
      {status && !status.isOpenNow && (
        <div className="bg-brand-amber/15">
          <div className="mx-auto flex max-w-6xl items-center gap-2 px-6 py-3 text-sm text-brand-charcoal/80">
            <Clock className="h-4 w-4 shrink-0 text-brand-orange" />
            We&apos;re currently closed. You can browse the menu — we open at {status.open} EAT.
          </div>
        </div>
      )}

      {/* Category quick-nav */}
      <nav className="sticky top-[var(--header-h)] z-30 border-b border-brand-charcoal/10 bg-brand-cream/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-6 py-3">
          {categories.map((c) => (
            <a
              key={c.id}
              href={`#${c.slug}`}
              className="whitespace-nowrap rounded-full border border-brand-green/20 px-4 py-1.5 text-sm font-medium text-brand-green hover:bg-brand-green hover:text-brand-cream"
            >
              {c.name}
            </a>
          ))}
        </div>
      </nav>

      {/* Sections */}
      {categories.map((c) => (
        <section key={c.id} id={c.slug} className="mx-auto max-w-6xl scroll-mt-32 px-6 py-10">
          <div className="mb-6">
            <h2 className="font-display text-2xl font-bold text-brand-green sm:text-3xl">{c.name}</h2>
            {c.tagline && <p className="mt-1 text-brand-charcoal/60">{c.tagline}</p>}
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {c.items.map((item) => (
              <MenuItemCard key={item.id} item={item} onAdd={handleAdd} />
            ))}
          </div>
        </section>
      ))}

      {/* Floating cart button */}
      {count > 0 && (
        <button
          type="button"
          onClick={openCart}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-brand-orange px-5 py-3.5 font-semibold text-white shadow-lg transition-colors hover:bg-brand-amber"
          aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
        >
          <ShoppingCart className="h-5 w-5" />
          <span>View order</span>
          <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-white px-1.5 text-sm font-bold text-brand-orange">
            {count}
          </span>
        </button>
      )}

      <CartDrawer
        storeOpenNow={status?.isOpenNow ?? false}
        openTime={status?.open ?? "10:00"}
      />
    </>
  );
}
