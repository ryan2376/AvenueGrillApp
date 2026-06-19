import type { Metadata } from "next";
import { OrderTracker } from "@/components/order/OrderTracker";

export const metadata: Metadata = {
  title: "Your order",
  description: "Track your Avenue Grill delivery order.",
};

export default async function OrderPage({
  params,
}: {
  params: Promise<{ reference: string }>;
}) {
  const { reference } = await params;
  return (
    <main className="bg-brand-cream">
      <OrderTracker reference={reference} />
    </main>
  );
}
