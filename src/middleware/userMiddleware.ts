import { NextFunction, Request, Response } from "express";
import { emailValidation } from "../utils/email.utils";
import logger from "../config/Logger";

export const userRequireMiddleware = (isSignup: boolean) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userName, emailAddress, password, passwordConfirmation, newPassword } = req.body;

        // For signup, username is required
        if (isSignup && !userName) {
            return res.status(400).json({
                message: "Username is required for signup."
            });
        }

        if (!(emailAddress && password && passwordConfirmation)) {
            return res.status(400).json({
                message: "Email, password, and password confirmation are required."
            });
        }

        const isValidEmail = await emailValidation(emailAddress);
        if (!isValidEmail) {
            return res.status(400).json({ message: "Invalid email address." });
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long."
            });
        }

        if (password !== passwordConfirmation) {
            return res.status(400).json({
                message: "Password and confirmation password do not match."
            });
        }

        // For change-password, check newPassword length only if it's provided
        if (!isSignup && req.path.includes('change-password') && newPassword && newPassword.length < 8) {
            return res.status(400).json({
                message: "New password must be at least 8 characters long."
            });
        }

        next();
    } catch (error) {
        logger.error(`Error is here : ${error}`)
        next(error);
    }
};
