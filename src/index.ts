import dotenv from "dotenv"
dotenv.config();
import express from "express"
import cors from "cors"
import morgan from "morgan"
import logger from "./config/Logger";
import createError from "http-errors"
import connectDb from "./database";
import { errorLogger, requestLogger } from "./middleware/loggerMiddleware";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(morgan('combined', {stream: process.stdout}));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(requestLogger);

app.all("/health-check", (req : express.Request, res : express.Response) => res.status(200).end("Yeah server is in good health"))

app.use("*", (req : express.Request, res : express.Response, next : express.NextFunction) => {
    next(createError("Route not found."))
})

app.use(errorLogger);

app.use((err : any, req : express.Request, res : express.Response, next : express.NextFunction) => {
    const statusCode = err.status || 500;
    if (statusCode === 401) {
        res.status(statusCode).json({ error: "Unauthorized access" });
    } else {
        res.status(statusCode).json({ error: err.message });
    }
});

const startServer = async () => {
    app.listen(PORT, () => {
        logger.info(`Server is running successfully at http://localhost:${PORT}`)
    }).on("error", (err) => {
        logger.error(`Server error: ${err.message}`)
    })
}

( async () => {
   await startServer();
   await connectDb();
})()

