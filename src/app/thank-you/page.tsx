import PaymentStatus from "@/components/PaymentStatus";
import { PRODUCT_CATEGORIES } from "@/config";
import { getPayloadClient } from "@/get-payload";
import { getServerSideUser } from "@/lib/payload-utils";
import { formatPrice } from "@/lib/utils";
import { Product, ProductFile, User } from "@/payload-types";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const ThankYouPage = async ({ searchParams }: PageProps) => {
  const orderId = searchParams.orderId;
  const nextCookes = cookies();

  const { user } = await getServerSideUser(nextCookes);
  const payload = await getPayloadClient();

  const { docs: orders } = await payload.find({
    collection: "orders",
    depth: 2,
    where: {
      id: {
        equals: orderId,
      },
    },
  });

  const [order] = orders;

  //   404 if no order is found
  if (!order) {
    notFound();
  }

  //  Checking if the user is the owner of the order
  const orderUserId =
    typeof order.user === "string" ? order.user : order.user.id;

  // Redirecting to sign in page if the user is not the owner of the order
  if (orderUserId !== user?.id) {
    return redirect(`/sign-in?origin=thank-you?orderId=${order.id}`);
  }

  const products = order.products as Product[];

  const orderTotal = products.reduce((total, product) => {
    return total + product.price;
  }, 0);

  return (
    <main className="relative lg:min-h-full">
      <div className="hidden md:block h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12">
        <Image
          fill
          src="/checkout-thank-you.jpg"
          className="h-full w-full object-cover object-center"
          alt="Thank you for your order!"
        />
      </div>

      <div>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32 xl:gap-x-24">
          <div className="lg:col-start-2">
            <h1 className="py-5 text-4xl font-bold sm:text-4xl text-blue-600">
              Order successful
            </h1>
            <p className="mt-2 text-4xl font-medium tracking-tight text-gray-900 sm:text-4xl">
              Thanks for ordering.
            </p>
            <p className="my-5 text-2xl sm:text-2xl text-muted-foreground text-gray-500">
              We appreciate your business and look forward to serving you again
              soon.
            </p>
            {}
            {order._isPaid ? (
              <p className="my-5 text-base text-muted-foreground">
                Your order has been paid and is being processed. Assets are now
                available for download below and Order details is sent to{" "}
                {typeof order.user !== "string" ? (
                  <span className="font-medium text-gray-900">
                    {order.user.email}
                  </span>
                ) : null}
                .
              </p>
            ) : (
              <p className="my-5 text-muted-foreground">
                We appreciate your oder, and we&apos;re currently processing it.
                Hang tight and you&apos;ll receive a confirmation very soon!
              </p>
            )}
            <div className="mt-16 text-sm font-medium">
              <div className="text-muted-foreground">Order #</div>
              <div className="mt-2 text-gray-900">{order.id}</div>

              <ul className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-muted-foreground">
                {products.map((product) => {
                  const label = PRODUCT_CATEGORIES.find(
                    ({ value }) => value === product.category
                  )?.label;

                  const downloadUrl = (product.product_files as ProductFile)
                    .url as string;

                  const { image } = product.images[0];

                  return (
                    <li key={product.id} className="flex space-x-6 py-6">
                      <div className="relative h-24 w-24">
                        {typeof image !== "string" && image.url ? (
                          <Image
                            layout="fill"
                            objectFit="cover"
                            src={image.url}
                            alt={image.filename as string}
                            className="flex-none rounded-md bg-gray-100 object-cover object-center"
                          />
                        ) : null}
                      </div>

                      <div className="flex-auto flex flex-col justify-between">
                        <div className="space-y-1">
                          <h3 className="text-gray-900">{product.name}</h3>
                          <p className="my-1">{label}</p>
                        </div>
                        {/* Asset can only be downloaded if it's paid */}
                        {order._isPaid ? (
                          <a
                            href={downloadUrl}
                            download={product.name as String}
                            className="text-blue-600 hover:underline underline-offset-2"
                          >
                            Download
                          </a>
                        ) : null}
                      </div>
                      <p className="flex-none font-medium text-gray-900">
                        {formatPrice(product.price)}
                      </p>
                    </li>
                  );
                })}
              </ul>

              <div className="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-muted-foreground">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p className="text-gray-900">{formatPrice(orderTotal)}</p>
                </div>

                <div className="flex justify-between">
                  <p>Transaction Fee</p>
                  <p className="text-gray-900">{formatPrice(1)}</p>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
                  <p className="text-base">Total</p>
                  <p className="text-base">{formatPrice(orderTotal + 1)}</p>
                </div>
              </div>

              <PaymentStatus
                orderEmail={(order.user as User).email}
                orderId={orderId as string}
                isPaid={order._isPaid}
              />

              <div className="mt-16">
                <Link
                  href="/products"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  Contnue shopping &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ThankYouPage;
