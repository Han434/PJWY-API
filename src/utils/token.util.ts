import jwt from "jsonwebtoken"
import logger from "../config/Logger";

const createToken =  async (payload : Object, secretKey : string, expired_time : string = "30m") => {
   try {
    const token = jwt.sign(payload, secretKey, {expiresIn: expired_time});
    return token;
   } catch (error : any) {
    logger.error(error)
    throw new Error(error.message)
   }
}

export default createToken