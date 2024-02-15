// selfthost this entire things

// install npm add express
// install npm add -D @types/express

import express from "express";

const app = express();
// production is env because the server will give us the port and in development it is 3000
const PORT = Number(process.env.PORT) || 3000;
