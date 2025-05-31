import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  try {
    console.log(req.body)
    const { name, email, password, role } = req.body;
    const user1 = await User.findOne({ email });
    if (user1) {
      return res.status(400).json({ message: "User already exist" });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const createUser = await new User({
      name: name,
      email: email,
      password: hashedPassword,
      role: role,
    });
    createUser.save();
    res.status(201).json({
      message: "User Created Successfully",
    });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email " });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    } else {
      res.status(201).json({
        message: "User Login Successfull",
      });
    }
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
