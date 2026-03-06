import { ApiResponse } from "../utils/api_response.js";
import { asynchandler } from "../utils/async-Handeler.js";
/* 
const helthCheck = async (req, res, next) => {
    try {
        const user = await dbGetUser();
        res.status(200).json(
            new ApiResponse(200, { message: "Server is running perfectlly" },user),
        );
    } catch (error) {
        console.error("There is an error in the server", error);
        next(error);
    }
}; */

const healthCheck = asynchandler(async (req, res) => {
  res
    .status(200)
    .json(new ApiResponse(200, { message: "Server is running perfectlly" }));
});

export { healthCheck };
