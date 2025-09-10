import express from "express";
import multer from "multer";

import {
  addCassava,
  getCassava,
  getCassavas,
  updateCassava,
  deleteCassava,
} from "../controllers/cassavaController.js";

let cassavaRoutes = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

cassavaRoutes.post("/", upload.single("image"), addCassava);
cassavaRoutes.get("/:id", getCassava);
cassavaRoutes.get("/", getCassavas);
cassavaRoutes.put("/:id", updateCassava);
cassavaRoutes.delete("/:id", deleteCassava);

// * USE THIS MIDDLEWARE FOR MULTIPLE UPLOADS
// upload.fields([
//   { name: "file1", maxCount: 1 },
//   { name: "file2", maxCount: 1 },
//   { name: "file3", maxCount: 1 },
// ]),

export { cassavaRoutes };
