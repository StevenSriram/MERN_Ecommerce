import User from "../modals/user.modal.js";
import bcrypt from "bcryptjs";
import { generateJWT } from "../utils/generateJWT.js";

export const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ sucess: false, message: "Please fill all fields" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ sucess: false, message: "User already exists" });
    }

    const hasedPassword = await bcrypt.hash(password, 10);
    let user = new User({ name, email, password: hasedPassword });

    // ! Save New User
    await user.save();

    const token = generateJWT(res, user._id);
    user = { ...user._doc, password: undefined };

    return res.status(201).json({
      sucess: true,
      user,
      token,
      message: "User registration successfully",
    });
  } catch (error) {
    return res.status(500).json({ sucess: false, message: error.message });
  }
};
