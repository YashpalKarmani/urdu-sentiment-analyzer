import AppError from "../utils/AppError.js";

const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      const errors = {};

      result.error.issues.forEach((issue) => {
        const path = issue.path.join(".");

        if (!errors[path || "request"]) {
          errors[path || "request"] = issue.message;
        }
      });

      return next(new AppError("Validation failed", 400, errors));
    }

    /**
     * req.body can be reassigned.
     */
    if (result.data.body !== undefined) {
      req.body = result.data.body;
    }

    /**
     * req.params can be reassigned.
     */
    if (result.data.params !== undefined) {
      req.params = result.data.params;
    }

    /**
     * Express 5 req.query is read-only.
     *
     * Store validated query data separately.
     */
    if (result.data.query !== undefined) {
      req.validatedQuery = result.data.query;
    }

    return next();
  };
};

export default validate;
