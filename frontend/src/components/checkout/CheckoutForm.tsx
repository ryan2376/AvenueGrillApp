"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, AlertCircle, ShoppingBag, ArrowLeft } from "lucide-react";
import type { DeliveryZone, PaymentMethod, StoreStatus } from "@/lib/types";
import { ApiError, createOrder, getDeliveryZones, getStoreStatus } from "@/lib/api";
import { useCart, cartSubtotalKes } from "@/store/cart";
import { useHydrated } from "@/lib/useHydrated";
import { formatKes } from "@/lib/money";
import { cn } from "@/lib/utils";

/** Light client-side check; the backend normalisation is authoritative. */
function looksLikeKenyanPhone(raw: string): boolean {
  const d = raw.replace(/[^0-9]/g, "");
  return /^0[17][0-9]{8}$/.test(d) || /^254[17][0-9]{8}$/.test(d) || /^[17][0-9]{8}$/.test(d);
}

export function CheckoutForm() {
  const router = useRouter();
  const hydrated = useHydrated();
  const lines = useCart((s) => s.lines);
  const clear = useCart((s) => s.clear);

  const [zones, setZones] = useState<DeliveryZone[]>([]);
  const [store, setStore] = useState<StoreStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [landmark, setLandmark] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("CASH");
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    let active = true;
    Promise.all([getDeliveryZones(), getStoreStatus()])
      .then(([z, s]) => {
        if (!active) return;
        setZones(z);
        setStore(s);
        if (z.length > 0) setZoneId((cur) => cur || z[0].id);
      })
      .catch(() => active && setLoadError(true))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const subtotal = cartSubtotalKes(lines);
  const selectedZone = useMemo(() => zones.find((z) => z.id === zoneId) ?? null, [zones, zoneId]);
  const deliveryFee = selectedZone?.feeKes ?? 0;
  const total = subtotal + deliveryFee;
  const empty = hydrated && lines.length === 0;

  function validate(): boolean {
    const errs: Record<string, string> = {};
    if (!contactName.trim()) errs.contactName = "Please enter your name.";
    if (!looksLikeKenyanPhone(contactPhone)) errs.contactPhone = "Enter a valid phone, e.g. 0712 345 678.";
    if (!zoneId) errs.zoneId = "Choose a delivery area.";
    if (!addressLine1.trim()) errs.addressLine1 = "Tell us where to deliver.";
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await createOrder({
        items: lines.map((l) => ({ menuItemId: l.itemId, quantity: l.quantity })),
        contactName: contactName.trim(),
        contactPhone: contactPhone.trim(),
        deliveryZoneId: zoneId,
        addressLine1: addressLine1.trim(),
        landmark: landmark.trim() || undefined,
        paymentMethod,
        notes: notes.trim() || undefined,
      });
      clear();
      router.push(`/order/${res.reference}`);
    } catch (err) {
      if (err instanceof ApiError) {
        setFormError(err.message);
      } else {
        setFormError("Something went wrong placing your order. Please try again.");
      }
      setSubmitting(false);
    }
  }

  if (!hydrated || loading) {
    return (
      <div className="flex items-center justify-center py-24 text-brand-charcoal/60">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading checkout…
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="mx-auto max-w-md px-6 py-24 text-center">
        <AlertCircle className="mx-auto h-8 w-8 text-brand-orange" />
        <p className="mt-3 font-medium text-brand-green">We couldn&apos;t load checkout.</p>
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

  if (empty) {
    return (
      <div className="mx-auto max-w-md px-6 py-24 text-center">
        <ShoppingBag className="mx-auto h-8 w-8 text-brand-charcoal/40" />
        <p className="mt-3 font-medium text-brand-green">Your cart is empty</p>
        <p className="mt-1 text-sm text-brand-charcoal/60">Add a few favourites before checking out.</p>
        <Link
          href="/menu"
          className="mt-5 inline-flex rounded-xl bg-brand-orange px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-amber"
        >
          Browse the menu
        </Link>
      </div>
    );
  }

  const inputCls =
    "mt-1 w-full rounded-xl border border-brand-charcoal/20 bg-white px-4 py-2.5 text-brand-charcoal outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20";

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <Link href="/menu" className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-green hover:text-brand-orange">
        <ArrowLeft className="h-4 w-4" /> Back to menu
      </Link>
      <h1 className="mt-3 font-display text-3xl font-bold text-brand-green sm:text-4xl">Checkout</h1>

      {store && !store.isOpenNow && (
        <p className="mt-4 rounded-xl bg-brand-amber/15 px-4 py-3 text-sm text-brand-charcoal/80">
          We&apos;re closed right now — orders open at {store.open} EAT. You can fill this in, but placing
          the order will only succeed during opening hours.
        </p>
      )}

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <label htmlFor="name" className="text-sm font-semibold text-brand-green">Full name</label>
            <input id="name" value={contactName} onChange={(e) => setContactName(e.target.value)}
              className={inputCls} placeholder="Jane Wanjiku" />
            {fieldErrors.contactName && <p className="mt-1 text-sm text-error">{fieldErrors.contactName}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="text-sm font-semibold text-brand-green">Phone number</label>
            <input id="phone" inputMode="tel" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)}
              className={inputCls} placeholder="0712 345 678" />
            {fieldErrors.contactPhone && <p className="mt-1 text-sm text-error">{fieldErrors.contactPhone}</p>}
          </div>

          <div>
            <label htmlFor="zone" className="text-sm font-semibold text-brand-green">Delivery area</label>
            <select id="zone" value={zoneId} onChange={(e) => setZoneId(e.target.value)} className={inputCls}>
              {zones.map((z) => (
                <option key={z.id} value={z.id}>
                  {z.name} — {formatKes(z.feeKes)} delivery
                </option>
              ))}
            </select>
            {fieldErrors.zoneId && <p className="mt-1 text-sm text-error">{fieldErrors.zoneId}</p>}
          </div>

          <div>
            <label htmlFor="address" className="text-sm font-semibold text-brand-green">Delivery address</label>
            <input id="address" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)}
              className={inputCls} placeholder="House / building, street" />
            {fieldErrors.addressLine1 && <p className="mt-1 text-sm text-error">{fieldErrors.addressLine1}</p>}
          </div>

          <div>
            <label htmlFor="landmark" className="text-sm font-semibold text-brand-green">
              Nearest landmark <span className="font-normal text-brand-charcoal/50">(optional)</span>
            </label>
            <input id="landmark" value={landmark} onChange={(e) => setLandmark(e.target.value)}
              className={inputCls} placeholder="e.g. opposite Gitimbine Stage" />
          </div>

          <fieldset>
            <legend className="text-sm font-semibold text-brand-green">Payment</legend>
            <div className="mt-2 space-y-2">
              <label className={cn(
                "flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3",
                paymentMethod === "CASH" ? "border-brand-green bg-brand-green/5" : "border-brand-charcoal/20",
              )}>
                <input type="radio" name="payment" value="CASH" checked={paymentMethod === "CASH"}
                  onChange={() => setPaymentMethod("CASH")} className="mt-1 accent-brand-green" />
                <span>
                  <span className="block font-medium text-brand-charcoal">Cash on delivery</span>
                  <span className="block text-sm text-brand-charcoal/60">Pay the rider when your order arrives.</span>
                </span>
              </label>
              <label className={cn(
                "flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3",
                paymentMethod === "MPESA" ? "border-brand-green bg-brand-green/5" : "border-brand-charcoal/20",
              )}>
                <input type="radio" name="payment" value="MPESA" checked={paymentMethod === "MPESA"}
                  onChange={() => setPaymentMethod("MPESA")} className="mt-1 accent-brand-green" />
                <span>
                  <span className="block font-medium text-brand-charcoal">
                    M-Pesa <span className="rounded-full bg-brand-amber/20 px-2 py-0.5 text-xs font-semibold text-brand-orange">Coming soon</span>
                  </span>
                  <span className="block text-sm text-brand-charcoal/60">
                    We&apos;ll save your order and confirm M-Pesa payment with you directly for now.
                  </span>
                </span>
              </label>
            </div>
          </fieldset>

          <div>
            <label htmlFor="notes" className="text-sm font-semibold text-brand-green">
              Order notes <span className="font-normal text-brand-charcoal/50">(optional)</span>
            </label>
            <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3}
              className={inputCls} placeholder="e.g. extra kachumbari, call on arrival" />
          </div>

          {formError && (
            <p className="flex items-center gap-2 rounded-xl bg-error/10 px-4 py-3 text-sm text-error">
              <AlertCircle className="h-4 w-4 shrink-0" /> {formError}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-orange px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-amber disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <ShoppingBag className="h-5 w-5" />}
            {submitting ? "Placing order…" : `Place order — ${formatKes(total)}`}
          </button>
        </form>

        {/* Summary */}
        <aside className="h-fit rounded-2xl border border-brand-charcoal/10 bg-white p-5 lg:sticky lg:top-24">
          <h2 className="font-display text-lg font-bold text-brand-green">Order summary</h2>
          <ul className="mt-4 space-y-3">
            {lines.map((l) => (
              <li key={l.itemId} className="flex justify-between gap-3 text-sm">
                <span className="text-brand-charcoal/80">
                  {l.quantity}× {l.name}
                </span>
                <span className="font-medium text-brand-charcoal">{formatKes(l.unitPriceKes * l.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-2 border-t border-brand-charcoal/10 pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-brand-charcoal/70">Subtotal</span>
              <span className="font-medium">{formatKes(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-charcoal/70">
                Delivery{selectedZone ? ` — ${selectedZone.name}` : ""}
              </span>
              <span className="font-medium">{formatKes(deliveryFee)}</span>
            </div>
            <div className="flex justify-between border-t border-brand-charcoal/10 pt-2 text-base">
              <span className="font-semibold text-brand-green">Total</span>
              <span className="font-display text-lg font-bold text-brand-green">{formatKes(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
