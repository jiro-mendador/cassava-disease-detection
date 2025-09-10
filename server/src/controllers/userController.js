import bcrypt from "bcryptjs";
import { User } from "../models/userModel.js";
import { nullChecker } from "../utils/nullChecker.js";
import { checkDuplicate } from "../utils/duplicateChecker.js";
import nodemailer from "nodemailer";
import crypto from "crypto";

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please input your email to send a confirmation link",
      });
    }

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        success: false,
        message: "Invalid email!",
      });

    // * generate token and expiration
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpires = Date.now() + 1000 * 60 * 15; // * 15 minutes

    // * save token in user document (requires fields in schema)
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpires;
    await user.save();

    // * create transporter (example using Gmail)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL, // * your email
        pass: process.env.GMAIL_PK, // * your email app password (not your Gmail password!)
      },
    });

    // * reset link
    // ! DON'T FORGET TO CHANGE THIS TO YOUR DESIGNATED URLs
    // const resetLink = `https://your-web-hosting-url-here/user/forgot-password/${resetToken}`;
    const resetLink = `http://your-localhost-url-here/user/forgot-password/${resetToken}`;

    // * send mail
    await transporter.sendMail({
      from: `"${process.env.GMAIL_APP_NAME}" <${process.env.GMAIL}>`,
      to: email,
      subject: "Password Reset Request",
      html: `
        <h3>Password Reset</h3>
        <p>Click the link below to reset your password. This link is valid for 15 minutes:</p>
        <a href="${resetLink}">${resetLink}</a>
      `,
    });

    res.json({
      success: true,
      message: "Password reset link sent to email!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  const { token, password } = req.body;
  console.log("RESET ATTEMPT:", req.body);

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  console.log("USER FOUND FOR TOKEN:", user);

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }

  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  console.log("PASSWORD RESET AND TOKEN CLEARED");

  res.json({ success: true, message: "Password successfully updated!" });
};

const verifyResetToken = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token is required",
      });
    }

    // * find the user with the matching reset token and check expiration
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // * not expired
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired password reset link.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Token is valid",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const verifyEmailRegistered = async (req, res) => {
  try {
    // * nulls
    const { email } = req.body;

    console.log(req.body);

    // * Check for missing required fields
    const hasMissingFields = nullChecker(res, {
      email,
    });

    if (hasMissingFields) return;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required to send a verification code.",
      });
    }

    // * generate 6-digit numeric code
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // * create email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PK,
      },
    });

    // * send email with code
    await transporter.sendMail({
      from: `"${process.env.GMAIL_APP_NAME}" <${process.env.GMAIL}>`,
      to: email,
      subject: "Your Email Verification Code",
      html: `
        <h3>Email Verification Code</h3>
        <p>Use the following code to verify your email</p>
        <h2>${verificationCode}</h2>
      `,
    });

    return res.json({
      success: true,
      message: "Verification code sent to your email.",
      data: verificationCode,
    });
  } catch (error) {
    console.error("Error in verifyEmailRegistered:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

// * register new user
const registerUser = async (req, res) => {
  try {
    // * nulls
    const { name, email, password } = req.body;

    // * Check for missing required fields
    const hasMissingFields = nullChecker(res, {
      name,
      email,
      password,
    });

    if (hasMissingFields) return;

    // * check duplicates
    let isDup = await checkDuplicate(res, User, { email: req.body.email });
    if (isDup) return;

    // * Password Criteria Check
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_+=~{}\[\]:;"'<>,.?/\\]).{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(409).json({
        success: false,
        message:
          "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      ...req.body,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// * Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields!" });
    }

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    res.json({
      success: true,
      message: "Login successful",
      data: user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// * Get User by ID
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    res.json({ success: true, message: "User retrieved", data: user });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// * Get All Users
const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, role, status, search } = req.query;

    const filter = {};

    if (role) filter.role = role;
    if (status) filter.status = status;

    // * name search
    if (search) {
      const searchRegex = new RegExp(search, "i"); // * case-insensitive regex
      filter.$or = [{ name: searchRegex }];
    }

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const users = await User.find(filter)
      .select("-password")
      .skip(skip)
      .limit(limitNumber);

    const totalUsers = await User.countDocuments(filter);

    res.json({
      success: true,
      message: "Users retrieved",
      data: users,
      meta: {
        total: totalUsers,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(totalUsers / limitNumber),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// * Update User
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    let updates = { ...req.body };

    // * nulls
    const { name, email, password, role, status } = updates;

    // * Check for missing required fields
    const hasMissingFields = nullChecker(res, {
      name,
      email,
      password,
    });

    if (hasMissingFields) return;

    // * check for duplicate (excluding current)
    let isDup = await checkDuplicate(
      res,
      User,
      {
        email: updates.email,
      },
      userId
    );
    if (isDup) return;

    // * Password Criteria Check
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_+=~{}\[\]:;"'<>,.?/\\]).{8,}$/;

    if (password) {
      if (!passwordRegex.test(updates.password)) {
        return res.status(400).json({
          success: false,
          message:
            "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.",
        });
      }

      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// * Delete User
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // * Delete associated files
    // deleteFile(user.profile);

    res.json({
      success: true,
      message: "User and associated files deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export {
  loginUser,
  registerUser,
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  forgotPassword,
  resetPassword,
  verifyResetToken,
  verifyEmailRegistered,
};
