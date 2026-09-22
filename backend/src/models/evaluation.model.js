import mongoose from "mongoose";

const evaluationSchema = new mongoose.Schema(
  {
    modelVersion: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
      index: true,
    },

    accuracy: {
      type: Number,
      required: true,
      min: 0,
      max: 1,
    },

    precision: {
      type: Number,
      required: true,
      min: 0,
      max: 1,
    },

    recall: {
      type: Number,
      required: true,
      min: 0,
      max: 1,
    },

    f1Score: {
      type: Number,
      required: true,
      min: 0,
      max: 1,
    },

    trainingSamples: {
      type: Number,
      required: true,
      min: 0,
    },

    evaluationSamples: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

evaluationSchema.index({ modelVersion: 1, createdAt: -1 });

const Evaluation = mongoose.model("Evaluation", evaluationSchema);

export default Evaluation;
