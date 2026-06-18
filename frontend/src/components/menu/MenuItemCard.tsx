"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import type { MenuItem } from "@/lib/types";
import { formatKes } from "@/lib/money";
import { cn } from "@/lib/utils";

export function MenuItemCard({
  item,
  onAdd,
}: {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
}) {
  const soldOut = !item.available;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-brand-charcoal/10 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden">
        {item.imageUrl && (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={cn(
              "object-cover transition-transform duration-500 group-hover:scale-105",
              soldOut && "grayscale",
            )}
          />
        )}
        {soldOut && (
          <span className="absolute left-3 top-3 rounded-full bg-brand-charcoal/80 px-3 py-1 text-xs font-semibold text-white">
            Sold out
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-semibold text-brand-green">{item.name}</h3>
        {item.description && (
          <p className="mt-1 flex-1 text-sm text-brand-charcoal/70">{item.description}</p>
        )}
        <div className="mt-4 flex items-center justify-between">
          <span className="font-semibold text-brand-orange">{formatKes(item.priceKes)}</span>
          <button
            type="button"
            disabled={soldOut}
            onClick={() => onAdd(item)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold text-white transition-colors",
              soldOut
                ? "cursor-not-allowed bg-brand-charcoal/30"
                : "bg-brand-orange hover:bg-brand-amber",
            )}
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
