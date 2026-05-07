import "dotenv/config";
import express from "express";
import { apiV1Router } from "./routers/apiV1Router";
import "./config/drizzle/connection";
import { errorHandlerMiddleware } from "./middleware/errorHandler";

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.use("/api/v1", apiV1Router);

app.all("/*splat", (req, res) => {
  res.status(404).send({
    success: false,
    message: "Not found.",
    data: null
  });
});

app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
