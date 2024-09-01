import mongoose from 'mongoose';
import { jsonWebToken } from '../constants/jsonWebToken';

export const RefreshTokenSchema = new mongoose.Schema({
    refresh_token: {
        type: String,
        require: true
    },
    access_token : {
        type: String,
        require: true
    },
    userId: {
        type : mongoose.Schema.Types.ObjectId,
        require: true
    },
    createdAt : {
        type : Date,
        default : Date.now(),
        expires : jsonWebToken.refresh_token_expired
    }
});