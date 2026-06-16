/**
 * Menu showcase data for the marketing site (Phase 1). Real dishes & photos,
 * with illustrative "from" prices in KES (placeholders until the orderable
 * menu with final prices lands in Phase 2).
 */
export interface MenuItem {
  name: string;
  blurb: string;
  image: string; // path under /public
  fromKes: number;
}

export interface MenuSection {
  title: string;
  tagline: string;
  items: MenuItem[];
}

export const menuSections: MenuSection[] = [
  {
    title: "Off the Grill",
    tagline: "Flame-grilled to perfection",
    items: [
      {
        name: "Grilled Chicken",
        blurb: "Juicy, tender and perfectly seasoned over the open flame.",
        image: "/food/grilled-chicken.jpg",
        fromKes: 450,
      },
      {
        name: "Grilled Tilapia",
        blurb: "Whole fresh tilapia, charred and full of flavour, with lemon.",
        image: "/food/grilled-tilapia.jpg",
        fromKes: 600,
      },
    ],
  },
  {
    title: "Kenyan Favourites",
    tagline: "The tastes of home",
    items: [
      {
        name: "Pilau",
        blurb: "Fragrant spiced rice with golden onions, served with kachumbari.",
        image: "/food/pilau.jpg",
        fromKes: 250,
      },
      {
        name: "Githeri",
        blurb: "Hearty maize and beans sautéed with vegetables — wholesome and filling.",
        image: "/food/githeri.jpg",
        fromKes: 200,
      },
      {
        name: "Mukimo",
        blurb: "Creamy mash of potatoes, green peas, maize and greens.",
        image: "/food/mukimo.jpg",
        fromKes: 250,
      },
      {
        name: "Smocha",
        blurb: "Soft chapati wrapped around a smokie with fresh kachumbari.",
        image: "/food/smocha.jpg",
        fromKes: 100,
      },
    ],
  },
  {
    title: "Sides & Salads",
    tagline: "Fresh and crisp",
    items: [
      {
        name: "Fresh Garden Salad",
        blurb: "Crisp greens with tomato, cucumber, red onion and avocado.",
        image: "/food/salad.jpg",
        fromKes: 200,
      },
    ],
  },
  {
    title: "Milkshakes & Drinks",
    tagline: "Thick, creamy treats",
    items: [
      {
        name: "Milkshakes",
        blurb: "Strawberry and chocolate — thick, creamy and indulgent.",
        image: "/food/milkshakes.jpg",
        fromKes: 300,
      },
    ],
  },
];

/** All items flattened, in menu order. */
export const allItems: MenuItem[] = menuSections.flatMap((s) => s.items);

/** Curated selection highlighted on the home page. */
const FEATURED = new Set([
  "Grilled Chicken",
  "Grilled Tilapia",
  "Pilau",
  "Githeri",
  "Smocha",
  "Milkshakes",
]);
export const featuredItems: MenuItem[] = allItems.filter((i) => FEATURED.has(i.name));
