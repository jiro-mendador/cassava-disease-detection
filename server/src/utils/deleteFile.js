import path from "path";
import fs from "fs";

// * utility function to delete a file if it exists
const deleteFile = (filename) => {
  if (filename && filename !== "N/A") {
    const filePath = path.join("public/images", filename);
    if (fs.existsSync(filePath)) {
      // * check if file exists
      fs.unlinkSync(filePath);
      console.log(`Deleted: ${filename}`);
    } else {
      console.log(`File not found: ${filename}`);
    }
  }
};

export default deleteFile;
