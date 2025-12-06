import Category from "../models/category.js"
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
        const tagDetails = await Tag.create({
            name,
            description
        });
        return res.status(200).json({
            success: true,
            message: "tag created successfully",
            tagDetails
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
export const getAllCategory = async (req,res) =>{
    try{

        const allTags = await Tag.find({});
         return res.status(200).json({
            success: true,
            message: "tags fetched successfully",
            allTags
        })

    }catch(err){
                console.log("error in fetching all tag: ", err.message)
        return res.status(500).json({
            success: false,
            message: "Error occurred while fetching tags"
        });

    }
}