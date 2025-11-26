import axios from "axios";
import fs from "fs";
import deleteFile from "../utils/deleteFile.js";

const detect = async (req, res) => {
  // * declare outside so when it errors we can delete the uploaded image
  let image = null;
  // console.log("REQ : ", req);

  try {
    image = req.file;
    console.log("image : ", image);

    const imagePath = `${image.destination}/${image.filename}`;
    const imageFile = fs.readFileSync(imagePath);
    const imageBase64 = imageFile.toString("base64");

    const response = await axios.post(
      "https://detect.roboflow.com/cassava-vcgdb/4",
      imageBase64,
      {
        params: {
          api_key: "OlfMv2DWd495zjzMcGu5",
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (!response.data) {
      response.data = null;
    }

    console.log("READING RESPONSE");
    console.log("RB RESPONSE : ", response.data);

    console.log("DELETING FILE");
    deleteFile(image.filename);

    res.status(201).json({
      success: true,
      message: "Result of image identification retrieved successfully!",
      data: response.data,
    });
  } catch (error) {
    console.error("AXIOS ERROR:");
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Status:", error.response.status);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }

    deleteFile(image.filename);

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
      data: null,
    });
  }
};

const analyzeCassava = async (req, res) => {
  try {
    const { roboflowResult } = req.body;

    if (!roboflowResult) {
      return res.status(400).json({ message: "Missing roboflowResult input" });
    }

    console.log(roboflowResult);

    // * Build the prompt for Gemini
    const prompt = `
      You are an agricultural expert. Based on this cassava crop analysis result which can be 'healthy' or 'unhealthy':
      "${roboflowResult}"
      Give a brief recommendation and what action should be taken to improve it.
      IGNORE THE 'WALANG BALAT' OR 'MAY BALAT'.
      JUST FOCUS ON HEALTHY OR UNHEALTHY AND THIS IS FOR THE CASSAVA CROP AND NOT THE LEAVES.
      Recommend things to do or what not to do.
      Return the answer in plain text with 3-4 sentences.
    `;

    // * Send to Gemini
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }
    );

    const aiResponse =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No recommendation generated.";

    res.status(200).json({
      success: true,
      data: aiResponse,
    });
  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: "Failed to get recommendation",
      error: error.response?.data || error.message,
    });
  }
};

export { detect, analyzeCassava };
