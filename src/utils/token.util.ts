import jwt from "jsonwebtoken"
import logger from "../config/Logger";

interface TokenSignType {
    payload: Object;
    secretKey: string;
    expired_time: string;
}

const tokenSign =  async ({payload, secretKey, expired_time = "30m"} : TokenSignType) => {
   try {
    const token = jwt.sign(payload, secretKey, {expiresIn: expired_time});
    return token;
   } catch (error : any) {
    logger.error(error)
    throw new Error(error.message)
   }
}

export default tokenSign