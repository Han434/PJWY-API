import logger from "../config/Logger";
import { UserModel } from "../models";
import { UserInterface } from "../types/userType";

class CustomError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "CustomError";
    }
}

const getAllUsers = async (): Promise<UserInterface[]> => {
    try {
        const users = await UserModel.find().lean();
        return users;
    } catch (error: any) {
        logger.error("Error in getting all users", error);
        throw new CustomError(`Failed to get all users: ${error.message}`);
    }
};

const getUserById = async (userId: string): Promise<UserInterface | null> => {
    try {
        const user = await UserModel.findById(userId).lean();
        return user;
    } catch (error: any) {
        logger.error("Error in getting user by ID", error);
        throw new CustomError(`Failed to get user by ID: ${error.message}`);
    }
};

const createUser = async (data: UserInterface): Promise<UserInterface> => {
    try {
        const user = await UserModel.create(data);
        return user;
    } catch (error: any) {
        logger.error("Error in creating user", error);
        throw new CustomError(`Failed to create user: ${error.message}`);
    }
};

const updateUser = async (userId: string, data: Partial<UserInterface>): Promise<UserInterface | null> => {
    try {
        const user = await UserModel.findByIdAndUpdate(userId, { $set: data }, { new: true, lean: true });
        return user;
    } catch (error: any) {
        logger.error("Error in updating user", error);
        throw new CustomError(`Failed to update user: ${error.message}`);
    }
};

const deleteUser = async (userId: string): Promise<UserInterface | null> => {
    try {
        const user = await UserModel.findByIdAndDelete(userId);
        return user;
    } catch (error: any) {
        logger.error("Error in deleting user", error);
        throw new CustomError(`Failed to delete user: ${error.message}`);
    }
};

export default {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
