import { Request } from "express";

export interface TokenType  {
    Access : string;
    Refresh: string
}

export interface CustomTokenRequest extends Request {
    user?: any;
    token?: string
}