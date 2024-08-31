import mongoose from "mongoose";
import logger from "../config/Logger";

const connectDb =  async () => {
    try {
    const {DATABASE_URI, DB_NAME, DB_PERMISSION} = process.env;
    await mongoose.connect(`${DATABASE_URI}${DB_NAME}?${DB_PERMISSION}`);
        logger.info("Connected to database")
    } catch (error) {
        logger.error("Fail to Connect database");
    }
}
export default connectDb