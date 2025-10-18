import express from "express";
import http from "http";
import setupSocket from "./services/Socket";
const app = express();
const server = http.createServer(app);
setupSocket(server);
server.listen(8080, () => console.log("🚀 Server running on port 8080"));
