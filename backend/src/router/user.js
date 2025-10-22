import epxress from "express";
import user from "../app/controller/userController.js";
const router = epxress.Router();

router.post("/", user.chat);

export default router;
