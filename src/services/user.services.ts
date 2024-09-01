import logger from "../config/Logger";
import { UserModel } from "../models"
import { UserInterface } from "../types/userType";


const createUser = async (data: UserInterface) => {
    try {
        const newUser = await UserModel.create(data);
        return newUser;
    } catch (error : any) {
        throw new Error(error)
    }
}

const getUser = async (email : string) => {
    try {
        const user = await UserModel.findOne({emailAddress: email}).lean();
        if(!user) {
            throw new Error("User is not existed with this email");
        }
        return user;
    } catch (error : any) {
        throw new Error(error);
    }
}

const updateUser = async (id : string, data : object) => {
    try {
        const user = await UserModel.findByIdAndUpdate(id, data, {returnOriginal : false})
        return user;
    } catch (error : any) {
        throw new Error(error);
    }
}

const getUserById = async (id : string) => {
    try {
        const user = await UserModel.findById(id).lean();
        return user;
    } catch (error: any) {
        throw new Error(error);
    }
}

export default {
    createUser,
    getUser,
    updateUser,
    getUserById
}