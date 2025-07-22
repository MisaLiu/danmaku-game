import express from "express";
import ViteExpress from "vite-express";
import { ApplyWebSocketServer } from "./websocket/index.js";

const app = express();

app.get("/hello", (_, res) => {
  res.send("Hello Vite + React + TypeScript!");
});

const server = ViteExpress.listen(app, 3000, () => {
  console.log('HTTP server started!');
});

ApplyWebSocketServer(server);
