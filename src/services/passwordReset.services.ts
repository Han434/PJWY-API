import { PasswordResetModel } from "../models"

const createPasswordReset = async (emailAddress : string, otp: string) => {
    try {
        return await PasswordResetModel.create({
            emailAddress,
            otp
        })
    } catch (error : any) {
        throw new Error(error.message)
    }
}

const getResetRecord = async (emailAddress : string, otp: string) => {
    try {
        return await PasswordResetModel.findOne({ emailAddress, otp });
    } catch (error : any) {
        throw new Error(error.message)
    }
}

const deleteRecord = async (emailAddress: string, otp: string) => {
    try {
        return await PasswordResetModel.deleteOne({ emailAddress, otp });
    } catch (error : any) {
        throw new Error(error.message)
    }
}

export default {
    createPasswordReset,
    getResetRecord,
    deleteRecord
}