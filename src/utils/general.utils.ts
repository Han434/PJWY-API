import bcrypt from "bcrypt"
import logger from "../config/Logger";
import { DecryptedType, EncodedType } from "../types/bcryptType";


const encoded = async ({data, round = 10}: EncodedType) => {
    try {
        const encodedData = await bcrypt.hash(data, round);
    } catch (error: any) {
        logger.error(error);
        throw new Error(error.message);
    }
} 


const decrypted = async ({incomingData, previousData} : DecryptedType) => {
    try {
        const isCorrectData = await bcrypt.compare(incomingData, previousData);
        return isCorrectData
    } catch (error  : any) {
        logger.error(error)
        throw new Error(error.message)
    }
}

export {encoded, decrypted}