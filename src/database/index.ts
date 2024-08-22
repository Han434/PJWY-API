import mongoose from "mongoose";
import Logger from "../lib/logger";

async function connectDatabase() : Promise<void> {
    try {
        const baseURl = "mongodb://";
        const {DB_NAME, DB_HOST} = process.env;
        await mongoose.connect(`${baseURl}${DB_HOST}/${DB_NAME}`)
    } catch (error) {
        Logger.error("Database connection failed");
        return Promise.reject(error);
    }
}

export default connectDatabase