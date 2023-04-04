// packages
import express from "express";
import mongoose from "mongoose";
// models
import { RecipesModel } from "../Models/Recipes.js";
import { UserModel } from "../Models/UserModel.js";

// router
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await RecipesModel.find({});
    res.json(response);
  } catch (error) {
    // error handing
    console.log({ message: error });
  }
});

router.post("/", async (req, res) => {
  const recipes = new RecipesModel(req.body);

  try {
    const response = await recipes.save();
    res.json(response);
  } catch (error) {
    // error handing
    console.log({ message: error });
  }
});

router.put("/", async (req, res) => {
  try {
    const recipes = await RecipesModel.findById(req.body.recipeId);
    const user = await UserModel.findById(req.body.userId);
    // const response = await recipes.save();
    user.savedRecipes.push(recipes);
    res.json({ savedRecipes: user.savedRecipes });
  } catch (error) {
    console.log({ message: error });
  }
});

router.get("/savedRecipes/ids", async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userId);
    req.json({ savedRecipes: user?.savedRecipes });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});
router.get("/savedRecipes", async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userId);
    const savedRecipes = await RecipesModel.find({
      _id: { $in: user.savedRecipes },
    });
    req.json({ savedRecipes });
    // req.json({ savedRecipes: user?.savedRecipes });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});
//
export { router as RecipesRouter };
