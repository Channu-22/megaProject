import mongoose from "mongoose";

const tagsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            trim: true
        },
        courses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course",
            },
        ]
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Tag", tagsSchema);

  