import dotenv from 'dotenv'
dotenv.config();
import express from "express"
import cors from "cors"
import createError from "http-errors"
import connectDatabase from './database';
import morgan from "morgan"
import routes from "./routes"

const PORT = process.env.PORT || 5000;

const buildServer = async () : Promise<express.Application> => {
    const server = express();

    server.use(cors({origin: "*"}));
    server.use(express.json());
    server.use(express.urlencoded({extended: true}));
    server.use(morgan("dev"));

    server.all("/health-check", (req : express.Request, res : express.Response) => res.status(200).end("Hrrr hyg mee pyat twr p. (mee sat noe)²"));

    // Routes 
    server.use("/", routes)

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
        console.info(`Server is running at http://localhost:${PORT}}`)
    })
}

export async function boot () {
    (async () => {
        try {
            await connectDatabase();
            await startServer();
        } catch (error) {
            console.error(error)
        }
    })()
}