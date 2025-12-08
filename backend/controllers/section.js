import Section from "../models/section.js";
import Course from "../models/course.js";

export const createSection = async (req, res) => {
    try {
        //fetch the data
        const { sectionName, courseId } = req.body;
        //validate the data
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "All properties required"
            })
        }
        //create the section 
        const newSection = await Section.create({
            sectionName,
        })
        //updtae the sectionId in course 
        const updatedCourseDetails = await Course.findByIdAndUpdate({ _id: courseId },
            {
                $push: {
                    courseContent: newSection._id
                }
            },
            { new: true });
        //return response
        return res.status(200).json({
            success: true,
            message: "section created successfully",
            updatedCourseDetails,
        })

    } catch (err) {
        console.log("Error while creating section: ", err.message)
        return res.status(500).json({
            success: false,
            message: "Failed to create section"
        });

    }
}

export const updateSection = async (req, res) => {
    try {
        //get data
        const { sectionName, sectionId } = req.body;
        //validate data
        if (!sectionName || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "All properties required"
            })
        }

        //update section
        const section = await Section.findByIdAndUpdate(sectionId,
            {
                sectionName
            },
            { new: true }
        );
        //return res
        return res.status(200).json({
            success: true,
            message: "section updated successfully",
            section,
        })

    } catch (err) {
        console.log("Error while updatingSection: ", err.message)
        return res.status(500).json({
            success: false,
            message: "Failed to update the section"
        });
    }
}

export const deleteSection = async (req, res) => {
    try {

        //get Id, Assumes we r sending id in params 
        const { sectionId } = req.params;
        //delete the section using findByIdAndDelete
        const deleteTheSection = await Section.findByIdAndDelete(sectionId);
        //[In testing time]Do we need delete sectionId from courseSchema
        await Course.updateMany(
            { courseContent: sectionId },
            { $pull: { courseContent: sectionId } }
        );

        //return response
        return res.status(200).json({
            success: true,
            message: "section deleted successfully",

        })

    } catch (err) {
        console.log("Error while deletingSection: ", err.message)
        return res.status(500).json({
            success: false,
            message: "Failed to delete the section"
        });

    }
}