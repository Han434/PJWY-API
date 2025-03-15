import logger from "../config/Logger";
import { CategoryModel } from "../models";
import { CategoryInterface } from "../types/categoryType";

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
        logger.error("Error in creating category", error);
        throw new CustomError(`Failed to create category: ${error.message}`);
    }
};

const updateCategory = async (id: string, data: Partial<CategoryInterface>): Promise<CategoryInterface | null> => {
    try {
        const updatedCategory = await CategoryModel.findByIdAndUpdate(id, data, { new: true, lean: true });
        return updatedCategory;
    } catch (error: any) {
        logger.error("Error in updating category", error);
        throw new CustomError(`Failed to update category: ${error.message}`);
    }
};

const deleteCategory = async (id: string): Promise<CategoryInterface | null> => {
    try {
        const deletedCategory = await CategoryModel.findByIdAndDelete(id);
        return deletedCategory;
    } catch (error: any) {
        logger.error("Error in deleting category", error);
        throw new CustomError(`Failed to delete category: ${error.message}`);
    }
};

const getCategoryById = async (id: string): Promise<CategoryInterface | null> => {
    try {
        const category = await CategoryModel.findById(id).lean();
        return category;
    } catch (error: any) {
        logger.error("Error in getting category by ID", error);
        throw new CustomError(`Failed to get category by ID: ${error.message}`);
    }
};

export default {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryById,
};
