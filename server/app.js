import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectMongoDB from "./src/config/database.js";
import { userRoutes } from "./src/routes/userRoutes.js";
import { realTimeRoutes } from "./src/routes/realtimeRoutes.js";

// * FOR REAL-TIME UPDATES
import { WebSocketServer } from "ws";
import { cassavaRoutes } from "./src/routes/cassavaRoutes.js";

// ! FOR WEB HOSTING
// import path from "path";
// import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// console.log(__dirname);

let app = express();
dotenv.config();
const server = app.listen(process.env.PORT);

// * MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// * connecting to the mongodb server
await connectMongoDB();

// * STEP 1 WS - setup the web socket connection
// * connect fe using url (ws://localhost:PORT_HERE)
const wss = new WebSocketServer({ server });

// * STEP 2 WS - connect the client (frontend)
// * to the websocket connection for real-time updates
wss.on("connection", (ws) => {
  console.log("Client connected");

  // * if fe sends some message/data it will log here
  ws.on("message", (message) => {
    console.log("Received Message:", JSON.parse(message));
    // * after receiving some data u can also return some message on the backend
    ws.send(
      JSON.stringify({
        realTimeType: "ws connection",
        message: "Message received, this is a response from backend",
        success: true,
      })
    );
  });
});

// * dir for images (if applicable)
app.use("/api/images", express.static("./public/images"));
app.use("/api/files", express.static("./public/files"));

app.use("/api/users", userRoutes);
app.use("/api/real-time", realTimeRoutes);
app.use("/api/cassava", cassavaRoutes);

// ! TO RENDER FRONTEND ON WEB HOSTING
// app.use(express.static(path.join(__dirname, "/fe/build/")));
// app.use(express.static(path.join(__dirname, "/fe/dist/")));

// ! RENDER FRONTEND ON ANY PATH
// app.get(
//   "*",
//   (req, res) => res.sendFile(path.join(__dirname, "/fe/dist/index.html"))
//   // res.sendFile(path.join(__dirname, "/fe/build/index.html"))
// );

// * start server
app.get("/", async (req, res) => {
  res.json({ message: "Server Started", port: process.env.PORT });
});

// * to be accessible in websocket routes
export { wss };
