import mongoose, { Document } from "mongoose";
import { modelOptions } from "../utils/model.options";
import { UserDocument } from "../types/userType";

export const UserSchema = new mongoose.Schema<UserDocument>({
    name : {
        type : String,
        required: true,
        unique: false
    },
    userName : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    }
}, modelOptions);