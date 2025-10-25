import epxress from "express";
import user from "../app/controller/userController.js";
const router = epxress.Router();

// router.post("/", user.chat);
router.get("/message", user.message);
router.get("/users", user.users);
router.post("/themban", user.themban);
router.post("/xoaban", user.xoaban);

export default router;
