import {
  Drumstick,
  Fish,
  Beef,
  Salad,
  CupSoda,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

/**
 * Signature menu categories shown on the home page and menu teaser.
 * These are brand showcase items — the full, orderable menu with real prices
 * and photography arrives in Phase 2. Prices here are illustrative placeholders.
 */
export interface SignatureCategory {
  name: string;
  blurb: string;
  icon: LucideIcon;
  /** Illustrative "from" price in KES (placeholder until real menu data). */
  fromKes: number;
}

export const signatureCategories: SignatureCategory[] = [
  {
    name: "Grilled Chicken",
    blurb: "Juicy, tender & perfectly seasoned over the open flame.",
    icon: Drumstick,
    fromKes: 450,
  },
  {
    name: "Grilled Fish",
    blurb: "Fresh from the grill, light and full of flavour.",
    icon: Fish,
    fromKes: 600,
  },
  {
    name: "Hearty Beef",
    blurb: "Rich, savoury and satisfying — the way beef should be.",
    icon: Beef,
    fromKes: 550,
  },
  {
    name: "Rice & Sides",
    blurb: "The perfect blend to complete every craving.",
    icon: UtensilsCrossed,
    fromKes: 200,
  },
  {
    name: "Fresh Salads",
    blurb: "Crisp, colourful sides made to complement your meal.",
    icon: Salad,
    fromKes: 250,
  },
  {
    name: "Milkshakes",
    blurb: "Thick, creamy and indulgent — a treat for every visit.",
    icon: CupSoda,
    fromKes: 300,
  },
];
