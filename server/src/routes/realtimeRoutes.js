import express from "express";
import { realTimeControllerFunction } from "../controllers/realtimeController.js";

let realTimeRoutes = express.Router();

// * STEP 3 WS - get post requests from frontend
realTimeRoutes.post("/", realTimeControllerFunction);

export { realTimeRoutes };
