import mongoose from "mongoose";
import databaseConstants from "../constants/database.constants";
import { UserSchema } from "./UserModel";
import { RefreshTokenSchema } from "./RefreshTokenModel";
import { IPasswordReset, PasswordResetSchema } from "./PasswordResetModel";
import { CategorySchema } from "./CategoryModel";
import { UserDocument } from "../types/userType";
import { CategoryDocument } from "../types/categoryType";

export const UserModel = mongoose.model<UserDocument>(databaseConstants.USER.DB_NAME, UserSchema, databaseConstants.USER.COLLECTION_NAME)

export const RefreshTokenModel = mongoose.model(databaseConstants.REFRESH_TOKEN.DB_NAME, RefreshTokenSchema, databaseConstants.REFRESH_TOKEN.COLLECTION_NAME);

export const PasswordResetModel = mongoose.model<IPasswordReset>(databaseConstants.PASSWORD_RESET.DB_NAME, PasswordResetSchema, databaseConstants.PASSWORD_RESET.COLLECTION_NAME);

export const CategoryModel = mongoose.model<CategoryDocument>(databaseConstants.CATEGORY.DB_NAME, CategorySchema, databaseConstants.CATEGORY.COLLECTION_NAME);