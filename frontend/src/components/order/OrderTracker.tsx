"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, AlertCircle, Clock, MapPin, Phone, ChefHat } from "lucide-react";
import type { OrderDetail } from "@/lib/types";
import { getOrder, getOrderStatus } from "@/lib/api";
import { formatKes } from "@/lib/money";

const TERMINAL = new Set(["DELIVERED", "CANCELLED"]);

const STATUS_LABEL: Record<string, string> = {
  PENDING_PAYMENT: "Awaiting payment",
  CONFIRMED: "Confirmed",
  PREPARING: "Being prepared",
  OUT_FOR_DELIVERY: "Out for delivery",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

function formatEat(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-KE", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Africa/Nairobi",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function OrderTracker({ reference }: { reference: string }) {
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let active = true;
    getOrder(reference)
      .then((o) => {
        if (!active) return;
        setOrder(o);
        setStatus(o.status);
      })
      .catch(() => active && setNotFound(true))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [reference]);

  // Poll for status changes until the order reaches a terminal state.
  useEffect(() => {
    if (!order || (status && TERMINAL.has(status))) return;
    const id = setInterval(() => {
      getOrderStatus(reference)
        .then((s) => setStatus(s.status))
        .catch(() => {});
    }, 15000);
    return () => clearInterval(id);
  }, [order, status, reference]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-brand-charcoal/60">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading your order…
      </div>
    );
  }

  if (notFound || !order) {
    return (
      <div className="mx-auto max-w-md px-6 py-24 text-center">
        <AlertCircle className="mx-auto h-8 w-8 text-brand-orange" />
        <p className="mt-3 font-medium text-brand-green">We couldn&apos;t find that order.</p>
        <p className="mt-1 text-sm text-brand-charcoal/60">Check the reference and try again.</p>
        <Link href="/menu" className="mt-5 inline-flex rounded-xl bg-brand-orange px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-amber">
          Back to menu
        </Link>
      </div>
    );
  }

  const current = status ?? order.status;
  const isPendingPayment = current === "PENDING_PAYMENT";

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      {/* Header */}
      <div className="text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-brand-green" />
        <h1 className="mt-4 font-display text-3xl font-bold text-brand-green sm:text-4xl">
          {isPendingPayment ? "Order received!" : "Order confirmed!"}
        </h1>
        <p className="mt-2 text-brand-charcoal/70">
          Thank you, {order.contactName.split(" ")[0]}. Your order reference is
        </p>
        <p className="mt-1 font-display text-2xl font-bold tracking-wide text-brand-orange">{order.reference}</p>
        <p className="mt-1 text-sm text-brand-charcoal/50">Placed {formatEat(order.placedAt)} EAT</p>
      </div>

      {/* Status + payment notice */}
      <div className="mt-8 rounded-2xl border border-brand-charcoal/10 bg-white p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
            {isPendingPayment ? <Clock className="h-5 w-5" /> : <ChefHat className="h-5 w-5" />}
          </span>
          <div>
            <p className="text-sm text-brand-charcoal/60">Status</p>
            <p className="font-semibold text-brand-green">{STATUS_LABEL[current] ?? current}</p>
          </div>
        </div>

        {isPendingPayment ? (
          <p className="mt-4 rounded-xl bg-brand-amber/15 px-4 py-3 text-sm text-brand-charcoal/80">
            You chose <strong>M-Pesa</strong>. Online M-Pesa payment is coming soon — for now we&apos;ll
            confirm payment with you directly on {order.contactPhone}. Your order is saved.
          </p>
        ) : (
          <p className="mt-4 rounded-xl bg-brand-green/5 px-4 py-3 text-sm text-brand-charcoal/80">
            We&apos;ve got your order and we&apos;ll start preparing it. Pay <strong>cash on delivery</strong> when it arrives.
          </p>
        )}
      </div>

      {/* Delivery details */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-brand-charcoal/10 bg-white p-5">
          <p className="flex items-center gap-2 text-sm font-semibold text-brand-green">
            <MapPin className="h-4 w-4 text-brand-orange" /> Delivering to
          </p>
          <p className="mt-2 text-brand-charcoal">{order.addressLine1}</p>
          {order.landmark && <p className="text-sm text-brand-charcoal/60">{order.landmark}</p>}
          <p className="mt-1 text-sm text-brand-charcoal/60">{order.deliveryZone}</p>
        </div>
        <div className="rounded-2xl border border-brand-charcoal/10 bg-white p-5">
          <p className="flex items-center gap-2 text-sm font-semibold text-brand-green">
            <Phone className="h-4 w-4 text-brand-orange" /> Contact
          </p>
          <p className="mt-2 text-brand-charcoal">{order.contactName}</p>
          <p className="text-sm text-brand-charcoal/60">{order.contactPhone}</p>
        </div>
      </div>

      {/* Items + totals */}
      <div className="mt-6 rounded-2xl border border-brand-charcoal/10 bg-white p-6">
        <h2 className="font-display text-lg font-bold text-brand-green">Your order</h2>
        <ul className="mt-4 space-y-3">
          {order.items.map((it, i) => (
            <li key={i} className="flex justify-between gap-3 text-sm">
              <span className="text-brand-charcoal/80">{it.quantity}× {it.name}</span>
              <span className="font-medium text-brand-charcoal">{formatKes(it.lineTotalKes)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 space-y-2 border-t border-brand-charcoal/10 pt-4 text-sm">
          <div className="flex justify-between">
            <span className="text-brand-charcoal/70">Subtotal</span>
            <span className="font-medium">{formatKes(order.subtotalKes)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-brand-charcoal/70">Delivery</span>
            <span className="font-medium">{formatKes(order.deliveryFeeKes)}</span>
          </div>
          <div className="flex justify-between border-t border-brand-charcoal/10 pt-2 text-base">
            <span className="font-semibold text-brand-green">Total</span>
            <span className="font-display text-lg font-bold text-brand-green">{formatKes(order.totalKes)}</span>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link href="/menu" className="inline-flex rounded-xl bg-brand-orange px-6 py-3 text-sm font-semibold text-white hover:bg-brand-amber">
          Order something else
        </Link>
      </div>
    </div>
  );
}
