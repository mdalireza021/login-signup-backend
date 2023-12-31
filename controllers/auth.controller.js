import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { secret } from "../config/auth.config.js";
const saltRounds = 10;

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid Password!" });
    }

    const token = jwt.sign({ id: user.id }, secret, {
      expiresIn: "72h",
    });

    res.cookie("token", token, { httpOnly: true });

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hash = bcrypt.hashSync(password, saltRounds);
    const user = new User({
      username,
      email,
      password: hash,
    });

    const savedUser = await user.save();
    return res.status(201).json({ message: "Signup successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const signout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};
