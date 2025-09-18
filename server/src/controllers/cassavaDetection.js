import axios from "axios";
import fs from "fs";
import deleteFile from "../utils/deleteFile.js";

const detect = async (req, res) => {
  // * declare outside so when it errors we can delete the uploaded image
  let image = null;

  try {
    image = req.file;
    console.log("image : ", image);

    const imagePath = `${image.destination}/${image.filename}`;
    const imageFile = fs.readFileSync(imagePath);
    const imageBase64 = imageFile.toString("base64");

    const response = await axios.post(
      "https://detect.roboflow.com/cassava-leaf-bko96/1",
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

    console.log(response.data);

    deleteFile(image.filename);

    res.status(201).json({
      success: true,
      message: "Result of image identification retrieved successfully!",
      data: response.data,
    });
  } catch (error) {
    deleteFile(image.filename);

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export { detect };
