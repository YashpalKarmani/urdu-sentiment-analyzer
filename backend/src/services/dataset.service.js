import Dataset from "../models/dataset.model.js";
import AppError from "../utils/AppError.js";
import escapeRegex from "../utils/escapeRegex.js";

export const createDatasetService = async (data, userId) => {
  const dataset = await Dataset.create({
    ...data,
    createdBy: userId,
  });

  return dataset;
};

export const getDatasetsService = async (query) => {
  const { page, limit, sentiment, source, isActive, usedForTraining, search } =
    query;

  const filter = {};

  if (sentiment) {
    filter.sentiment = sentiment;
  }

  if (source) {
    filter.source = source;
  }

  if (isActive !== undefined) {
    filter.isActive = isActive;
  }

  if (usedForTraining !== undefined) {
    filter.usedForTraining = usedForTraining;
  }

  if (search) {
    filter.text = {
      $regex: escapeRegex(search),
      $options: "i",
    };
  }

  const skip = (page - 1) * limit;

  const [datasets, total] = await Promise.all([
    Dataset.find(filter)
      .populate("createdBy", "username email role")
      .populate("updatedBy", "username email role")
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit)
      .lean(),

    Dataset.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    datasets,

    pagination: {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
};

export const getDatasetByIdService = async (datasetId) => {
  const dataset = await Dataset.findById(datasetId)
    .populate("createdBy", "username email role")
    .populate("updatedBy", "username email role")
    .lean();

  if (!dataset) {
    throw new AppError("Dataset entry not found", 404);
  }

  return dataset;
};

export const updateDatasetService = async (datasetId, data, userId) => {
  const dataset = await Dataset.findById(datasetId);

  if (!dataset) {
    throw new AppError("Dataset entry not found", 404);
  }

  Object.assign(dataset, data);

  dataset.updatedBy = userId;

  await dataset.save();

  return dataset;
};

export const updateDatasetStatusService = async (
  datasetId,
  isActive,
  userId,
) => {
  const dataset = await Dataset.findById(datasetId);

  if (!dataset) {
    throw new AppError("Dataset entry not found", 404);
  }

  dataset.isActive = isActive;
  dataset.updatedBy = userId;

  await dataset.save();

  return dataset;
};

export const updateTrainingStatusService = async (
  datasetId,
  usedForTraining,
  userId,
) => {
  const dataset = await Dataset.findById(datasetId);

  if (!dataset) {
    throw new AppError("Dataset entry not found", 404);
  }

  dataset.usedForTraining = usedForTraining;
  dataset.updatedBy = userId;

  await dataset.save();

  return dataset;
};

export const deleteDatasetService = async (datasetId) => {
  const dataset = await Dataset.findById(datasetId);

  if (!dataset) {
    throw new AppError("Dataset entry not found", 404);
  }

  await dataset.deleteOne();

  return true;
};

export const bulkCreateDatasetService = async (datasets, userId) => {
  const documents = datasets.map((dataset) => ({
    ...dataset,
    createdBy: userId,
  }));

  const createdDatasets = await Dataset.insertMany(documents);

  return {
    createdCount: createdDatasets.length,
    datasets: createdDatasets,
  };
};

export const bulkUpdateDatasetStatusService = async (ids, isActive, userId) => {
  const result = await Dataset.updateMany(
    {
      _id: {
        $in: ids,
      },
    },
    {
      $set: {
        isActive,
        updatedBy: userId,
      },
    },
  );

  return {
    matchedCount: result.matchedCount,
    modifiedCount: result.modifiedCount,
  };
};

export const bulkUpdateTrainingStatusService = async (
  ids,
  usedForTraining,
  userId,
) => {
  const result = await Dataset.updateMany(
    {
      _id: {
        $in: ids,
      },
    },
    {
      $set: {
        usedForTraining,
        updatedBy: userId,
      },
    },
  );

  return {
    matchedCount: result.matchedCount,
    modifiedCount: result.modifiedCount,
  };
};

export const bulkDeleteDatasetService = async (ids) => {
  const result = await Dataset.deleteMany({
    _id: {
      $in: ids,
    },
  });

  return {
    deletedCount: result.deletedCount,
  };
};

export const getDatasetStatsService = async () => {
  const result = await Dataset.aggregate([
    {
      $facet: {
        total: [
          {
            $count: "count",
          },
        ],

        active: [
          {
            $match: {
              isActive: true,
            },
          },
          {
            $count: "count",
          },
        ],

        inactive: [
          {
            $match: {
              isActive: false,
            },
          },
          {
            $count: "count",
          },
        ],

        training: [
          {
            $match: {
              usedForTraining: true,
            },
          },
          {
            $count: "count",
          },
        ],

        sentimentDistribution: [
          {
            $group: {
              _id: "$sentiment",
              count: {
                $sum: 1,
              },
            },
          },
        ],
      },
    },
  ]);

  const stats = result[0];

  return {
    total: stats.total[0]?.count || 0,

    active: stats.active[0]?.count || 0,

    inactive: stats.inactive[0]?.count || 0,

    usedForTraining: stats.training[0]?.count || 0,

    sentimentDistribution: stats.sentimentDistribution.map((item) => ({
      sentiment: item._id,
      count: item.count,
    })),
  };
};
