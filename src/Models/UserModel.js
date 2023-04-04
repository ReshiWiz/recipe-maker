import mongoose from "mongoose";
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  saveRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "recipes" }],
});

export const UserModel = mongoose.model("users-info", UserSchema);
