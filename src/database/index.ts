import mongoose from "mongoose";
import logger from "../config/Logger";

const connectDb =  async () => {
    try {
    const {DATABASE_URI, DB_NAME, DB_PERMISSION} = process.env;
    const db_url = `${DATABASE_URI}${DB_NAME}?${DB_PERMISSION}`;
    const local_url = "mongodb://localhost:27017/dbTest";
    // await mongoose.connect(`${DATABASE_URI}${DB_NAME}?${DB_PERMISSION}`);
    await mongoose.connect(local_url);
        logger.info("Connected to database")
    } catch (error) {
        logger.error("Fail to Connect database");
    }
}
export default connectDb