import mongoose from "mongoose";

const datasetSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    sentiment: {
      type: String,
      enum: ["positive", "negative", "neutral"],
      required: true,
      index: true,
    },
    source: {
      type: String,
      trim: true,
      default: "custom",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    usedForTraining: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

datasetSchema.index({ sentiment: 1, isActive: 1 });

const Dataset = mongoose.model("Dataset", datasetSchema);

export default Dataset;
