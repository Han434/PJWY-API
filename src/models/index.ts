import mongoose from "mongoose";
import databaseConstants from "../constants/database.constants";
import { UserSchema } from "./UserModel";
import { RefreshTokenSchema } from "./RefreshTokenModel";
import { IPasswordReset, PasswordResetSchema } from "./PasswordResetModel";
import { CategorySchema } from "./CategoryModel";
import { UserDocument } from "../types/userType";
import { CategoryDocument } from "../types/categoryType";
import { OptionDocument } from "../types/optionSetType";
import { OptionSetSchema } from "./OptionSetModel";

export const UserModel = mongoose.model<UserDocument>(databaseConstants.USER.DB_NAME, UserSchema, databaseConstants.USER.COLLECTION_NAME)

export const CategoryModel = mongoose.model<CategoryDocument>(databaseConstants.CATEGORY.DB_NAME, CategorySchema, databaseConstants.CATEGORY.COLLECTION_NAME);

export const OptionSetModel = mongoose.model<OptionDocument>(databaseConstants.OPTION.DB_NAME, OptionSetSchema, databaseConstants.OPTION.COLLECTION_NAME)