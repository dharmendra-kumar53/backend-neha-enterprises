import User from "../models/User.js";
import bcrypt from "bcryptjs";
import e from "express";
import jwt from "jsonwebtoken";

// Signup Function
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;


    // Check for missing fields
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secret123", { expiresIn: "1d" });

    // Respond with success and token
    res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ success: false, message: "Signup failed" });
  }
};

// Login Function
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secret123", { expiresIn: "1d" });

    // Respond with success and token
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Login failed" });
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch profile" });
  }
};



export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, email, phone, address, gender, dob, image } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, phone, address, gender, dob, image },
      { new: true }
    );

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('Profile update failed:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
