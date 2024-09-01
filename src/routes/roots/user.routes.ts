import express from "express"
import { changePassword, forgetPassword, getUserInfo, resetPassword, userLogout, userSignIn, userSignUp } from "../../controllers/user.controller";
import { verifyToken } from "../../middleware/tokenValidation";
import { userRequireMiddleware } from "../../middleware/userMiddleware";

const userRouter = express.Router();

// Public routes
userRouter.post("/signup", userRequireMiddleware(true), userSignUp);
userRouter.post("/signin", userRequireMiddleware(false), userSignIn);

// Protected routes
userRouter.get("/:id", verifyToken, getUserInfo);
userRouter.post("/logout", verifyToken, userLogout);
userRouter.post("/change-password", verifyToken, userRequireMiddleware(false), changePassword);
userRouter.post("/forget-password", verifyToken, forgetPassword);
userRouter.post("/reset-password", verifyToken, resetPassword);

export default userRouter