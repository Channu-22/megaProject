import mongoose from "mongoose";
import Course from "../models/course.js";
import RatingAndReviews from "../models/ratingAndReviews.js";
import course from "../models/course.js";

// create rating
export const creatingRatingAndReviews = async (req, res) => {
    try {
        const userId = req.user.id;
        const { rating, review, courseId } = req.body;

        // basic validation
        if (!rating || !review || !courseId) {
            return res.status(400).json({
                success: false,
                message: "rating, review and courseId are required",
            });
        }

        // check user enrolled in course
        const courseDetails = await Course.findOne({
            _id: courseId,
            studentsEnrolled: userId,
        });

        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: "Student is not enrolled in this course",
            });
        }

        // check user already reviewed
        const alreadyReviewed = await RatingAndReviews.findOne({
            user: userId,
            course: courseId,
        });

        if (alreadyReviewed) {
            return res.status(403).json({
                success: false,
                message: "User already reviewed this course",
            });
        }

        // create rating & review
        const createRatingAndReviews = await RatingAndReviews.create({
            user: userId,
            rating,
            review,
            course: courseId,
        });

        // push ratingAndReviews id into course
        await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    ratingAndReviews: createRatingAndReviews._id,
                },
            },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Successfully added rating and review to the course",
            data: createRatingAndReviews,
        });
    } catch (err) {
        console.log("Error while giving rating and reviews:", err.message);
        return res.status(500).json({
            success: false,
            message: "Failed to update rating and reviews in the course",
        });
    }
};


//getAverageRating
export const getAverageRatingAndReviews = async (req, res) => {
    try {
        //get CourseID
        const { courseId } = req.body;
        //validation
        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "courseId is required",
            });
        }
        //calculate averageRatingAndReviews
        const result = await RatingAndReviews.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" },
                },
            },
        ]);

        //return the Rating
        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                message: "Average rating fetched successfully",
                averageRating: result[0].averageRating
            })
        }
        return res.status(200).json({
            success: true,
            message: "Average rating is 0 no Rating is given till now",
            averageRating: 0,

        })

    } catch (err) {
        console.log("Error while getting AVG Rating:", err.message);
        return res.status(500).json({
            success: false,
            message: "Failed to get AVG Rating",
        });

    }
}

export const getAllRatingAndReviews = async (req, res) => {
    try {
        const allRatingAndReviews = await RatingAndReviews.find({})
            .sort({ rating: -1 }) // highest rating first
            .populate({
                path: "user",
                select: "firstName lastName email image",
            })
            .populate({
                path: "course",
                select: "courseName courseDescription",
            })
            .exec();

        return res.status(200).json({
            success: true,
            message: "All ratings and reviews fetched successfully",
            data: allRatingAndReviews,
        });
    } catch (err) {
        console.log("Error while getting all ratings and reviews:", err.message);
        return res.status(500).json({
            success: false,
            message: "Failed to get all ratings and reviews",
        });
    }
};
