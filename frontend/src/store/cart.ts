import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { MenuItem } from "@/lib/types";
import { formatKes } from "@/lib/money";

export interface CartLine {
  itemId: string;
  name: string;
  imageUrl: string | null;
  unitPriceKes: number;
  quantity: number;
}

interface CartState {
  lines: CartLine[];
  isOpen: boolean;
  add: (item: MenuItem) => void;
  increment: (itemId: string) => void;
  decrement: (itemId: string) => void;
  remove: (itemId: string) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
}

// SSR-safe storage: client components are still rendered on the server, where
// localStorage is undefined — fall back to a no-op store there.
const safeStorage = createJSONStorage(() =>
  typeof window !== "undefined"
    ? window.localStorage
    : ({ getItem: () => null, setItem: () => {}, removeItem: () => {} } as unknown as Storage),
);

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      isOpen: false,
      add: (item) =>
        set((s) => {
          const existing = s.lines.find((l) => l.itemId === item.id);
          if (existing) {
            return {
              lines: s.lines.map((l) =>
                l.itemId === item.id ? { ...l, quantity: l.quantity + 1 } : l,
              ),
            };
          }
          return {
            lines: [
              ...s.lines,
              {
                itemId: item.id,
                name: item.name,
                imageUrl: item.imageUrl,
                unitPriceKes: item.priceKes,
                quantity: 1,
              },
            ],
          };
        }),
      increment: (itemId) =>
        set((s) => ({
          lines: s.lines.map((l) =>
            l.itemId === itemId ? { ...l, quantity: l.quantity + 1 } : l,
          ),
        })),
      decrement: (itemId) =>
        set((s) => ({
          lines: s.lines.flatMap((l) =>
            l.itemId === itemId
              ? l.quantity > 1
                ? [{ ...l, quantity: l.quantity - 1 }]
                : []
              : [l],
          ),
        })),
      remove: (itemId) =>
        set((s) => ({ lines: s.lines.filter((l) => l.itemId !== itemId) })),
      clear: () => set({ lines: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    {
      name: "avenue-cart",
      storage: safeStorage,
      // only persist the contents, not the open/closed UI state
      partialize: (s) => ({ lines: s.lines }),
    },
  ),
);

// ── Pure derived helpers (compute from lines so they stay reactive) ──
export const cartCount = (lines: CartLine[]): number =>
  lines.reduce((n, l) => n + l.quantity, 0);

export const cartSubtotalKes = (lines: CartLine[]): number =>
  lines.reduce((n, l) => n + l.unitPriceKes * l.quantity, 0);

/** Build a pre-filled WhatsApp order message from the cart contents. */
export function buildWhatsAppOrder(lines: CartLine[]): string {
  const items = lines
    .map((l) => `• ${l.quantity}× ${l.name} — ${formatKes(l.unitPriceKes * l.quantity)}`)
    .join("\n");
  const subtotal = formatKes(cartSubtotalKes(lines));
  return [
    "*New Order — Avenue Grill* 🔥",
    "",
    items,
    "",
    `Subtotal: ${subtotal}`,
    "_(Delivery fee confirmed on delivery)_",
    "",
    "Name:",
    "Delivery location / landmark:",
    "Payment: M-Pesa / Cash on delivery",
  ].join("\n");
}
