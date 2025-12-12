import category from "../models/category.js";
// import Category from "../models/category.js"
import Validator from "validator"


//CREATING TAGS
export const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "Name and description are required"
            });
        }
        const categoryDetails = await category.create({
            name,
            description
        });
        return res.status(200).json({
            success: true,
            message: "category created successfully",
            categoryDetails
        })

    } catch (err) {
        console.log("error in creating tag: ", err.message)
        return res.status(500).json({
            success: false,
            message: "Error occurred while creating tag"
        });

    }
}

//GET ALL TAGS HANDLER FUNCTIon
export const getAllCategory = async (req, res) => {
    try {

        const allCategory = await category.find({});
        return res.status(200).json({
            success: true,
            message: "category fetched successfully",
            allCategory
        })

    } catch (err) {
        console.log("error in fetching all category: ", err.message)
        return res.status(500).json({
            success: false,
            message: "Error occurred while fetching category"
        });

    }
}


//category page Details 