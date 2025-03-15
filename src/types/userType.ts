import { Document } from "mongoose";

export interface UserInterface {
    name: string;
    userName: string;
    password: string;
}

export interface UserDocument extends Document , UserInterface {}