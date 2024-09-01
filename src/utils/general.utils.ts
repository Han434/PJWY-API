import bcrypt from "bcrypt"
import logger from "../config/Logger";


const encoded = async (data:string, round:number = 10) => {
    try {
        const encodedData = await bcrypt.hash(data, round);
        return encodedData
    } catch (error: any) {
        logger.error(error);
        throw new Error(error.message);
    }
} 


const decrypted = async (incomingData: string, previousData: string) => {
    try {
        const isCorrectData = await bcrypt.compare(incomingData, previousData);
        return isCorrectData
    } catch (error  : any) {
        logger.error(error)
        throw new Error(error.message)
    }
}

export const generateOTP = (): string => {
    // Generate a 6-digit OTP
    return Math.floor(100000 + Math.random() * 900000).toString();
};

export {encoded, decrypted}