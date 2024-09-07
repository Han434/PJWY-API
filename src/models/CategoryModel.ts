import mongoose from "mongoose";
import { modelOptions } from "../utils/model.options";
import { CategoryDocument } from "../types/categoryType";


export const CategorySchema = new mongoose.Schema<CategoryDocument>({
    prefix: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type : String,
        required: true
    },
    description: {
        type: String,
        default: ""
    }
}, modelOptions)