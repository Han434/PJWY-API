import { CategoryModel } from "../models";
import { CategoryInterface } from "../types/categoryType";
import mongoose from "mongoose";

class CustomError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "CustomError";
    }
}

const createCategory = async (data: CategoryInterface): Promise<CategoryInterface> => {
    try {
        const category = await CategoryModel.create(data);
        return category;
    } catch (error: any) {
        throw new CustomError(`Failed to create category: ${error.message}`);
    }
};

const editCategory = async (id: string, data: Partial<CategoryInterface>): Promise<CategoryInterface | null> => {
    try {
        const updatedCategory = await CategoryModel.findByIdAndUpdate(id, data, { new: true, lean: true });
        return updatedCategory;
    } catch (error: any) {
        throw new CustomError(`Failed to edit category: ${error.message}`);
    }
};

const deleteCategory = async (id: string): Promise<CategoryInterface | null> => {
    try {
        const deletedCategory = await CategoryModel.findByIdAndDelete(id);
        return deletedCategory;
    } catch (error: any) {
        throw new CustomError(`Failed to delete category: ${error.message}`);
    }
};

const getCategoryById = async (id: string): Promise<CategoryInterface | null> => {
    try {
        const category = await CategoryModel.findById(id).lean();
        return category;
    } catch (error: any) {
        throw new CustomError(`Failed to get category by ID: ${error.message}`);
    }
};

export default {
    createCategory,
    editCategory,
    deleteCategory,
    getCategoryById,
};