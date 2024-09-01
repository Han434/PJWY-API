import mongoose, { Document } from "mongoose";
import { modelOptions } from "../utils/model.options";
import { UserInterface } from "../types/userType";

export interface UserDocument extends Document, UserInterface {}

export const UserSchema = new mongoose.Schema<UserDocument>({
    userName : {
        type : String,
        require: true,
        unique: true
    },
    emailAddress : {
        type: String,
        require: true,
        unique: true
    },
    password : {
        type: String,
        require: true
    },
    refreshToken : {
        type: String
    }
}, modelOptions);