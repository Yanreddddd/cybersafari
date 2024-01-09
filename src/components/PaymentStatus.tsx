"use client"

import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface PaymentStatusProps {
  orderEmail: string;
  orderId: string;
  isPaid: boolean;
}

const PaymentStatus = ({ orderEmail, orderId, isPaid }: PaymentStatusProps) => {
  console.log(`Email: ${orderEmail}`);
  console.log(`Order Id: ${orderId}`);
  console.log(`IsPaid: ${isPaid}`);

  const router = useRouter();

  const { data } = trpc.payment.pollOrderStatus.useQuery(
    { orderId },
    {
      enabled: isPaid === false,
      refetchInterval: (data) => (data?.isPaid ? false : 1000),
    }
  );

  useEffect(() => {
    if (data?.isPaid) {
      console.log(`Order is paid: ${data.isPaid}`);
      router.refresh();
    }
  }, [data?.isPaid, router]);

  return (
    <div className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600">
      <div>
        <p className="font-medium text-gray-900">Shipping To</p>
        <p className="text-muted-foreground">{orderEmail}</p>
      </div>

      <div>
        <p className="font-medium text-gray-900">Order Status</p>
        <p className="text-muted-foreground">
          {isPaid ? "Payment Successful" : "Pending Payment"}
          {/* // (
          //   <p className="text-green-500">Payment Successful</p>
          // ) : (
          //   <p className="text-gray-500">Pending Payment</p>
          // ) */}
          
          
        </p>
      </div>
    </div>
  );
};

export default PaymentStatus;