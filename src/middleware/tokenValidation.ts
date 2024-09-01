import jwt from "jsonwebtoken"
import {Response, NextFunction} from "express"
import { jsonWebToken } from "../constants/jsonWebToken";
import { CustomTokenRequest } from "../types/tokenType";
import createToken from "../utils/token.util";
import logger from "../config/Logger";

const verifyToken = async (req : CustomTokenRequest, res : Response, next : NextFunction) => {
    const tokenHeader = req.headers.authorization;

    if(!tokenHeader || !tokenHeader?.startsWith("Bearer ")) {
        return res.status(401).json({
            message : "Unauthorized: Missing or invalid token"
        })
    }

    const token = tokenHeader.split(" ")[1];

    req.token = token

    jwt.verify(token, String(jsonWebToken.access_token_secret), (error, data : any) => {
        if(error) {
            return res.status(403).json({message : "Forbidden: Invalid token"})
        } else {
            logger.info(`Data token is here: ${data}`);
            req.user = data.user;
            next();
        }
    })
}

const verifyAdmin = async (req : CustomTokenRequest, res : Response, next : NextFunction) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin) {
            next();
        } else {
            return res.status(401).json({message : "Unauthorized: Insufficient permissions"});
        }
    })
}

const refreshToken = async (req : CustomTokenRequest, res : Response) => {
    const {token} = req.body;
    if(token === null) return res.sendStatus(401); // Unauthorized.

    jwt.verify(token, jsonWebToken.refresh_token_secret!, async (error : any, user : any) => {
        if(error) return res.sendStatus(403);

        const accessToken = await createToken({user}, jsonWebToken.access_token_secret!);

        return accessToken;
    })
}

export {verifyToken, verifyAdmin, refreshToken};