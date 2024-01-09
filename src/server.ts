import express from "express";
import { getPayloadClient } from "./get-payload";
import { nextApp, nextHandler } from "./next-utils";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./trpc";
import dotenv from "dotenv";
import { inferAsyncReturnType } from "@trpc/server";
import bodyParser from "body-parser";
import { IncomingMessage } from "http";
import { stripeWebhookHandler } from "./webhooks";
import nextBuild from "next/dist/build";
import path from "path";


dotenv.config;

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({
  req,
  res,
});

export type ExpressContext = inferAsyncReturnType<typeof createContext>;

export type WebhookRequest = IncomingMessage & { rawBody: Buffer };

const webhookMiddleware = bodyParser.json({
  verify: (req: WebhookRequest, _, buffer) => {
    req.rawBody = buffer;
  },
});

app.post("/api/webhooks/stripe", webhookMiddleware, stripeWebhookHandler);



const start = async () => {
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL ${cms.getAdminURL()}`);
      },
    },
  });

   // TODO: Not working - app.listen twice getting error - Address already in use
  
  // if (process.env.NEXT_BUILD) {
  //   app.listen(PORT, async () => {
  //     payload.logger.info("Next.js is building for production");
  //     // @ts-expect-error
  //     await nextBuild(path.join(__dirname, "../"));
  
  //     process.exit();
  //   });
  // }

  app.use(
    "/api/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  app.use((req, res) => nextHandler(req, res));

  // TODO: Not working - app.listen twice getting error - Address already in use

  nextApp.prepare().then(() => {
    if (process.env.NEXT_BUILD) {
      app.listen(PORT, async () => {
        payload.logger.info("Next.js is building for production");
        // @ts-expect-error
        await nextBuild(path.join(__dirname, "../"));
        process.exit();
      });
    } else {
      app.listen(PORT, async () => {
        payload.logger.info("Next.js started");
        payload.logger.info(`Next.js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`);
      });
    }
  });
};

start();
