"use client";

import { Icons } from "@/components/Icons";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center lg:px-0">
        <div className="mx-auto w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-20 w-20" />
            <h1 className="text-2xl font-bold">Create an Account</h1>
            <Link
              href="/sign-in"
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
            >
              Already have an account? Sign-in
              <ArrowRight className="h-4 w-4"></ArrowRight>
            </Link>
          </div>

          <div className="grid gap-6">
            <form onSubmit={null}>
              <div className="grid gap-2">
                {/* Email Form */}
                <div className="grid gap-1 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    className={cn({
                      "focus-visible:ring-red-500": true,
                    })}
                    placeholder="user@email.com"
                  />
                </div>
                {/* Password Form */}
                <div className="grid gap-1 py-2">
                  <Label htmlFor="email">Password</Label>
                  <Input
                    className={cn({
                      "focus-visible:ring-red-500": true,
                    })}
                    placeholder="Password"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
