"use client";

import React, { useState, useRef, useEffect } from "react";
import NavItem from "./NavItem";
import { PRODUCT_CATEGORIES } from "../config";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  // Declaring if any navigation item is open
  const isAnyOpen = activeIndex !== null
  
  // Accessibility features (clicking outside and pressing ESC automatically closes dropdown)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if(e.key === "Escape") {
        setActiveIndex(null)
      }
    }

    document.addEventListener("keydown", handler)
  
    return () => {
      document.removeEventListener("keydown", handler)
    }
  }, [])
  

  const navRef = useRef<HTMLDivElement | null> (null)

  useOnClickOutside(navRef, () => setActiveIndex(null))

  return (
    <div className="flex gap-4 h-full" ref={navRef}>
      {/* Clicked item functionality */}
      {PRODUCT_CATEGORIES.map((category, i) => {
        const handleOpen = () => {
          if (activeIndex === i) {
            setActiveIndex(null);
          } else {
            setActiveIndex(i);
          }
        };

        const isOpen = i === activeIndex;
        return (
          // Navigation Bar Items and passing the values to NavItem.tsx
          <NavItem
            category={category}
            handleOpen={handleOpen}
            isOpen={isOpen}
            isAnyOpen={isAnyOpen}
            key={category.value}
          />
        );
      })}
    </div>
  );
};

export default NavItems;
