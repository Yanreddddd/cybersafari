import {
  ArrowDownToLineIcon,
  BadgeCheck,
  HelpingHandIcon,
  Leaf,
  RocketIcon,
  ShieldCheck,
  UsersRoundIcon,
} from "lucide-react";

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
    name: "Instant Access Guarantee",
    Icon: RocketIcon,
    description:
      "Enjoy instant and lifetime access to your purchased digital assets.",
  },
  {
    name: "Quality Control Assurance",
    Icon: ShieldCheck,
    description:
      "Every digital asset undergoes rigorous quality checks by our expert team.",
  },
  {
    name: "Dedicated Customer Support",
    Icon: HelpingHandIcon,
    description:
      " Personalized and responsive customer support for all your inquiries.",
  },
  {
    name: "Digital Ecosystem Participation",
    Icon: UsersRoundIcon,
    description:
      "Seamlessly transition between being a buyer and a seller on our dynamic platform.",
  },
];
