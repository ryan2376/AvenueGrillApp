"use client";

import Image from "next/image";
import { Minus, Plus, Trash2, X, MessageCircle, Clock } from "lucide-react";
import {
  useCart,
  cartSubtotalKes,
  buildWhatsAppOrder,
} from "@/store/cart";
import { useHydrated } from "@/lib/useHydrated";
import { formatKes } from "@/lib/money";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

export function CartDrawer({
  storeOpenNow,
  openTime,
}: {
  storeOpenNow: boolean;
  openTime: string;
}) {
  const hydrated = useHydrated();
  const { lines, isOpen, closeCart, increment, decrement, remove, clear } = useCart();

  const subtotal = cartSubtotalKes(lines);
  const empty = lines.length === 0;
  const canOrder = !empty && storeOpenNow;

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/40 transition-opacity",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={closeCart}
        aria-hidden
      />

      {/* Panel */}
      <aside
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-brand-cream shadow-2xl transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
        aria-label="Your order"
        aria-modal="true"
      >
        <header className="flex items-center justify-between border-b border-brand-charcoal/10 px-5 py-4">
          <h2 className="font-display text-xl font-bold text-brand-green">Your order</h2>
          <button
            type="button"
            onClick={closeCart}
            className="rounded-lg p-2 text-brand-charcoal/60 hover:bg-brand-charcoal/5"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {/* Lines */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {!hydrated ? null : empty ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-brand-charcoal/60">
              <p className="font-medium">Your cart is empty</p>
              <p className="mt-1 text-sm">Add some favourites to get started.</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {lines.map((l) => (
                <li key={l.itemId} className="flex gap-3">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white">
                    {l.imageUrl && (
                      <Image src={l.imageUrl} alt={l.name} fill sizes="64px" className="object-cover" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium text-brand-green">{l.name}</p>
                      <button
                        type="button"
                        onClick={() => remove(l.itemId)}
                        className="text-brand-charcoal/40 hover:text-error"
                        aria-label={`Remove ${l.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-sm text-brand-charcoal/60">{formatKes(l.unitPriceKes)} each</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => decrement(l.itemId)}
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-brand-charcoal/20 hover:bg-white"
                          aria-label={`Decrease ${l.name}`}
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold">{l.quantity}</span>
                        <button
                          type="button"
                          onClick={() => increment(l.itemId)}
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-brand-charcoal/20 hover:bg-white"
                          aria-label={`Increase ${l.name}`}
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="text-sm font-semibold text-brand-charcoal">
                        {formatKes(l.unitPriceKes * l.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {hydrated && !empty && (
          <footer className="border-t border-brand-charcoal/10 px-5 py-4">
            <div className="flex items-center justify-between text-base">
              <span className="text-brand-charcoal/70">Subtotal</span>
              <span className="font-display text-lg font-bold text-brand-green">
                {formatKes(subtotal)}
              </span>
            </div>
            <p className="mt-1 text-xs text-brand-charcoal/50">
              Delivery fee is confirmed on delivery. Online checkout & M-Pesa are coming soon.
            </p>

            {!storeOpenNow && (
              <p className="mt-3 flex items-center gap-2 rounded-lg bg-brand-amber/15 px-3 py-2 text-sm text-brand-charcoal/80">
                <Clock className="h-4 w-4 text-brand-orange" />
                We&apos;re closed right now — we open at {openTime}.
              </p>
            )}

            <a
              href={canOrder ? whatsappLink(buildWhatsAppOrder(lines)) : undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!canOrder}
              className={cn(
                "mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold text-white transition-colors",
                canOrder
                  ? "bg-[#25D366] hover:bg-[#1ebe5b]"
                  : "pointer-events-none bg-brand-charcoal/30",
              )}
            >
              <MessageCircle className="h-5 w-5" />
              Order on WhatsApp
            </a>
            <button
              type="button"
              onClick={clear}
              className="mt-2 w-full rounded-xl px-6 py-2 text-sm font-medium text-brand-charcoal/60 hover:text-error"
            >
              Clear cart
            </button>
          </footer>
        )}
      </aside>
    </>
  );
}
