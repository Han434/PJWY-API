import mongoose from "mongoose";
import { modelOptions } from "../utils/model.options";
import { OptionDocument } from "../types/optionSetType";
import { Option } from "../types/optionSetType";


export const OptionSetSchema = new mongoose.Schema<OptionDocument>({
    setName: {
        type: String,
        required: true,
        unique: true
    },
    options: {
        type: Array<Option>,
        required: true,
        unique: true
    },
    itemQuantity : {
        type: Number,
        required: true,
        default: 0
    }
}, modelOptions)
