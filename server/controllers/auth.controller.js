import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const encryptedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: encryptedPassword });
  try {
    await newUser.save(); //Saving the info to db can take time
    res.status(201).json("User created successfully!");
  } catch (error) {
    next(error);
  }
};
