import Course from "../models/course.js"
import Category from "../models/category.js"
import User from "../models/user.js"
import { uploadImageToCloudinary } from "../utils/imageUploader.js";

//CREATE COURSE HANDLER

export const createCourse = async (req, res) => {
    //category
    try {
        //fetch all data
        const { courseName, courseDescription, whatYouWillLearn, price, category } = req.body;
        //fetch thumbnail
        // const thumbnail = req.files.thumbnailImage;
        const thumbnail = req.files?.thumbnailImage;

        //validation
        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        //check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor details: ", instructorDetails);

        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "Instuctor details not found",
            });
        }

        //check the given Category are valid are not
        const CategoryDetails = await Category.findById(category);
        console.log("CategoryDetails: ", CategoryDetails);
        if (!CategoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category details not found",
            });
        }

        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
        if (!thumbnailImage) {
            return res.status(500).json({
                success: false,
                message: "Thumbnail upload failed",
            });
        }

        //create an entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn,
            price,
            category: CategoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
        });

        //add the new course to the user schema of instructor
        await User.findByIdAndUpdate(
            { _id: instructorDetails._id },
            {
                $push: {
                    courses: newCourse._id,
                }
            }
            ,
            {
                new: true,
            });

        //update the Category schema 
        await Category.findByIdAndUpdate(
            { _id: CategoryDetails._id },
            {
                $push: {
                    courses: newCourse._id
                }
            },
            { new: true });

        // return response

        return res.status(200).json({
            success: true,
            message: "Course created successfully",
            data: newCourse
        })
    } catch (err) {
        console.log("Error while creating course: ", err.message)
        return res.status(500).json({
            success: false,
            message: "Failed to create course"
        });

    }
}


//GET ALL COURSE
export const getAllCourses = async (req, res) => {
    try {

        const getAllCourse = await Course.find({}, {                                  // projection (fields to return)
            courseName: 1,
            courseDescription: 1,
            price: 1,
            thumbnail: 1,
            instructor: 1,
            ratingAndReviews: 1,
            studentsEnrolled: 1,
        }
        ).populate("instructor").exec();

        //return response
        return res.status(200).json({
            success: true,
            message: "Courses fetched successfully",
            data: getAllCourse,
        });

    } catch (err) {
        console.log("Error while fetching course: ", err.message)
        return res.status(500).json({
            success: false,
            message: "Failed to fetch course"
        });

    }
}

//getCourseDetails
export const getCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body;
        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "courseId is required",
            });
        }
        const courseDetails = await Course.findById({ _id: courseId }).populate(
            {
                path: "instructor",
                populate: {
                    path: "additionalDetails"
                }
            }).populate("category").
            populate(
                {
                    path: "courseContent",
                    populate: {
                        path: "subSection"
                    }
                }
            ).populate("ratingAndReviews").
            populate(
                {
                    path: "studentsEnrolled",
                    populate: {
                        path: "additionalDetails"
                    }
                });

        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `could not find the course with ID ${courseId}`,
                data: courseDetails
            })
        }

        return res.status(200).json({
            success: true,
            message: "Fetched courseDetails successfully",
            data:courseDetails
        })

    } catch (err) {
        console.log("Failed to fetch courseDetails: ", err.message)

        return res.status(500).json({
            success: false,
            message: "Failed to fetch courseDetails"
        })

    }
}