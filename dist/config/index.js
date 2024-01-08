"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PERKS = exports.PRODUCT_CATEGORIES = void 0;
var lucide_react_1 = require("lucide-react");
exports.PRODUCT_CATEGORIES = [
    {
        label: "UI KITS",
        value: "ui_kits",
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
        value: "icons",
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
exports.PERKS = [
    {
        name: "Instant Access Guarantee",
        Icon: lucide_react_1.RocketIcon,
        description: "Enjoy instant and lifetime access to your purchased digital assets.",
    },
    {
        name: "Quality Control Assurance",
        Icon: lucide_react_1.ShieldCheck,
        description: "Every digital asset undergoes rigorous quality checks by our expert team.",
    },
    {
        name: "Dedicated Customer Support",
        Icon: lucide_react_1.HelpingHandIcon,
        description: " Personalized and responsive customer support for all your inquiries.",
    },
    {
        name: "Digital Ecosystem Participation",
        Icon: lucide_react_1.UsersRoundIcon,
        description: "Seamlessly transition between being a buyer and a seller on our dynamic platform.",
    },
];
