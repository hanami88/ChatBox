import epxress from "express";
import user from "../app/controller/userController.js";
const router = epxress.Router();

// router.post("/", user.chat);
router.post("/message", user.message);
router.post("/themban", user.themban);
router.post("/xoaban", user.xoaban);
router.get("/timkiem", user.timkiem);

export default router;
