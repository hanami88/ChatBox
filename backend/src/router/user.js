import epxress from "express";
import user from "../app/controller/userController.js";
const router = epxress.Router();

// router.post("/", user.chat);
router.get("/message", user.message);
export default router;
