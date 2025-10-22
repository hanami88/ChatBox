import express from "express";
import App from "../app/controller/authController.js";
import verifyToken from "../middleware/JWT.js";

const router = express.Router();

router.post("/dangky", App.dangky);
router.post("/dangnhap", App.dangnhap);
router.get("/xacnhandangnhap", verifyToken, App.xacnhandangnhap);
export default router;
