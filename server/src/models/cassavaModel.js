import mongoose from "mongoose";

const cassavaSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: () => {
        const now = new Date();
        // * Convert UTC time to PH time (UTC+8)
        now.setHours(now.getHours() + 8);
        return now;
      },
    },
    // date: {
    //   type: Date,
    //   default: Date.now,
    // },
    detectedType: {
      type: String,
      enum: ["N/A", "Healthy", "Unhealthy"],
      required: true,
    },
    actualType: {
      type: String,
      enum: ["N/A", "Healthy", "Unhealthy"],
      default: "N/A",
    },
    image: {
      type: String,
      required: true,
    },
    recommendation: {
      type: String,
      default: "N/A",
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

// * Middleware to adjust createdAt and updatedAt to PH time
cassavaSchema.pre("save", function (next) {
  const now = new Date();
  now.setHours(now.getHours() + 8);
  this.createdAt = now;
  this.updatedAt = now;
  next();
});

cassavaSchema.pre("findOneAndUpdate", function (next) {
  const now = new Date();
  now.setHours(now.getHours() + 8);
  this._update.updatedAt = now;
  next();
});

export const Cassava = mongoose.model("Cassava", cassavaSchema);
