import express from "express"
import { verifyToken } from "../../middleware/tokenValidation";
import { handleRefreshToken } from "../../controllers/token.controller";

const tokenRouter = express.Router();

tokenRouter.get("/refresh-token", handleRefreshToken);

export default tokenRouter