import authRouter from "./auth.js";
import userRouter from "./user.js";
function router(app) {
  app.use("/api/auth", authRouter);
  app.use("/api/user", userRouter);
}

export default router;
