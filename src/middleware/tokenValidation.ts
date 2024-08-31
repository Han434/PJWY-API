import jwt from "jsonwebtoken"
import {Response, NextFunction} from "express"
import { jsonWebToken } from "../constants/jsonWebToken";
import { CustomTokenRequest } from "../types/tokenType";

const verifyToken = async (req : CustomTokenRequest, res : Response, next : NextFunction) => {
    const tokenHeader = req.headers.authorization;

    if(!tokenHeader || !tokenHeader?.startsWith("Bearer ")) {
        return res.status(401).json({
            message : "Unauthorized: Missing or invalid token"
        })
    }

    const token = tokenHeader.split(" ")[1];

    jwt.verify(token, String(jsonWebToken.access_token_secret), (error, data : any) => {
        if(error) {
            return res.status(403).json({message : "Forbidden: Invalid token"})
        } else {
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

export {verifyToken, verifyAdmin};