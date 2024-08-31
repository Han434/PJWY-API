import mongoose from "mongoose";
import logger from "../config/Logger";

const connectDb =  async () => {
    try {
    const {uri, db_name, db_permission} = process.env;
    await mongoose.connect(`${uri}${db_name}?${db_permission}}`);
        logger.info("Connected to database")
    } catch (error) {
        logger.error("Fail to Connect database");
    }
}
export default connectDb