import express from "express";
import App from "../app/controller/index.js";
const router = express.Router();

router.post("/dangky", App.dangky);
router.post("/dangnhap", App.dangnhap);

export default router;
