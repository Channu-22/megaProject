import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
    {
        courseName: {
            type: String,
            required: true,
            trim: true,
        },
        courseDescription: {
            type: String,
            required: true,
            trim: true,
        },
        instructor: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        whatYouWillLearn: {
            type: String,
            required: true,
            trim: true,
        },
        courseContent: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Section",
            },
        ],
        ratingAndReviews: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "RatingAndReviews",
            },
        ],
        price: {
            type: Number,
        },
        tag: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tag",
        },
        studentsEnrolled: [
            {
                type: mongoose.Schema.Types.ObjectId,
                // required: true,
                ref: "User",
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Course", courseSchema);
