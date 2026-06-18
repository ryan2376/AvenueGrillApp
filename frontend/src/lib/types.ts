/** Types mirroring the backend API (see docs/04-API-SPECIFICATION.md). */

export interface MenuOptionValue {
  id: string;
  name: string;
  priceDeltaKes: number;
}

export interface MenuItemOption {
  id: string;
  name: string;
  required: boolean;
  minSelect: number;
  maxSelect: number;
  values: MenuOptionValue[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  priceKes: number; // minor units (cents)
  imageUrl: string | null;
  available: boolean;
  featured: boolean;
  options: MenuItemOption[];
}

export interface MenuCategory {
  id: string;
  name: string;
  slug: string;
  tagline: string | null;
  sortOrder: number;
  items: MenuItem[];
}

export interface MenuResponse {
  categories: MenuCategory[];
}

export interface StoreStatus {
  acceptingOrders: boolean;
  open: string; // "HH:mm"
  close: string; // "HH:mm"
  isOpenNow: boolean;
  minOrderKes: number;
  defaultDeliveryFeeKes: number;
  timezone: string; // "EAT"
}
