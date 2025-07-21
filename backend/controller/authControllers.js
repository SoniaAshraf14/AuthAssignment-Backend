import User from "../models/User.js";
import { sendEmail } from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const sendOtp = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ error: "User not found" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.otp = otp;
  user.otpExpires = Date.now() + 10 * 60 * 1000;
  await user.save();

  await sendEmail(email, "Your OTP", `Your OTP is: ${otp}`);
  res.json({ message: "OTP sent to your email" });
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email, otp });

  if (!user || user.otpExpires < Date.now()) {
    return res.status(400).json({ error: "Invalid or expired OTP" });
  }

  res.json({ message: "OTP verified" });
};

export const resetPassword = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found" });

  user.password = password;
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  res.json({ message: "Password reset successful" });
};
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 🔍 Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Invalid email or password" });
    }

    // 🔐 Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // 🚫 Check if account is inactive
    if (user.status === "inactive") {
      return res.status(403).json({ error: "Your account is inactive. Please contact the admin." });
    }

    // ✅ Create JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ Send success response
    res.json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        dob: user.dob,
        gender: user.gender,
        profileImage: user.profileImage,
        coverPhoto: user.coverPhoto,
        userType: user.userType,
        status: user.status,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during login" });
  }
};


