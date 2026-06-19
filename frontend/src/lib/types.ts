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

// ── Orders (Phase 3) ──

export interface DeliveryZone {
  id: string;
  name: string;
  slug: string;
  feeKes: number; // minor units
}

export type PaymentMethod = "CASH" | "MPESA";

export interface CreateOrderItem {
  menuItemId: string;
  quantity: number;
}

export interface CreateOrderRequest {
  items: CreateOrderItem[];
  contactName: string;
  contactPhone: string;
  deliveryZoneId: string;
  addressLine1: string;
  landmark?: string;
  paymentMethod: PaymentMethod;
  notes?: string;
}

export interface OrderResponse {
  reference: string;
  status: string;
  subtotalKes: number;
  deliveryFeeKes: number;
  totalKes: number;
  paymentMethod: PaymentMethod;
  paymentState: string;
  payment: { required: boolean; state: string };
}

export interface OrderDetail {
  reference: string;
  status: string;
  contactName: string;
  contactPhone: string;
  deliveryZone: string;
  addressLine1: string;
  landmark: string | null;
  subtotalKes: number;
  deliveryFeeKes: number;
  totalKes: number;
  paymentMethod: PaymentMethod;
  paymentState: string;
  notes: string | null;
  placedAt: string; // ISO instant
  items: Array<{
    name: string;
    quantity: number;
    unitPriceKes: number;
    lineTotalKes: number;
  }>;
  statusHistory: Array<{ status: string; at: string }>;
}

export interface OrderStatusResponse {
  reference: string;
  status: string;
  paymentState: string;
}
