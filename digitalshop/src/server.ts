// 1.
// selfthost this entire things

// install npm add express
// install npm add -D @types/express
// install npm add cross-env : look in package.json change there also

import express from "express";
import { getPayloadClient } from "./get-payload";
import { nextApp, nextHandler } from "./next-utils";

const app = express();
// production is env because the server will give us the port and in development it is 3000
const PORT = Number(process.env.PORT) || 3000;

const start = async () => {
  // admin data
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL ${cms.getAdminURL()}`);
      },
    },
  });

  // to host send it to next-util.ts
  app.use((req, res) => nextHandler(req, res));

  nextApp.prepare().then(() => {
    // payload.logger.info("Next.js started");

    app.listen(PORT, async () => {
      // payload.logger.info(
      //   `Next.js APP URL : ${process.env.NEXT_PUBLIC_SERVER_URL}`
      // );
    });
  });
};

start();

// now can just import this getpayloadclient everywhere where we need database access for example in our server file
