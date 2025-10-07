import mongoose from "mongoose";

const cassavaSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },
    detectedType: {
      type: String,
      enum: ["Healthy", "Diseased"],
      required: true,
    },
    actualType: {
      type: String,
      enum: ["N/A", "Healthy", "Diseased"],
      default: "N/A",
    },
    image: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Cassava = mongoose.model("Cassava", cassavaSchema);
