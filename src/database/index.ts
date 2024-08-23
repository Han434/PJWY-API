import mongoose from "mongoose";

async function connectDatabase() : Promise<void> {
    try {
        const baseURl = "mongodb://";
        const {DB_NAME, DB_HOST} = process.env;
        await mongoose.connect(`${baseURl}${DB_HOST}/${DB_NAME}`);
        console.info("Connected to MongoDB");
    } catch (error) {
        console.error("Database connection failed");
        return Promise.reject(error);
    }
}

export default connectDatabase