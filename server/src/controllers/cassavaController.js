import { Cassava } from "../models/cassavaModel.js";
import { nullChecker } from "../utils/nullChecker.js";
import deleteFile from "../utils/deleteFile.js";

// * Add Cassava Detection Record
const addCassava = async (req, res) => {
  // * declare outside so when it errors we can delete the uploaded image
  let image = null;

  try {
    const { detectedType, user, actualType } = req.body;
    image = req.file;

    console.log("REQ BODY : ", req.body);
    console.log("IMAGE : ", image);

    // * Null checks
    const hasMissingFields = nullChecker(res, {
      detectedType,
      user,
    });

    if (hasMissingFields) {
      deleteFile(image.filename);
    }

    // * ACTUAL, UNCOMMENT THIS ON FINAL
    // const newCassava = {
    //   detectedType,
    //   user,
    //   image: image.filename,
    // };

    // if (actualType) {
    //   newCassava.actualType = actualType;
    // }

    // ! TESTING PURPOSES ONLY
    const newCassava = {
      detectedType: detectedType === "healthy" ? "Healthy" : "Diseased",
      user,
      image: image.filename,
    };

    if (actualType) {
      newCassava.actualType = actualType === "healthy" ? "Healthy" : "Diseased";
    }
    // ! END OF TESTING

    const cassava = new Cassava(newCassava);

    await cassava.save();

    res.status(201).json({
      success: true,
      message: "Cassava detection record added successfully",
      data: cassava,
    });
  } catch (error) {
    deleteFile(image.filename);

    console.log(error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// * Get One Cassava Record
const getCassava = async (req, res) => {
  try {
    const cassava = await Cassava.findById(req.params.id).populate(
      "user",
      "-password"
    );
    if (!cassava) {
      return res.status(404).json({
        success: false,
        message: "Cassava record not found",
      });
    }

    res.json({
      success: true,
      message: "Cassava record retrieved",
      data: cassava,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// * Get All Cassava Records (with filters & pagination)
const getCassavas = async (req, res) => {
  try {
    const { page = 1, limit = 10, detectedType, actualType, user } = req.query;

    const filter = {};
    if (detectedType) filter.detectedType = detectedType;
    if (actualType) filter.actualType = actualType;
    if (user) filter.user = user;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const cassavas = await Cassava.find(filter)
      .populate("user", "-password")
      .skip(skip)
      .limit(limitNumber);

    const totalCassavas = await Cassava.countDocuments(filter);

    res.json({
      success: true,
      message: "Cassava records retrieved",
      data: cassavas,
      meta: {
        total: totalCassavas,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(totalCassavas / limitNumber),
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

// * Update Cassava Record
const updateCassava = async (req, res) => {
  try {
    const cassavaId = req.params.id;

    const { actualType, detectedType, user } = req.body;

    // * Null checks
    const hasMissingFields = nullChecker(res, {
      actualType,
      detectedType,
      user,
    });

    if (hasMissingFields) return;

    const existingCassava = await Cassava.findById(cassavaId);
    if (!existingCassava) {
      return res.status(404).json({
        success: false,
        message: "Cassava record not found",
      });
    }

    const updatedCassava = await Cassava.findByIdAndUpdate(
      cassavaId,
      { actualType, detectedType, user },
      {
        new: true,
        runValidators: true,
      }
    );

    res.json({
      success: true,
      message: "Cassava record updated successfully",
      data: updatedCassava,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// * Delete Cassava Record
const deleteCassava = async (req, res) => {
  try {
    const cassava = await Cassava.findByIdAndDelete(req.params.id);

    deleteFile(cassava.image);

    if (!cassava) {
      return res.status(404).json({
        success: false,
        message: "Cassava record not found",
      });
    }

    res.json({
      success: true,
      message: "Cassava record deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export { addCassava, getCassava, getCassavas, updateCassava, deleteCassava };
