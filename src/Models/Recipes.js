import mongoose from "mongoose";

const RecipesSchema = new mongoose.Schema({
  name: { type: String, require: true },
  incidences: [{ type: String, require: true }],
  instructions: { type: String, require: true },
  CookingTime: { type: Number, require: true },
  imageURL: { type: String, require: true },
  userOwner: { type: mongoose.Types.ObjectId, ref: "user-info", require: true },
});

export const RecipesModel = mongoose.model("recipes", RecipesSchema);