// 4.

// install slate and bulder for our backend and also mogodb
// npm add @payloadcms/richtext-slate @payloadcms/bundler-webpack @payloadcms/db-mongodb
// npm add -D nodemon : look in left hand side build new file in root folder name it nodemon.json
// after that also create tsconfig.server.ts file

import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload/config";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";
import path from "path";

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
  //   this will be later our product , user and so on very important
  collections: [],
  routes: {
    admin: "/sell",
  },
  admin: {
    bundler: webpackBundler(),
    meta: {
        titleSuffix: "- DigitalHippo",
        favicon: "/favicon.ico",
        ogImage: "/thumbnail.jpg",
    },
  },
  rateLimit: {
    // for production we can always adjust it by default it is 500 so for now devlopemt we make it high
    max: 2000,
  },
  //   lexical or slate 2 options
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!,
  }),
//   all our types will live so the entire app is going to be completely type safe from front to back becasue it is typescript cms
// put all ours types of user, products in this file
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  }
});
