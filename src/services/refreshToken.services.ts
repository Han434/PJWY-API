import { RefreshTokenModel } from "../models"


export const getAuthRefreshToken = async (token : string) => {
    try {
        return await RefreshTokenModel.findOne({access_token: token});
    } catch (error : any) {
        throw new Error(error.message)
    }
}

export const createAuthRefreshToken = async (refresh_token: string, access_token: string, userId: string) => {
    try {
        return await RefreshTokenModel.create({
            refresh_token,
            access_token,
            userId
        })
    } catch (error : any) {
        throw new Error(error.message)
    }
}

export const removeAuthRefreshToken = async (userId : string) => {
    try {
        await RefreshTokenModel.findOneAndDelete({userId});
    } catch (error: any) {
        throw new Error(error.message);
    }
}