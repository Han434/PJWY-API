import { Request, Response } from "express";
import categoryServices from "../services/category.services";

export const createCategory = async (req : Request , res : Response) => {
    try {
        const {name, description, prefix} = req.body;

        if(!(name && prefix)) {
            return res.status(400).json({
                message : "Name and prefix are required"
            })
        }

        const category = await categoryServices.createCategory({
            name,
            description,
            prefix
        })

        if(category) {
            return res.status(200).json({
                success: true,
                message: "Successfully created category"
            })
        } 

        return res.status(500).json({
            success: false,
            message : "Something went wrong!!"
        })


    } catch (error) {
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
}


export const editCategory = async (req : Request , res : Response) => {
    try {
        const categoryId = req.params.id;

       if(!categoryId) {
        return res.status(200).json({
            success: false,
            message: "Parameter Id is required"
        })
       }

       const updatedData = await categoryServices.editCategory(categoryId, req.body);

       if(!updatedData) {
        return res.status(500).json({
            success: false,
            message : "Something went wrong!!"
        }) 
       }

       return res.status(201).json({
            success: true,
            message : "Edited Successfully",
            data : {
                updatedData
            }
       })


    } catch (error) {
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
}


export const getCategoryDetail = async (req : Request , res : Response) => {
    try {
        const categoryId = req.params.id;

       if(!categoryId) {
        return res.status(400).json({
            success: false,
            message: "Parameter Id is required"
        })
       }

       const category = await categoryServices.getCategoryById(categoryId);
       
       return res.status(200).json({
            success: true,
            message : "Getting category successfully",
            data : {
                category
            }
       })

    } catch (error) {
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
}

// list