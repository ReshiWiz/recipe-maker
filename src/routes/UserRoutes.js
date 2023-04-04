import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../Models/UserModel.js";
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });

  if (user) {
    return res.json({ message: "User already exist!" });
  }

  const hashedPassword = await bcrypt.hash(password, 11);

  const newUser = new UserModel({ username, password: hashedPassword });
  await newUser.save();
  res.json({ message: "user is created and retested" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });
  // console.log(user,"look");

  if (!user) {
    return res.json({ message: "User Doesn't Exist" });
  }
  const isPassCodeValid = await bcrypt.compare(password, user.password);

  if (!isPassCodeValid) {
    // res.json({ message: "Username or Password is invalid" });
    res.status(404).json({ message: "Username or Password is invalid" });
    return;
  } else {
    const token = jwt.sign({ id: user._id }, "secret");
    res.json({ token, userID: user._id });
  }
});

export { router as userRouter };

