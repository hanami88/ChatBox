import homepageRouter from "./homepage.js";

function router(app) {
  app.use("/", homepageRouter);
}

export default router;
