
const buildFilters = (reqQuery, filterConfig) => {
    const query = {};
  
    Object.entries(filterConfig).forEach(([key, options]) => {
      if (reqQuery[key]) {
        query[key] = options.regex
          ? { $regex: reqQuery[key], $options: "i" }
          : reqQuery[key];
      }
    });
  
    return query;
  };
  

const paginateQuery = async (Model, query, reqQuery) => {
    const page = parseInt(reqQuery.page) || 1;
    const limit = parseInt(reqQuery.limit) || 10;
    const skip = (page - 1) * limit;

    const [results, totalDocs] = await Promise.all([
        Model.find(query).select("-refreshToken").skip(skip).limit(limit),
        Model.countDocuments(query),
    ]);

    return {
        results,
        totalDocs,
        currentPage: page,
        totalPages: Math.ceil(totalDocs / limit),
        limit,
    }
};

const validateEnumValues = (validValues, actualValue) => {
  return validValues.includes(actualValue)
};

export { paginateQuery, buildFilters, validateEnumValues };