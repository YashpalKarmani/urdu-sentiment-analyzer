import mongoose from "mongoose";

const sentimentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
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
    confidence: {
      type: Number,
      min: 0,
      max: 1,
      default: null,
    },
    modelVersion: {
      type: String,
      trim: true,
      default: null,
    },
    processingTime: {
      type: Number,
      min: 0,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

sentimentSchema.index({ user: 1, createdAt: -1 });

const Sentiment = mongoose.model("Sentiment", sentimentSchema);

export default Sentiment;
