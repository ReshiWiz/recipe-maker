// importing the required  dev tools

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import { userRouter } from "./routes/UserRoutes.js";
import { RecipesRouter } from "./routes/recipes.js";
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", RecipesRouter);

const PORT = process.env.PORT || 5000;

// mongoose DB connection
mongoose
  .connect(
    `mongodb+srv://jeeva:jeeva@foodapp.atpmvmv.mongodb.net/food-app?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("connected to DB");
  })
  .catch((error) =>
    console.log({ message: "error to connect with DB", error })
  );

// middle wars
app.get("/", (req, res) => {
  res.status(200) ? res.json({ message: "printed" }) : null;
});

app.listen(PORT, () => {
  console.log("server connected to port 5000");
});

