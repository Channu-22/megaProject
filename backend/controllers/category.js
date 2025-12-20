
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
        const CategoryDetails = await Category.create({
            name,
            description
        });
        return res.status(200).json({
            success: true,
            message: "Category created successfully",
            CategoryDetails
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

        const allCategory = await Category.find({});
        return res.status(200).json({
            success: true,
            message: "Category fetched successfully",
            allCategory
        })

    } catch (err) {
        console.log("error in fetching all Category: ", err.message)
        return res.status(500).json({
            success: false,
            message: "Error occurred while fetching Category"
        });

    }
}


//Category page Details 
export const CategoryPageDetails = async (req, res) => {
    try {
        //get categoryId
        const { categoryId } = req.body;
        if (!categoryId || !mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({
                success: false,
                message: "Valid categoryId is required",
            });
        }
        //get courses for specified categoryId
        const selectedCategory = await Category.findById(categoryId)
            .populate({
                path: "courses",
                match: { status: "Published" }, // only published courses
                populate: { path: "instructor", select: "firstName lastName email" },
            })
            .exec();
        //Validation
        if (!selectedCategory) {
            return res.status(400).json({
                success: false,
                message: `Category not found for id ${categoryId}`,
            })
        }
        //get course for different categories
        const differentCategories = await find({
            _id: {
                $ne: categoryId
            }
        }).populate({
            path: "courses",
            match: { status: "Published" }, // only published courses
            populate: { path: "instructor", select: "firstName lastName email" },
        }).exec();

        //get top selling courses across the all category
        const allCategories = await Category.find()
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: {
                    path: "instructor",
                },
            })
            .exec()
        const allCourses = allCategories.flatMap((category) => category.courses)
        const mostSellingCourses = allCourses
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 10)
        //return response
        return res.status(200).json({
            success: true,
            message: "",
            data: {
                selectedCategory,
                differentCategories,
                mostSellingCourses
            }
        })

    } catch (err) {
        console.log("Failed to fetch Category page details:", err.message);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch category page details",
        });

    }
}