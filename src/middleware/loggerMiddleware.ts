import {Request, Response, NextFunction} from "express"
import logger from "../config/Logger"

export const requestLogger = (req : Request, res : Response, next : NextFunction) => {
    logger.info(`${req.method} ${req.originalUrl} - Status : ${req.statusCode}`);
    next();
}

export const errorLogger = (err : any, req: Request, res: Response, next: NextFunction) => {
    logger.error(`${req.method} ${req.originalUrl} - Status : ${res.statusCode} - Error : ${err.message}`);
    next(err);
} 