import { Document } from "mongoose";

export interface CategoryInterface {
    prefix : number;
    name : string;
    description : string;
}

export interface CategoryDocument extends Document, CategoryInterface {}