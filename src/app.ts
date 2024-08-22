import dotenv from 'dotenv'
dotenv.config();
import express from "express"
import cors from "cors"
import createError from "http-errors"
import Logger from './lib/logger';
import connectDatabase from './database';

const PORT = process.env.PORT || 3000;

const buildServer = async () : Promise<express.Application> => {
    const server = express();

    server.use(cors({origin: "*"}));
    server.use(express.json());
    server.use(express.urlencoded({extended: true}));

    server.all("/health-check", (req : express.Request, res : express.Response) => res.status(200).end("Hrrr hyg mee pyat twr p. (mee sat noe)²"));

    server.use('*', (req: express.Request, res: express.Response, next: express.NextFunction) => {
        next(createError(404, 'Route not found'));
    });

    server.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        let statusCode = err.status ?? 500;
        let message = (statusCode == 500) ? 'Internal server error' : err.message
        res.status(statusCode).json(
            {
                error: {
                    status: statusCode,
                    message: message
                }
            }
        )
    })

    return server;
}

const startServer= async () : Promise<void> => {
    const server = await buildServer();
    server.listen(PORT, () => {
        Logger.info("Node Environment: " + process.env.NODE_ENV);
        Logger.info(`Server is running at http://localhost:${PORT}}`)
    })
}

export function boot () {
    (async () => {
        try {
            await connectDatabase();
            Logger.info("Connected to database successfully");
            await startServer();
        } catch (error) {
            Logger.error(error);
        }
    })()
}