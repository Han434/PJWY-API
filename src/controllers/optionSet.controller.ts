import { Request, Response } from "express";
import optionSetServices from "../services/optionSet.services";

export const createOptionSet = async (req: Request, res: Response) => {
    const { setName, options, itemQuantity } = req.body;

    if (!(setName && options)) {
        return res.status(400).json({
            success: false,
            message: "Set Name and options are required"
        });
    }

    try {
        const option = await optionSetServices.createOptionSet({ setName, options, itemQuantity });

        return res.status(201).json({
            success: true,
            message: "Successfully created Option",
            data: option // Optionally return the created option
        });
    } catch (error) {
        console.error("Error creating option set:", error); // Log the error for debugging
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export const editOptionSet = async (req: Request, res: Response) => { 
    const { setName, options, itemQuantity } = req.body;
    const id = req.params.id;

    if (!(setName && options)) {
        return res.status(400).json({
            success: false,
            message: "Set Name and options are required"
        });
    }

    try {
        const option = await optionSetServices.editOptionSet(id, { setName, options, itemQuantity });

        if (option) {
            return res.status(200).json({
                success: true,
                message: "Successfully edited option"
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "Option not found"
            });
        }
    } catch (error) {
        console.error("Error editing option set:", error); // Log the error for debugging
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const getOptionSetById = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            success: false,
            message: "Id is required"
        });
    }

    try {
        const option = await optionSetServices.getOptionSetById(id);

        if (option) {
            return res.status(200).json({
                success: true,
                data: option
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "Option not found"
            });
        }
    } catch (error) {
        console.error("Error fetching option set by ID:", error); // Log the error for debugging
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export const getAllOptionSets = async (req: Request, res: Response) => { 
    try {
        const options = await optionSetServices.getAllOptionSets();
        if (options) {
            return res.status(200).json({
                success: true,
                data: options
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "No options found"
            });
        }
    } catch (error) {
        console.error("Error fetching all option sets:", error); // Log the error for debugging
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const deleteOptionSet = async (req: Request, res: Response) => { 
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({
            success: false,
            message: "Id is required"
        });
    }

    try {
        const option = await optionSetServices.deleteOptionSet(id);

        if (option) {
            return res.status(200).json({
                success: true,
                message: "Successfully deleted option"
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "Option not found"
            });
        }
    } catch (error) {
        console.error("Error deleting option set by ID:", error); // Log the error for debugging
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}