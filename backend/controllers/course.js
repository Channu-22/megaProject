import Course from "../models/course.js"
import Tag from "../models/category.js"
import User from "../models/user.js"
import { uploadImageToCloudinary } from "../utils/imageUploader.js";

//CREATE COURSE HANDLER

export const createCourse = async (req, res) => {
    try {
        //fetch all data
        const { courseName, courseDescription, whatYouWillLearn, price, tag } = req.body;
        //fetch thumbnail
        // const thumbnail = req.files.thumbnailImage;
        const thumbnail = req.files?.thumbnailImage;

        //validation
        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail) {
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

        //check the given tag are valid are not
        const tagDetails = await Tag.findById(tag);
        console.log("tagDetails: ", tagDetails);
        if (!tagDetails) {
            return res.status(404).json({
                success: false,
                message: "tag details not found",
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
            tag: tagDetails._id,
            thumbnail: thumbnailImage,
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

        //update the tag schema 
        await Tag.findByIdAndUpdate(
            { _id: tagDetails._id },
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
export const showAllCourses = async (req, res) => {
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
            data: allCourses,
        });

    } catch (err) {
        console.log("Error while fetching course: ", err.message)
        return res.status(500).json({
            success: false,
            message: "Failed to fetch course"
        });

    }
}