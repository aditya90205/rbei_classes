import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, dob, course, role } =
      req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      dob,
      course,
      role,
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      success: true,
      data: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ message: "Internal server error, create user", success: false });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required", success: false });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    }

    if (user.role === "student" && !user.isApprove) {
      return res
        .status(403)
        .json({ message: "Your account is not approved yet", success: false });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

    const userData = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
    };

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: "Login successful",
        success: true,
        user: userData,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error, login user", success: false });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        maxAge: 0,
      })
      .json({ message: "Logout successful", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error, logout user", success: false });
  }
};
