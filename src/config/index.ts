import { ArrowDownToLineIcon, BadgeCheck, Leaf } from "lucide-react";

export const PRODUCT_CATEGORIES = [
  {
    label: "UI KITS",
    value: "ui_kits" as const,
    featured: [
      {
        name: "Editor picks",
        href: "#",
        imageSrc: "/nav/ui-kits/mixed.jpg",
      },
      {
        name: "New Arrivals",
        href: "#",
        imageSrc: "/nav/ui-kits/blue.jpg",
      },
      {
        name: "Bestsellers",
        href: "#",
        imageSrc: "/nav/ui-kits/purple.jpg",
      },
    ],
  },
  {
    label: "Icons",
    value: "icons" as const,
    featured: [
      {
        name: "Favorite Icon Picks",
        href: "#",
        imageSrc: "/nav/icons/picks.jpg",
      },
      {
        name: "New Arrivals",
        href: "#",
        imageSrc: "/nav/icons/new.jpg",
      },
      {
        name: "Bestselling Icons",
        href: "#",
        imageSrc: "/nav/icons/bestsellers.jpg",
      },
    ],
  },
];

export const PERKS = [
  {
    name: "Instant Delivery",
    Icon: ArrowDownToLineIcon,
    description:
      "Get your assets delivered to your email in seconds and download them right away.",
  },
  {
    name: "Guaranteed Quality",
    Icon: BadgeCheck,
    description:
      "Every asset in our platform is verified by our team to ensure highest quality standards.",
  },
  {
    name: "For The Planet",
    Icon: Leaf,
    description:
      "1% of our sales goes to the preservation adn restoration of the natural environment.",
  },
];

