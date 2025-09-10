import { nullChecker } from "../utils/nullChecker.js";
import { wss } from "../../app.js";

// * STEP 4.1 WS - once a post request was received,
// * notify clients (frontend) connected on web socket
const realtime = async (data) => {
  console.log("Data received:", data);

  // * Send the data to all connected clients
  // * return the data to the client (frontend)
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          realTimeType: "real-time-sample",
          message: "New real-time data received",
          data: data,
          success: true,
        })
      );
    }
  });
};

const realTimeControllerFunction = async (req, res) => {
  try {
    const { data, dataId } = req.body;

    const hasMissingFields = nullChecker(res, {
      data,
      dataId,
    });
    if (hasMissingFields) return;

    // * STEP 4.2 WS - notify clients (frontend) connected on web socket
    realtime(req.body); // * Call monitor with the received data

    res.status(201).json({
      success: true,
      message: "Post request received successfully!",
      data: req.body,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export { realTimeControllerFunction };
