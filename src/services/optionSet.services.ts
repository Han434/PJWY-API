import { OptionSetModel } from "../models";
import { OptionSetInterface } from "../types/optionSetType";

const createOptionSet = async (data : OptionSetInterface) => {
    try {
        return await OptionSetModel.create(data);
    } catch (error : any) {
        throw new Error(error);
    }
}

const getAllOptionSets = async () => {
    try {
        return await OptionSetModel.find();
    } catch (error : any) {
        throw new Error(error);
    }
}

const getOptionSetById = async (id: string) => {
    try {
        return await OptionSetModel.findById(id);
    } catch (error : any) {
        throw new Error(error);
    }
}

const editOptionSet = async (id: string, data: Partial<OptionSetInterface>) => {
    try {
        return await OptionSetModel.findByIdAndUpdate(id, data, { new: true, lean: true });
    } catch (error: any) {
        throw new Error(error);
    }
}

const deleteOptionSet = async (id: string) => { 
    try {
        return await OptionSetModel.findByIdAndDelete(id);
    } catch (error: any) {
        throw new Error(error);
    }
}

export default {
    createOptionSet,
    getAllOptionSets,
    getOptionSetById,
    deleteOptionSet,
    editOptionSet
}
