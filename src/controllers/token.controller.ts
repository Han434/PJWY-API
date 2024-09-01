import { Response } from "express";
import { CustomTokenRequest } from "../types/tokenType";
import { getAuthRefreshToken } from "../services/refreshToken.services";
import logger from "../config/Logger";
import userServices from "../services/user.services";
import jwt from "jsonwebtoken"
import { jsonWebToken } from "../constants/jsonWebToken";
import createToken from "../utils/token.util";


export const handleRefreshToken = async (req: CustomTokenRequest, res: Response) => {
    try {
        let oldAccessToken;
        const bodyToken = req.body.access_token;
        const tokenHeader = req.headers.authorization;

        if (!bodyToken && (!tokenHeader || !tokenHeader.startsWith("Bearer "))) {
            return res.status(401).json({
                message: "Unauthorized: Missing or invalid token at token controller",
            });
        }

        oldAccessToken = bodyToken || tokenHeader?.split(" ")[1];

        console.log("oldAccessToken", oldAccessToken);
        if (!oldAccessToken) {
            return res.status(400).json({
                message: "Access token is required",
            });
        }

        const authRefreshToken = await getAuthRefreshToken(oldAccessToken);

        // Check if authRefreshToken exists
        if (!authRefreshToken) {
            return res.status(403).json({
                message: "Forbidden: Invalid refresh token",
            });
        }

        const user = await userServices.getUserById(String(authRefreshToken.userId));

        logger.info(`User is here: ${user}`);

        if (!user) {
            return res.status(403).json({
                message: "Forbidden: User not found",
            });
        }

        jwt.verify(
            String(authRefreshToken.refresh_token),
            String(jsonWebToken.refresh_token_secret),
            async (error: any, data: any) => {
                if (error || user.emailAddress !== data?.user?.emailAddress) {
                    return res.status(403).json({ message: "Forbidden" });
                }

                const { password, refreshToken, ...rest } = user.toObject();

                const accessToken = await createToken(
                    { user: { ...rest } },
                    String(jsonWebToken.access_token_secret)
                );

                return res.status(200).json({
                    success: true,
                    data: {
                        accessToken,
                    },
                    message: "Refresh token successful.",
                });
            }
        );
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};
