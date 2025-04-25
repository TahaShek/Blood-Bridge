import { userFilters } from "../../constants/constants.js";
import { User } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { buildFilters, paginateQuery } from "../../utils/databaseHelpers.js";

const getActiveDonors = asyncHandler(async (req, res) => {
  const query = {
    isDonating: true,
    ...buildFilters(req.query, userFilters),
  };

  const { results, ...pagination } = await paginateQuery(
    User,
    query,
    req.query
  );

  if (results.length === 0) {
    new ApiResponse(200, "No users available for donation currently");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        donors: results,
        pagination,
      },
      `Users willing to donate fetched successfully - total: ${pagination?.totalDocs}`
    )
  );
});

export { getActiveDonors };
