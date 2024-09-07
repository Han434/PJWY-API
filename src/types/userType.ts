import { Document } from "mongoose";

export interface UserInterface {
    userName: string;
    emailAddress: string;
    password: string;
    refreshToken?: string;
}

export interface UserDocument extends Document , UserInterface {}