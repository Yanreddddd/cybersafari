"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import useCart from "@/hooks/use-cart";
import { Product } from "@/payload-types";
import { Toaster, toast } from "sonner";

const AddToCart = ({ product }: { product: Product }) => {
  const { addItem } = useCart();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [isSuccess]);

  return (
    <Button
      disabled={isSuccess}
      onClick={() => {
        addItem(product);
        setIsSuccess(true);
        toast.success(`${product.name} added to Cart!`);
      }}
      size="lg"
      className="w-full"
    >
      {isSuccess ? "Added to Cart!" : "Add to Cart"}
    </Button>
  );
};

export default AddToCart;
