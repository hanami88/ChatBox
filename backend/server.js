import express from "express";
import http from "http";
import cors from "cors";
import setupSocket from "./src/services/Socket/index.js";
import Database from "./src/config/database/index.js";
import router from "./src/router/index.js";

const app = express();

app.use(cors());
app.use(express.json()); // ← Parse JSON body
app.use(express.urlencoded({ extended: true }));

console.log("✅ Middleware đã setup");

await Database();

router(app);

const server = http.createServer(app);
setupSocket(server);

server.listen(8080, () => {
  console.log(`🚀 Server running on http://localhost:8080`);
});
