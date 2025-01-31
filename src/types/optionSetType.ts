import { Document } from "mongoose";

export interface Option {
    option: string;
}[]

export interface OptionSetInterface {
    setName : string;
    options: Option;
    itemQuantity : number;
}

export interface OptionDocument extends Document, OptionSetInterface {}