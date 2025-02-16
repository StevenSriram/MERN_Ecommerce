import User from "../modals/user.modal.js";
import bcrypt from "bcryptjs";

import { generateJWT } from "../utils/generateJWT.js";
import memoryCache from "../utils/nodeCache.js";

export const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all fields" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hasedPassword = await bcrypt.hash(password, 10);
    let user = new User({ name, email, password: hasedPassword });

    // ! Save New User
    await user.save();

    // ! Delete Cache
    memoryCache.del("dashboard");

    user = { ...user._doc, password: undefined };
    const token = generateJWT(res, user);

    return res.status(201).json({
      success: true,
      user,
      token,
      message: "User registration successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all fields" });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User Not Found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    user = { ...user._doc, password: undefined };
    const token = generateJWT(res, user);

    return res.status(200).json({
      success: true,
      user,
      token,
      message: `Welcome ${user.name}`,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    return res
      .status(200)
      .json({ success: true, message: "Logout Successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const checkAuth = async (req, res) => {
  const user = req.user;

  res.status(200).json({ success: true, user, message: "User Authenticated" });
};
