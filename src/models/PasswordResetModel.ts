import mongoose, { Schema, Document } from "mongoose";

export interface IPasswordReset extends Document {
    emailAddress: string;
    otp: string;
    createdAt: Date;
}

export const PasswordResetSchema: Schema = new Schema({
    emailAddress: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: '1h' } // Token expires in 1 hour
});