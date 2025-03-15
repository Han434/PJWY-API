import { Request, Response, NextFunction } from "express"
import logger from "../config/Logger";
import userServices from "../services/user.services";

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userServices.getAllUsers();
        return res.status(200).json({
            success: true,
            data: users
        })
    } catch (error) {
        logger.error("Error in getting all users", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id;

        if (!userId) {
            return res.status(200).json({
                success: false,
                message: "Parameter Id is required"
            })
        }

        const user = await userServices.getUserById(userId);

        if (!user) {
            return res.status(500).json({
                success: false,
                message: "Something went wrong!!"
            })
        }

        return res.status(201).json({
            success: true,
            data: {
                user
            }
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;

        if (!data) {
            return res.status(200).json({
                success: false,
                message: "Data is required"
            })
        }

        const user = await userServices.createUser(data);

        if (user) {
            return res.status(200).json({
                success: true,
                message: "Successfully created user"
            })
        }

        return res.status(500).json({
            success: false,
            message: "Something went wrong!!"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id;
        const data = req.body;

        if (!userId) {
            return res.status(200).json({
                success: false,
                message: "Parameter Id is required"
            })
        }

        if (!data) {
            return res.status(200).json({
                success: false,
                message: "Data is required"
            })
        }

        const user = await userServices.updateUser(userId, data);

        if (user) {
            return res.status(200).json({
                success: true,
                message: "Successfully updated user"
            })
        }

        return res.status(500).json({
            success: false,
            message: "Something went wrong!!"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id;

        if (!userId) {
            return res.status(200).json({
                success: false,
                message: "Parameter Id is required"
            })
        }

        const user = await userServices.deleteUser(userId);

        if (user) {
            return res.status(200).json({
                success: true,
                message: "Successfully deleted user"
            })
        }

        return res.status(500).json({
            success: false,
            message: "Something went wrong!!"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}