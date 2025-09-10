import express from "express";
// import multer from "multer";

import {
  registerUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  loginUser,
  forgotPassword,
  resetPassword,
  verifyResetToken,
  verifyEmailRegistered,
} from "../controllers/userController.js";

let userRoutes = express.Router();

// * ENABLE THIS FOR FILE UPLOADING
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/images/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

userRoutes.post("/forgot-password/", forgotPassword);
userRoutes.post("/reset-password/", resetPassword);
userRoutes.post("/verify-reset-token", verifyResetToken);
userRoutes.post("/verify-email", verifyEmailRegistered);

userRoutes.post("/login/", loginUser);
userRoutes.post("/", registerUser);
userRoutes.get("/:id", getUser);
userRoutes.get("/", getUsers);
userRoutes.put("/:id", updateUser);
userRoutes.delete("/:id", deleteUser);

// * USE THIS MIDDLEWARE FOR MULTIPLE UPLOADS
// upload.fields([
//   { name: "file1", maxCount: 1 },
//   { name: "file2", maxCount: 1 },
//   { name: "file3", maxCount: 1 },
// ]),

// * USE THIS FOR SINGLE UPLOADS
// upload.single("file1");

export { userRoutes };
