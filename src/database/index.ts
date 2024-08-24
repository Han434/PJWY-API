import mongoose from "mongoose";
import logger from "../config/Logger";

const connectDb =  async () => {
    try {
    await mongoose.connect('mongodb://127.0.0.1:27017/testify');
        logger.info("Connected to database")
    } catch (error) {
        logger.info("Fail to Connect database");
    }
}
export default connectDb