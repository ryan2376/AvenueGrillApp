import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your Avenue Grill delivery order — pay with M-Pesa or cash on delivery.",
};

export default function CheckoutPage() {
  return (
    <main className="bg-brand-cream">
      <CheckoutForm />
    </main>
  );
}
