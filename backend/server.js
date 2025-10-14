import express from "express";

const app = express();
const PORT = 8080;

app.get("/", (req, res) => {
  res.send("conca");
});

app.listen(8080, () => console.log(`Server listening on port ${PORT}`));
