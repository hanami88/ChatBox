import express from "express";
import http from "http";
import cors from "cors";
import setupSocket from "./src/services/Socket/index.js";
import Database from "./src/config/database/index.js";
import router from "./src/router/index.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // domain FE của bạn
    credentials: true, // Cho phép gửi cookie qua request
  })
);
app.use(cookieParser());

app.use(express.json()); // ← Parse JSON body
app.use(express.urlencoded({ extended: true }));
dotenv.config();
console.log("✅ Middleware đã setup");

await Database();

router(app);

const server = http.createServer(app);
setupSocket(server);

server.listen(8080, () => {
  console.log(`🚀 Server running on http://localhost:8080`);
});
